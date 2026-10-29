import Link from "next/link";

import { blogPosts } from "@/content/blog";

export function Guides() {
  return (
    <section id="guides" className="border-t border-white/10 bg-black text-[#F4F1E8]">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="font-display text-sm tracking-[0.22em] text-white/40 uppercase">Guides</p>
        <h2 className="section-heading mt-4 max-w-3xl">Practice the problems Two5 is built around.</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-white/55">
          Two5 is a mental training ground in development. Numbers and Logic are the launch arenas. Computer
          Science and Memory & Visual come in later waves. You cannot play a round on this site yet. The first
          The waitlist stays open through November 30, 2026. On December 1, 200 people are selected and sent a WhatsApp invite. The product launches for them on December 12, and from January 1 each person can invite one player. One invite per person. Read the{" "}
          <Link href="/roadmap" className="text-white/80 underline decoration-white/30 underline-offset-[3px]">
            roadmap
          </Link>{" "}
          for how access works. These guides are practice, with answers. Two5 does not claim to raise IQ. The
          longer note on what we will not claim is on the{" "}
          <Link href="/about" className="text-white/80 underline decoration-white/30 underline-offset-[3px]">
            About page
          </Link>
          .
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {blogPosts
            .filter((post) => !post.ctaHref)
            .map((post) => (
              <li key={post.slug} className="border border-white/10 p-4">
                <Link href={`/blog/${post.slug}`} className="block hover:text-[#f0c020]">
                  <span className="font-display text-2xl leading-none tracking-[0.02em]">{post.title}</span>
                  <span className="mt-2 block text-sm leading-6 text-white/50">{post.summary}</span>
                </Link>
              </li>
            ))}
        </ul>
        <p className="mt-10 font-display text-sm tracking-[0.22em] text-white/40 uppercase">Evidence</p>
        <ul className="mt-4 grid gap-3">
          {blogPosts
            .filter((post) => post.ctaHref)
            .map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="text-base text-white/70 underline decoration-white/20 underline-offset-[3px] hover:text-[#f0c020]">
                  {post.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
