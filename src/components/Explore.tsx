import { createElement } from "react";
import Script from "next/script";
import { copy, pagePath, type Language } from "@/lib/portfolio";
import { sections, stopName, stops, walkCopy } from "@/lib/sections";
import { Building, mapPosition, town, TownPlan, Walker } from "./WalkArt";
import { Footer, Header, Icon, JsonLd } from "./Portfolio";
import "./walk.css";

function WalkingMap({ lang }: { lang: Language }) {
  const t = walkCopy[lang];
  const labels = { idle: t.idle, at: t.at, transit: t.transit, blocked: t.blocked, restored: t.restored };
  return createElement("studio-walk", { "data-start": town.start.join(","), "data-labels": JSON.stringify(labels) },
    <div className="walk-layout">
      <div className="map-sheet">
        <div className="board" role="group" aria-label={t.board} aria-describedby="walk-help" tabIndex={0} data-board="">
          <TownPlan />
          {stops.map(({ id, column, row }, i) => <a key={id} href={pagePath(lang, id)}
            className="landmark" data-stop={id} data-point={column + "," + row} data-name={stopName(lang, id)}
            style={mapPosition(column,row)}>
            <Building id={id} /><span className="landmark-name" dir="auto">{t.mapShort[i]}</span>
          </a>)}
          <span className="walker" aria-hidden="true" data-player="" style={mapPosition(...town.start)}><Walker /></span>
        </div>
        <div className="arrival game-only">
          <p data-status="" role="status">{t.idle}</p>
          <a data-enter="" className="button" hidden>{t.open}<Icon name="forward" /></a>
        </div>
        <div className="map-controls">
          <p id="walk-help"><span className="game-only">{t.help}</span><span className="basic-only">{t.basic}</span></p>
          <div className="dpad game-only" dir="ltr" role="group" aria-label={t.pad}>
            {([["up", "↑"], ["left", "←"], ["down", "↓"], ["right", "→"]] as const).map(([move, arrow]) =>
              <button type="button" key={move} className={"move-" + move} data-move={move} aria-label={t[move]}><span aria-hidden="true">{arrow}</span></button>)}
          </div>
        </div>
      </div>
      <aside className="passbook" aria-labelledby="passport-title">
        <div className="player-id"><span className="player-preview" aria-hidden="true"><Walker /></span><div><small>{lang === "ar" ? "شخصية الجولة" : "Your character"}</small><strong>{copy[lang].name}</strong></div></div>
        <h2 id="passport-title">{t.passport}</h2>
        <div className="stamp-count game-only"><span>{t.progress}</span><bdi dir="ltr"><b data-count="">0</b> / {stops.length}</bdi></div>
        <nav aria-label={t.directory}><ul>{stops.map(({ id }) =>
          <li key={id} data-entry={id}><a href={pagePath(lang, id)}>
            <span className="stamp-icon" aria-hidden="true"><Building id={id} /></span>
            <span dir="auto">{stopName(lang,id)}</span><span className="stamp-check" hidden data-checked=""><span className="sr">{t.checked}</span><span aria-hidden="true">✓</span></span><Icon name="forward" />
          </a></li>)}</ul></nav>
        <div className="book-actions game-only">
          <p data-finished="" className="walk-finished" hidden>{t.complete}</p>
          <button className="restart" type="button" data-restart="" hidden>{t.restart}</button>
        </div>
      </aside>
    </div>);
}

export function Explore({ lang }: { lang: Language }) {
  const section = sections.explore[lang];
  return <><Header lang={lang} slug="explore" /><main id="content" className="wrap walk-page" tabIndex={-1}>
    <div className="walk-intro"><p className="overline rule-label">{section.label}</p><h1>{section.name}</h1><p>{walkCopy[lang].intro}</p></div>
    <WalkingMap lang={lang} />
    <Script src="/studio-walk.js" strategy="afterInteractive" />
  </main><Footer lang={lang} /><JsonLd lang={lang} slug="explore" /></>;
}
