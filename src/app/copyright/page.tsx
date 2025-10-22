// app/copyright/page.tsx
import { PrintButton } from "@/components/PrintButton";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Copyright Policy | Virtuous Improvement Technologies",
  description:
    "Copyright Policy for Virtuous Improvement Technologies Ltd. Procedures for notices, counter-notices, and our designated agent.",
};

const lastUpdated = "March 22, 2023";

export default function CopyrightPage() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl/tight sm:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
              Copyright Policy
            </span>
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>Virtuous Improvement Technologies Ltd</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center gap-2 rounded-full border px-2 py-0.5 bg-background text-foreground/80">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Last updated: {lastUpdated}
            </span>
          </div>
        </div>

        <div className="flex gap-2 print:hidden">
          <PrintButton />
          <a href="#designated-agent" className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
            Designated Agent
          </a>
        </div>
      </header>

      {/* Layout */}
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Content */}
        <article className="prose prose-zinc max-w-none dark:prose-invert">
          {/* Intro callout */}
          <section className="not-prose rounded-xl border bg-card px-5 py-4 shadow-sm print:shadow-none mb-4">
            <p className="m-0">
              Virtuous Improvement Technologies Ltd. (“VI-TECH”) owns and operates{" "}
              <Link href="https://vi-tech.io" target="_blank" rel="noreferrer">
                vi-tech.io
              </Link>{" "}
              (the “Site”). The Site, any mobile apps (if any), and all updates, modifications and
              enhancements are the “Services”. VI-TECH has adopted this Copyright Policy in
              accordance with the United Kingdom’s Copyright, Designs and Patents Act 1988.
            </p>
          </section>

          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="group inline-flex items-baseline gap-2">
                <span className="text-zinc-900 dark:text-zinc-100">{s.num}.</span>
                {s.title}
                <a
                  href={`#${s.id}`}
                  aria-label={`Link to ${s.title}`}
                  className="no-underline text-muted-foreground opacity-0 transition group-hover:opacity-100"
                >
                  #
                </a>
              </h2>

              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}

              {s.list && (s.ordered ? (
                <ol className="list-decimal pl-5 space-y-1">
                  {s.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ol>
              ) : (
                <ul className="leading-7 marker:text-zinc-400">
                  {s.list.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              ))}

              {s.hr && <hr className="my-10 border-dashed" />}
            </section>
          ))}

          <div className="not-prose mt-10 rounded-xl border bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
            See also:{" "}
            <Link href="/terms" className="underline">
              Terms &amp; Conditions
            </Link>{" "}
            ·{" "}
            <Link href="/privacy-policy" className="underline">
              Privacy Policy
            </Link>{" "}
            ·{" "}
            <Link href="/gdpr-compliance-statement" className="underline">
              GDPR Statement
            </Link>
            .
          </div>

          <div className="mt-8 print:hidden">
            <a href="#top" className="text-sm text-muted-foreground hover:underline">
              ↑ Back to top
            </a>
          </div>
        </article>

        {/* Sticky ToC */}
        <aside aria-label="Table of contents" className="print:hidden lg:sticky lg:top-24 self-start">
          <div className="rounded-xl border bg-card shadow-sm p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contents
            </div>
            <ol className="space-y-1.5 text-sm leading-6">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="block rounded-md px-2 py-1 hover:bg-muted">
                    {s.num}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-3 rounded-xl border bg-background p-3 text-xs text-muted-foreground">
            Tip: use the “Print / Save PDF” button to export this page.
          </div>
        </aside>
      </div>
    </main>
  );
}

/** Content (adapted to web layout) */
type Section = {
  id: string;
  num: number;
  title: string;
  body: string[];
  list?: string[];
  ordered?: boolean;
  hr?: boolean;
};

