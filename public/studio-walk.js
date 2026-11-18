(() => {
  if (customElements.get("studio-walk")) return;
  const storageKey = "ahmed-kahlout.portfolio-walk.v1";
  const directions = { up: [0,-1], down: [0,1], left: [-1,0], right: [1,0] };
  const keys = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right", KeyW: "up", KeyS: "down", KeyA: "left", KeyD: "right" };

  class StudioWalk extends HTMLElement {
    connectedCallback() {
      if (this.handlers) return;
      this.board = this.querySelector("[data-board]");
      this.actor = this.querySelector("[data-player]");
      this.reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
      this.enter = this.querySelector("[data-enter]");
      this.enterLabel = this.enter.textContent.trim();
      this.status = this.querySelector("[data-status]");
      this.labels = JSON.parse(this.dataset.labels);
      this.cells = new Map([...this.querySelectorAll("[data-cell]")].map(node => [node.dataset.cell,node]));
      this.stations = new Map([...this.querySelectorAll("[data-stop]")].map(node => [node.dataset.point,node]));
      this.stamps = new Set();
      this.position = this.dataset.start;
      this.handlers = new AbortController();
      const options = { signal: this.handlers.signal };
      this.addEventListener("click", e => this.onClick(e), options);
      this.board.addEventListener("keydown", e => this.onKey(e), options);
      window.addEventListener("pageshow", () => this.restore(), options);
      window.addEventListener("pagehide", () => this.cancelWalk(), options);
      window.addEventListener("storage", e => { if (e.key === storageKey) this.restore(); }, options);
      this.dataset.gameReady = "";
      this.restore();
    }

    disconnectedCallback() {
      this.cancelWalk();
      this.handlers?.abort();
      this.handlers = null;
    }

    restore() {
      let saved;
      try { saved = JSON.parse(localStorage.getItem(storageKey)); } catch { /* Private browsing can disable storage. */ }
      if (saved?.version === 1 && this.cells.has(saved.position) && Array.isArray(saved.stamps)) {
        this.cancelWalk();
        this.position = saved.position;
        const known = [...this.stations.values()].map(node => node.dataset.stop);
        this.stamps = new Set(saved.stamps.filter(id => known.includes(id)));
      }
      this.paint();
    }

    save() {
      try { localStorage.setItem(storageKey, JSON.stringify({ version: 1, position: this.position, stamps: [...this.stamps] })); } catch { /* Keep the walk playable for this visit. */ }
    }

    cancelWalk() { clearTimeout(this.timer); }

    neighbor(point, direction) {
      const [x,y] = point.split(",").map(Number);
      const [dx,dy] = directions[direction];
      return [x+dx,y+dy].join(",");
    }

    // Shortest route along the same street cells used by the keyboard controls.
    routeTo(target) {
      const queue = [this.position];
      const previous = new Map([[this.position, null]]);
      for (let i = 0; i < queue.length && !previous.has(target); i++) {
        for (const direction of Object.keys(directions)) {
          const next = this.neighbor(queue[i],direction);
          if (!this.cells.has(next) || previous.has(next)) continue;
          previous.set(next,queue[i]);
          queue.push(next);
        }
      }
      if (!previous.has(target)) return [];
      const route = [];
      for (let p = target; p !== this.position; p = previous.get(p)) route.push(p);
      return route.reverse();
    }

    walkTo(target) {
      this.cancelWalk();
      this.board.focus({ preventScroll: true });
      const route = this.routeTo(target);
      if (target === this.position || (route.length && this.reducedMotion.matches)) {
        this.arrive(target, true);
        return;
      }
      let index = 0;
      const step = () => {
        if (index >= route.length) return;
        const next = route[index];
        index += 1;
        this.arrive(next, index === route.length);
        if (index < route.length) this.timer = setTimeout(step, 115);
      };
      step();
    }

    move(direction) {
      this.cancelWalk();
      const next = this.neighbor(this.position,direction);
      if (!this.cells.has(next)) {
        this.status.textContent = this.labels.blocked;
        return;
      }
      this.arrive(next,true);
    }

    arrive(point, canStamp) {
      const oldX = Number(this.position.split(",")[0]);
      const newX = Number(point.split(",")[0]);
      if (oldX !== newX) this.actor.dataset.facing = newX < oldX ? "left" : "right";
      if (point !== this.position && !this.reducedMotion.matches) {
        this.actor.firstElementChild.animate?.([{ translate: "0 0" }, { translate: "0 -2px" }, { translate: "0 0" }], { duration: 110 });
      }
      this.position = point;
      const station = this.stations.get(point);
      if (canStamp && station) this.stamps.add(station.dataset.stop);
      this.paint();
      if (canStamp) this.save();
    }

    paint() {
      const cell = this.cells.get(this.position);
      const view = cell.ownerSVGElement.viewBox.baseVal;
      this.actor.style.left = 100 * cell.cx.baseVal.value / view.width + "%";
      this.actor.style.top = 100 * cell.cy.baseVal.value / view.height + "%";
      this.actor.dataset.position = this.position;
      const current = this.stations.get(this.position);
      const message = current ? this.labels.at + " " + current.dataset.name : this.position === this.dataset.start ? this.labels.idle : this.labels.transit;
      if (this.status.textContent !== message) this.status.textContent = message;
      this.enter.hidden = !current;
      if (current) {
        this.enter.href = current.href;
        this.enter.setAttribute("aria-label", this.enterLabel + " · " + current.dataset.name);
      } else {
        this.enter.removeAttribute("href");
        this.enter.removeAttribute("aria-label");
      }
      for (const station of this.stations.values()) {
        station.toggleAttribute("data-here",station === current);
        station.toggleAttribute("data-stamped",this.stamps.has(station.dataset.stop));
        if (station === current) station.setAttribute("aria-label", this.enterLabel + " · " + station.dataset.name);
        else station.removeAttribute("aria-label");
      }
      for (const entry of this.querySelectorAll("[data-entry]")) {
        entry.querySelector("[data-checked]").hidden = !this.stamps.has(entry.dataset.entry);
      }
      this.querySelector("[data-count]").textContent = String(this.stamps.size);
      this.querySelector("[data-finished]").hidden = this.stamps.size !== this.stations.size;
      this.querySelector("[data-restart]").hidden = this.position === this.dataset.start && !this.stamps.size;
    }

    onClick(event) {
      const station = event.target.closest("[data-stop]");
      if (station) {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
        if (station.dataset.point === this.position && this.stamps.has(station.dataset.stop)) return;
        event.preventDefault();
        this.walkTo(station.dataset.point);
        return;
      }
      const control = event.target.closest("[data-move]");
      if (control) this.move(control.dataset.move);
      if (event.target.closest("[data-restart]")) {
        this.cancelWalk();
        this.position = this.dataset.start;
        this.stamps.clear();
        this.paint();
        this.save();
        this.status.textContent = this.labels.restored;
        this.board.focus({ preventScroll: true });
      }
    }

    onKey(event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const direction = keys[event.code] || keys[event.key];
      if (direction) {
        event.preventDefault();
        if (event.target !== this.board) this.board.focus({ preventScroll: true });
        this.move(direction);
      } else if (event.key === "Enter" && event.target === this.board && !this.enter.hidden) {
        event.preventDefault();
        this.enter.click();
      }
    }
  }
  customElements.define("studio-walk", StudioWalk);
})();
