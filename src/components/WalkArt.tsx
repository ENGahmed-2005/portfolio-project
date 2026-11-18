import type { StopId } from "@/lib/sections";

export const town = { width: 640, height: 370, start: [6, 7] as const };
const avenues = [3, 7];
const crossings = [0, 4, 8, 12];
const toX = (col: number) => 32 + col * 48;
const toY = (row: number) => 36 + row * 40;
export function mapPosition(column: number, row: number) {
  return { left: 100 * toX(column) / town.width + "%", top: 100 * toY(row) / town.height + "%" };
}
const streets = [
  ...avenues.map(row => "M32 " + toY(row) + "H608"),
  ...crossings.map(col => "M" + toX(col) + " 156V316"),
].join(" ");

function Tree({ x, y, small = false }: { x: number; y: number; small?: boolean }) {
  return <g transform={"translate(" + x + " " + y + ") scale(" + (small ? .72 : 1) + ")"}>
    <ellipse cx="2" cy="4" rx="11" ry="3" fill="#0a1b28" opacity=".38" />
    <path d="M0 3v-13" stroke="#476477" strokeWidth="3" />
    <path d="M-9-8q-4-6 1-11 1-8 9-7 7-1 9 7 5 5 0 10-4 4-9 3z" fill="#2d5960" stroke="#2c5361" strokeWidth="1.5" />
    <path d="M-5-16q1-5 5-5" fill="none" stroke="#508e89" strokeWidth="2" strokeLinecap="round" />
  </g>;
}

export function TownPlan() {
  const tiles = avenues.flatMap(row => Array.from({ length: 13 }, (_, col) => [col, row]));
  for (const col of crossings) for (const row of [4, 5, 6]) tiles.push([col, row]);
  return <svg className="town-plan" viewBox="0 0 640 370" aria-hidden="true" focusable="false">
    <defs>
      <pattern id="town-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 .5H.5V16" fill="none" stroke="#43627c" strokeWidth=".65" opacity=".45" /><circle cx="1" cy="1" r=".8" fill="#598196" /></pattern>
      <pattern id="town-water" width="24" height="12" patternUnits="userSpaceOnUse"><path d="M3 7q4 3 8 0t8 0" fill="none" stroke="#538396" strokeWidth="1.3" /></pattern>
    </defs>
    <rect width="640" height="370" fill="#122334" /><rect width="640" height="370" fill="url(#town-grid)" />
    {[52, 244, 436].map((x,i) => <g key={x} stroke="#31516b" strokeWidth="1.2">
      <rect x={x} y="27" width="152" height="110" rx="8" fill={["#1c3546","#26354b","#1b3045"][i]} />
      <rect x={x} y="176" width="152" height="118" rx="9" fill={["#1c3645","#1a3545","#22374a"][i]} />
    </g>)}
    <g stroke="#45697b" strokeWidth="1.2" fill="none">
      <g transform="translate(75 66)"><circle r="8" fill="#668da3" /><path d="M0-8v16m-8-8H8" /><path d="M-11-5v9m22-9v9" strokeWidth="2.4" /></g>
      <g transform="translate(261 48)"><path d="M0 0h118m-2 0v9M2 0v9" /><path d="m12 1 4 6 5-6m12 0 4 6 5-6m12 0 4 6 5-6m12 0 4 6 5-6m12 0 4 6 5-6" fill="#8faddf" /></g>
      <path d="M553 56h17m-17 4h17m-14 2v3m11-3v3" stroke="#52788c" />
      <g transform="translate(65 199)" fill="#607f91"><rect width="23" height="5" rx="1" /><rect x="5" y="6" width="23" height="5" rx="1" /></g>
      <path d="M449 189h120m-120 4h120" stroke="#567183" />
      {[454,469,484,499,514,529,544,559].map(x => <path key={x} d={"M"+x+" 187v8"} stroke="#7292a0" />)}
    </g>
    <g fill="none" strokeLinejoin="round" strokeLinecap="round">
      <path d={streets} stroke="#467385" strokeWidth="21" /><path d={streets} stroke="#284955" strokeWidth="18" />
      <path d={streets} stroke="#8dbec4" opacity=".55" strokeWidth="1.2" strokeDasharray="4 9" />
    </g>
    {crossings.flatMap(col => avenues.map(row => <g key={col + ":" + row} transform={"translate("+toX(col)+" "+toY(row)+")"}>
      <circle r="5.5" fill="#203b4c" stroke="#68a4b1" strokeWidth="1" /><circle r="2" fill="#81e4dd" />
    </g>))}
    <g fill="#7eb3bd">{tiles.map(([col,row]) => <circle key={col + "," + row} data-cell={col + "," + row} cx={toX(col)} cy={toY(row)} r="2" />)}</g>
    <g fill="#2a4758" stroke="#467385" strokeWidth="1.3">
      <path d="M310 177h19v116h-19z" /><path d="M245 228h150v15H245z" />
      <ellipse cx="320" cy="235" rx="37" ry="24" /><ellipse cx="320" cy="235" rx="25" ry="15" fill="#275b72" />
      <ellipse cx="320" cy="235" rx="17" ry="9" fill="none" stroke="#70b6bd" />
      <path d="M316 232v-8h8v8" fill="#639ba7" /><ellipse cx="320" cy="224" rx="11" ry="4" fill="#95c8ce" />
    </g>
    <g fill="#54758a" stroke="#435d72" strokeWidth="1"><path d="M254 254h17v4h-17zm111-44h17v4h-17z" /></g>
    {[[16,60],[26,78],[18,115],[63,118],[192,72],[242,61],[395,110],[435,56],[584,105],[617,55],[626,79],[62,272],[196,204],[257,201],[279,274],[367,274],[390,193],[442,275],[585,202],[620,234],[604,340]].map(([x,y],i)=><Tree key={x+","+y} x={x} y={y} small={i%3===0} />)}
    <path d="M-8 362q86-33 174-6t188-4 157 4 137-9v35H-8z" fill="#163b52" stroke="#396e86" strokeWidth="2" />
    <path d="M-8 365q86-33 174-6t188-4 157 4 137-9v35H-8z" fill="url(#town-water)" />
    <g transform="translate(614 23)" stroke="#80a9ba" strokeWidth="1.3"><path d="m0-12-5 13 5-3 5 3z" fill="#b0ccd6" /><path d="M0-12v10l5 3z" fill="#54788d" /></g>
  </svg>;
}