const SECTIONS: Section[] = [
  {
    id: "scope",
    num: 1,
    title: "Scope & Applicability",
    body: [
      "This Policy applies to all aspects of the Services and governs how VI-TECH handles allegations of copyright infringement.",
      "VI-TECH may remove or disable access to material it believes in good faith to be infringing and may terminate access for repeat offenders.",
    ],
    hr: true,
  },
  {
    id: "reporting",
    num: 2,
    title: "Reporting Copyright Infringements",
    body: [
      "If you believe material available via the Services infringes your copyright, please send a notice to our Designated Agent containing the following:",
    ],
    ordered: true,
    list: [
      "Identification of the specific aspect of the Services to which the notice pertains.",
      "Identification of the copyrighted work or material claimed to be infringed.",
      "Identification of the material that is claimed to be infringing, including its location, with sufficient detail for VI-TECH to find and verify it.",
      "Contact information for the notifying party (name, address, telephone number, and e-mail).",
      "A statement of good-faith belief that the use is not authorised by the copyright owner, its agent, or the law.",
      "A statement under penalty of perjury that the information is accurate and that the notifying party is authorised to act on behalf of the owner.",
      "The notifying party’s physical or electronic signature.",
    ],
    hr: true,
  },
  {
    id: "response",
    num: 3,
    title: "Responding to Complaints",
    body: [
      "After receiving a valid notice, VI-TECH will take the following steps:",
    ],
    ordered: true,
    list: [
      "Remove or disable access to the allegedly infringing material.",
      "Immediately notify the user responsible for the material (the “Offending User”).",
      "If the Offending User is a repeat offender, terminate the account and access to the Services, in addition to removal.",
    ],
    hr: true,
  },
  {
    id: "counter-notice",
    num: 4,
    title: "Right to Dispute (Counter-Notice)",
    body: [
      "If the Offending User disputes the claim, they may send a counter-notice to the Designated Agent including:",
    ],
    ordered: true,
    list: [
      "Identification of the material removed or to which access was disabled, and its prior location.",
      "A statement of good-faith belief that the removal or disabling was due to mistake or misidentification.",
      "The Offending User’s contact information (name, address, telephone number, and e-mail).",
      "A statement consenting to the jurisdiction of the courts where the Offending User is located, or if outside the UK, any judicial district where VI-TECH is located, and accepting service of process from the notifying party.",
      "The Offending User’s physical or electronic signature.",
    ],
    hr: false,
  },
  {
    id: "restoration",
    num: 5,
    title: "Restoration of Material",
    body: [
      "If a counter-notice is received, VI-TECH will forward a copy to the notifying party. Unless VI-TECH receives actual notice of a court action seeking to restrain the Offending User, the material may be replaced or access restored within 10–14 business days after receipt of the counter-notice.",
    ],
    hr: true,
  },
  {
    id: "designated-agent",
    num: 6,
    title: "Designated Agent",
    body: [
      "Please direct notices and counter-notices to our Designated Agent:",
      "Virtuous Improvement Technologies Ltd.",
      "Mr Adrian Jones",
      "Harvest Hill House, Harvest Hill Lane, Allesley, Coventry, United Kingdom. CV5 9DD",
      "Tel: +44 (0)7740 656573",
      "Email: adrian.jones@vi-tech.io",
    ],
    hr: true,
  },
  {
    id: "infosec-overview",
    num: 7,
    title: "Information Security & Privacy — Overview",
    body: [
      "VI-TECH’s browser-based services are used on desktop and mobile devices. Corporate customers authorise end-users via invitations sent from our system.",
      "We collect standard contact information to bill, market and support users during their relationship with us. Data in transit is encrypted, and we rely on reputable third-party providers for storage and processing.",
    ],
    hr: false,
  },
  {
    id: "standards",
    num: 8,
    title: "Applicable Standards",
    body: [
      "Where services are accessed directly by users, the underlying infrastructure complies with recognised standards, including:",
      "ISO 27001, ISO 27017, ISO 27018, SOC 1, SOC 2, SOC 3.",
    ],
    hr: false,
  },
  {
    id: "auth",
    num: 9,
    title: "User Authentication",
    body: [
      "Users authenticate with unique passwords (six characters minimum) they choose.",
    ],
    hr: false,
  },
  {
    id: "authorization",
    num: 10,
    title: "Authorisation",
    body: [
      "Access to features is authorised based on organisation or project-level permissions within the VI-TECH portals.",
    ],
    hr: false,
  },
  {
    id: "data-privacy",
    num: 11,
    title: "Data Privacy & Security",
    body: [
      "Data in transit is encrypted via HTTPS. Data residing in persistent transactional and analytical databases is encrypted at rest.",
    ],
    hr: false,
  },
  {
    id: "monitoring",
    num: 12,
    title: "Operational Monitoring",
    body: [
      "We continuously monitor systems and alert on thresholds that may indicate attacks.",
      "Code is periodically scanned with static and dynamic analysis; we commission annual third-party penetration testing and promptly remediate vulnerabilities.",
    ],
    hr: true,
  },
];