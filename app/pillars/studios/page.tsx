import Link from "next/link"
import { InternalPage, InternalPanel } from "@/components/internal-page"

const water = "#2BA8A0"

const studioPaths = [
  { href: "/pillars/studios/records", icon: "📀", title: "Records", copy: "Albums, singles, and compilations. Every release remains owned by the artist.", action: "Enter Records" },
  { href: "/pillars/studios/films", icon: "🎬", title: "Films", copy: "Documentary, narrative, and experimental stories that carry the frequency of truth.", action: "Enter Films" },
  { href: "/pillars/studios/roster", icon: "🜄", title: "The Roster", copy: "A waterway for artists who retain everything: production, distribution, and sync.", action: "Enter Roster" },
]

export default function StudiosPage() {
  return <InternalPage solid="icosahedron" color="43,168,160" lighterBackdrop>
    <header className="relative flex min-h-[500px] items-center justify-center overflow-hidden border-b border-[var(--mercury)] px-6 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-[var(--void)]" />
      <div className="relative z-10 max-w-3xl [text-shadow:0_2px_24px_rgba(0,0,0,.94)]">
        <span className="text-6xl" style={{ color: water }}>🜄</span>
        <h1 className="mt-5 font-[family-name:var(--font-display)] text-5xl font-semibold sm:text-7xl" style={{ color: water }}>Whole Body Studios</h1>
        <p className="mt-4 font-[family-name:var(--font-display)] text-2xl text-[var(--ghost)]">The shape that remembers.</p>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs tracking-[.2em] uppercase text-[var(--ghost)]">Emotional · Water · Icosahedron · 20 faces</p>
      </div>
    </header>

    <section className="px-6 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-3xl space-y-4 text-lg leading-8">
        <p className="text-xl text-[var(--bone)]/85">Music is infrastructure. Film is infrastructure. The song is current, not content. The image is truth, not entertainment.</p>
        <p className="text-[var(--ghost)]">Artists retain 100% of their masters, publishing, and IP. The artist eats first. Always. The emotional body remembers what the song makes possible.</p>
      </div>
    </section>

    <section className="px-6 pb-12 sm:pb-16">
      <div className="mx-auto max-w-5xl">
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">Explore Studios</p>
        <div className="grid gap-6 md:grid-cols-3">
          {studioPaths.map((path) => <Link key={path.href} href={path.href} className="group">
            <InternalPanel className="h-full border-[var(--mercury)] bg-[var(--steel)] transition duration-300 group-hover:-translate-y-1" >
              <span className="block text-4xl">{path.icon}</span>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[var(--bone)] transition-colors group-hover:text-[#2BA8A0]">{path.title}</h2>
              <p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{path.copy}</p>
              <span className="mt-6 block font-[family-name:var(--font-mono)] text-xs tracking-[.12em] uppercase" style={{ color: water }}>{path.action} →</span>
            </InternalPanel>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="border-y border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">Now in Production</p>
        <div className="grid gap-6 md:grid-cols-3">
          <ProductionCard label="🎵 In the Booth" title="Sarah Veya" copy='“Memory” — debut EP tracking' />
          <ProductionCard label="🎬 In the Edit Bay" title="The Instrument" copy="Short film · Jesse Gawlik" />
          <ProductionCard label="📀 At the Lathe" title="Sandabado" copy="Debut album — vinyl pressing" />
        </div>
      </div>
    </section>

    <section className="border-b border-[var(--mercury)] px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <p className="mb-8 text-center font-[family-name:var(--font-mono)] text-[10px] tracking-[.22em] uppercase text-[var(--halo-dim)]">The Studio</p>
        <p className="mx-auto mb-8 max-w-2xl text-center leading-7 text-[var(--ghost)]">Whole Body Studios operates as a distributed production network. Tracking in Morongo Valley. Mixing in the cloud. Mastering at the lathe. We do not own a building. We own a frequency. The studio goes where the artist is.</p>
        <div className="grid gap-6 md:grid-cols-2">
          <Facility title="🏜️ Desert Studio" copy="Morongo Valley, CA. Live room, isolated tracking, and natural reverb from rammed earth walls." />
          <Facility title="🎛️ Mix Suite" copy="Cloud-based mixing with Pro Tools HD, Universal Audio, and analog summing on demand." />
          <Facility title="📀 Mastering Lathe" copy="Vinyl cutting and direct-to-disc capability — where the signal becomes physical." />
          <Facility title="🎥 Film Unit" copy="RED Komodo, Ronin, field audio, drone, and portable lighting. The crew goes where the story is." />
        </div>
      </div>
    </section>

    <section className="px-6 py-16 text-center sm:py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[var(--bone)]">Submit Your Work</h2>
        <p className="mt-4 leading-7 text-[var(--ghost)]">We review every submission personally. Music, film, visual art, or hybrid forms. If your work serves the Living Earth, we want to experience it.</p>
        <p className="mt-6 font-[family-name:var(--font-mono)] text-xs" style={{ color: water }}>Submissions open now. We respond within 14 days.</p>
        <a href="mailto:studios@wholebody.earth" className="mt-7 inline-flex px-7 py-4 font-[family-name:var(--font-display)] text-lg text-[var(--void)] transition hover:brightness-110" style={{ backgroundColor: water }}>Submit →</a>
      </div>
    </section>
  </InternalPage>
}

function ProductionCard({ label, title, copy }: { label: string; title: string; copy: string }) {
  return <InternalPanel className="border-[var(--mercury)] bg-[var(--steel)]"><p className="font-[family-name:var(--font-mono)] text-xs text-[var(--ghost)]">{label}</p><h2 className="mt-3 font-[family-name:var(--font-display)] text-lg text-[var(--bone)]">{title}</h2><p className="mt-1 text-sm text-[var(--ghost)]">{copy}</p></InternalPanel>
}

function Facility({ title, copy }: { title: string; copy: string }) {
  return <InternalPanel className="border-[var(--mercury)] bg-[var(--steel)]"><p className="font-[family-name:var(--font-mono)] text-xs" style={{ color: water }}>{title}</p><p className="mt-3 text-sm leading-6 text-[var(--ghost)]">{copy}</p></InternalPanel>
}
