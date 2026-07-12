import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"

const films = [
  { title: "The Instrument", type: "Short Film", year: "2026", director: "Jesse Gawlik", description: "A man discovers that his body is the instrument he has been searching for." },
  { title: "Glory Peak", type: "Documentary Series", year: "2026", director: "Lila Chen", description: "Building sacred geometry in rammed earth, from ground to dodecahedron." },
  { title: "Ground", type: "Short Film", year: "2026", director: "Lila Chen", description: "A meditation on what holds. What roots. What remains. 12 minutes." },
]

export default function FilmsPage() {
  return <InternalPage solid="icosahedron" color="43,168,160" lighterBackdrop><section className="px-6 py-16 text-center sm:py-20"><Link href="/pillars/studios" className="font-[family-name:var(--font-mono)] text-xs tracking-[.12em] uppercase text-[var(--ghost)] transition hover:text-[#2BA8A0]">← Back to Studios</Link><span className="mt-8 block text-4xl">🎬</span><h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--bone)]">Films</h1><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--ghost)]">The visual signal: documentary, narrative, and experimental stories that carry the frequency of truth.</p></section><section className="px-6 pb-16 sm:pb-20"><div className="mx-auto max-w-4xl space-y-6">{films.map((film) => <InternalPanel key={film.title} className="border-[var(--mercury)] bg-[var(--steel)]"><div className="flex flex-wrap items-start justify-between gap-3"><h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--bone)]">{film.title}</h2><span className="font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">{film.year}</span></div><p className="mt-3 font-[family-name:var(--font-mono)] text-xs text-[#2BA8A0]">{film.type} · {film.director}</p><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{film.description}</p></InternalPanel>)}</div></section></InternalPage>
}
