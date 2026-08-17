import type { Metadata } from "next"

export const metadata: Metadata = { title: "Privacy" }

export default function PrivacyPage() {
  return <article className="container max-w-3xl py-16 md:py-24"><p className="text-xs font-bold tracking-[0.16em] text-muted-foreground">SONA-GLOBAL / PRIVACY</p><h1 className="mt-5 text-4xl font-bold tracking-[-0.07em]">Privacy & candidate data</h1><p className="mt-8 leading-7 text-muted-foreground">SONA-GLOBAL only uses candidate information for recruitment. CV files are private, access is restricted to the hiring team, and data should be deleted according to the organisation&apos;s documented retention policy.</p><p className="mt-4 leading-7 text-muted-foreground">Before public launch, replace this summary with an approved privacy policy, a retention period, and a contact channel for data-subject requests.</p></article>
}