function Windows({ x, y }: { x: number; y: number }) {
  return <g fill="#a9ede6" stroke="#17303e" strokeWidth="1.4">
    {[0, 17].map(dx => <g key={dx}><rect x={x+dx} y={y} width="13" height="11" rx="1" /><path d={"M"+(x+dx+6.5)+" "+y+"v11"} /></g>)}
  </g>;
}
export function Building({ id }: { id: StopId }) {
  return <svg aria-hidden="true" className="building-art" viewBox="0 0 100 75" focusable="false">
    <ellipse cx="51" cy="68" rx="40" ry="5" fill="#020b16" opacity=".24" />
    <g stroke="#102333" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round">
      {id === "menupilot" && <>
        <path d="M17 31h66v35H17z" fill="#8bb2bd" /><path d="M15 20h69v13H15z" fill="#477589" /><path d="M12 21l7-7h59l8 7z" fill="#4eabb7" />
        <path d="M13 33h71l4 12H9z" fill="#c5ede3" />
        {[0,1,2,3].map(i => <path key={i} d={"M"+(17+i*18)+" 33h8l2 12h-11z"} fill="#45bac1" stroke="none" />)}
        <path d="M13 46v2h72v-2" fill="none" /><Windows x={22} y={49} />
        <path d="M62 48h14v18H62z" fill="#32667a" /><circle cx="72" cy="58" r="1" fill="#ffe8a0" stroke="none" />
      </>}
      {id === "khotwa" && <>
        <path d="M14 36h72v30H14z" fill="#9cabc5" /><path d="M10 37 26 18h49l15 19z" fill="#847eb9" />
        <path d="M37 66V32l13-13 13 13v34" fill="#9ba3c3" /><path d="m34 34 16-17 16 17" fill="none" />
        <path d="M44 66V51q6-8 12 0v15" fill="#486482" /><circle cx="50" cy="36" r="4" fill="#e0d5b0" />
        {[20,69].map(x=><rect key={x} x={x} y="45" width="11" height="13" fill="#c7c7ff" />)}
        <path d="M51 18V5l14 3-14 5" fill="#9faff1" />
      </>}
      {id === "rukza" && <>
        <path d="M20 39h60v27H20z" fill="#65839c" /><path d="M16 39h68v5H16z" fill="#6c99ad" />
        <path d="M24 38q2-22 26-22t26 22z" fill="#456687" /><path d="M50 16q-13 8-13 21m13-21q13 8 13 21" fill="none" stroke="#8dbfd2" />
        <path d="M45 16v-4h10v4" fill="#c4bb86" /><path d="M50 12V6" fill="none" />
        {[28,60].map(x => <path key={x} d={"M"+x+" 57v-6q5-8 10 0v6z"} fill="#a5e3e4" />)}
        <path d="M44 66V54q6-9 12 0v12z" fill="#284c67" />
      </>}
      {id === "process" && <>
        <path d="M17 36h65v30H17z" fill="#78a6ac" /><path d="M13 38V26l20-9v12l21-11v11l25-10v19z" fill="#478993" />
        <path d="M69 23V9h8v12" fill="#668399" /><path d="M67 9h12v4H67z" fill="#a2b9c6" />
        <Windows x={22} y={44} /><path d="M63 66V47h12v19" fill="#2e6473" /><path d="M12 67h76" fill="none" />
      </>}
      {id === "experience" && <>
        <path d="M13 39h74v27H13z" fill="#899aac" /><path d="m10 40 10-13h59l11 13z" fill="#6286a0" />
        <path d="M37 66V23h26v43" fill="#a8b9c7" /><path d="m32 25 18-16 18 16z" fill="#587597" />
        <circle cx="50" cy="32" r="6" fill="#f2db9d" /><path d="M50 28v4l3 2" fill="none" />
        <path d="M44 66V51q6-9 12 0v15" fill="#455e79" />
        {[18,69].map(x => <rect key={x} x={x} y="46" width="11" height="11" fill="#bce3e5" />)}
      </>}
    </g>
  </svg>;
}

export function Walker() {
  return <img src="/media/ahmed-player.svg" width="80" height="100" alt="" draggable={false} />;
}
