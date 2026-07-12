import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"

type ReleaseStatus = "available" | "forthcoming" | "writing"
const releases: Array<{ title: string; artist: string; year: string; type: string; tracks: number | null; genre: string; status: ReleaseStatus; description: string; icon: string; color: string }> = [
  { title: "Sandabado", artist: "Sandabado", year: "2026", type: "Debut Album", tracks: 10, genre: "Ambient / Electronic / Devotional", status: "available", description: "The debut album. Ten tracks of ambient, electronic, and devotional sound. Recorded in Morongo Valley with rammed earth acoustics.", icon: "🜄", color: "#2BA8A0" },
  { title: "Living Earth: Vol. 1", artist: "Various Artists", year: "2026", type: "Compilation", tracks: 12, genre: "Compilation / Multi-genre", status: "available", description: "Twelve tracks. Twelve artists. Each tuned to a frequency of the Living Earth.", icon: "🜄", color: "#2BA8A0" },
  { title: "Memory EP", artist: "Sarah Veya", year: "2026", type: "EP", tracks: 5, genre: "Vocal / Atmospheric", status: "forthcoming", description: "Debut EP from Sarah Veya. Voice like water on glass. Currently tracking in the booth.", icon: "🜄", color: "#2BA8A0" },
  { title: "Untitled", artist: "Marcus Reed", year: "2027", type: "Album", tracks: null, genre: "Guitar / Ambient", status: "writing", description: "Solo work in development. Currently scoring The Instrument. Early demos show fire and restraint in equal measure.", icon: "🜂", color: "#C2542D" },
]

export default function RecordsPage() {
  return <InternalPage solid="icosahedron" color="43,168,160" lighterBackdrop>
    <section className="px-6 py-16 text-center sm:py-20">
      <Link href="/pillars/studios" className="font-[family-name:var(--font-mono)] text-xs tracking-[.12em] uppercase text-[var(--ghost)] transition hover:text-[#2BA8A0]">← Back to Studios</Link>
      <span className="mt-8 block text-4xl">📀</span>
      <p className="mt-4 font-[family-name:var(--font-mono)] text-[10px] tracking-[.3em] uppercase text-[var(--halo-dim)]">Whole Body Records</p>
      <h1 className="mt-4 font-[family-name:var(--font-display)] text-5xl text-[var(--bone)]">Records</h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--ghost)]">Every release is owned by the artist. We engineer the river. We do not dam it. Streaming, vinyl, and direct-to-disc. The signal becomes physical.</p>
    </section>
    <section className="px-6 pb-16 sm:pb-20"><div className="mx-auto max-w-5xl"><p className="mb-8 font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">Catalog</p><div className="space-y-8">
      {releases.map((release) => <InternalPanel key={release.title} className="border-[var(--mercury)] bg-[var(--steel)] p-8"><div className="flex flex-col gap-8 md:flex-row"><div className="flex h-48 w-full shrink-0 items-center justify-center border border-[var(--mercury)] bg-[var(--carbon)] md:w-48"><span className="text-4xl" style={{ color: release.color }}>{release.icon}</span></div><div className="flex-1"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--bone)]">{release.title}</h2><p className="mt-1 font-[family-name:var(--font-mono)] text-sm text-[var(--ghost)]">{release.artist} · {release.year}</p></div><StatusBadge status={release.status} /></div><p className="mt-5 font-[family-name:var(--font-mono)] text-xs text-[var(--halo-dim)]">{release.type}{release.tracks ? ` · ${release.tracks} tracks` : ""} · {release.genre}</p><p className="mt-3 leading-7 text-[var(--ghost)]">{release.description}</p>{release.status === "available" ? <div className="mt-6 flex flex-wrap gap-3"><a href="/store" className="px-5 py-2 font-[family-name:var(--font-mono)] text-xs tracking-[.1em] uppercase text-[var(--void)]" style={{ backgroundColor: "var(--halo)" }}>Stream Now →</a><a href="/store" className="border border-[var(--mercury)] px-5 py-2 font-[family-name:var(--font-mono)] text-xs tracking-[.1em] uppercase text-[var(--ghost)] transition hover:border-[var(--bone)] hover:text-[var(--bone)]">Vinyl</a><Link href="/store" className="border border-[var(--mercury)] px-5 py-2 font-[family-name:var(--font-mono)] text-xs tracking-[.1em] uppercase text-[var(--ghost)] transition hover:border-[var(--bone)] hover:text-[var(--bone)]">Buy</Link></div> : <span className="mt-6 inline-block border border-[var(--mercury)] px-4 py-2 font-[family-name:var(--font-mono)] text-xs tracking-[.1em] uppercase text-[var(--halo-dim)]">{release.status === "forthcoming" ? "Forthcoming" : "In Writing"}</span>}</div></div></InternalPanel>)}
    </div></div></section>
  </InternalPage>
}

function StatusBadge({ status }: { status: ReleaseStatus }) {
  const styles = { available: { background: "rgb(0 255 194 / 15%)", color: "#00FFC2", label: "Available" }, forthcoming: { background: "rgb(201 162 39 / 15%)", color: "#C9A227", label: "Forthcoming" }, writing: { background: "rgb(136 136 160 / 15%)", color: "#8888A0", label: "In Writing" } }[status]
  return <span className="px-3 py-1 font-[family-name:var(--font-mono)] text-xs tracking-[.08em] uppercase" style={{ backgroundColor: styles.background, color: styles.color }}>{styles.label}</span>
}
