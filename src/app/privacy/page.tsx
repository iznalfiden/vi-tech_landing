// app/privacy-policy/page.tsx
import { PrintButton } from "@/components/PrintButton";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Virtuous Improvement Technologies",
  description:
    "Privacy Policy for Virtuous Improvement Technologies Ltd. Your rights, data use, cookies, retention, and contact details.",
};

// По документу зафиксировано 04/09/2025 (день/месяц/год)
const lastUpdated = "September 4, 2025";

export default function PrivacyPolicyPage() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl/tight sm:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
              Privacy Policy
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
          <a href="#contact" className="rounded-md border px-3 py-2 text-sm hover:bg-muted">
            Contact
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
              We respect and value the privacy of everyone who visits{" "}
              <Link href="https://vi-tech.io" target="_blank" rel="noreferrer">vi-tech.io</Link>{" "}
              or uses any VI-TECH software. This Policy explains what personal data we collect and
              how we use it, consistent with applicable law and your rights. By using the Site or
              our software, you agree to this Privacy Policy. If you do not agree, please stop
              using the Site or software.
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
                  {s.list.map((li, i) => <li key={i}>{li}</li>)}
                </ol>
              ) : (
                <ul className="leading-7 marker:text-zinc-400">
                  {s.list.map((li, i) => <li key={i}>{li}</li>)}
                </ul>
              ))}

              {s.hr && <hr className="my-10 border-dashed" />}
            </section>
          ))}

          <section id="contact" className="scroll-mt-24">
            <h2 className="group inline-flex items-baseline gap-2">
              15. Contact
              <a
                href="#contact"
                aria-label="Link to Contact"
                className="no-underline text-muted-foreground opacity-0 transition group-hover:opacity-100"
              >
                #
              </a>
            </h2>
            <p>
              To contact us about anything to do with your personal data and data protection
              (including subject access requests), please use the following details
              (for the attention of): <strong>Mr Adrian Jones</strong><br />
              Email: <a href="mailto:info@vi-tech.co.uk">info@vi-tech.co.uk</a><br />
              Tel: <a href="tel:+44799010278">+44 7990 102 78</a><br />
              Postal Address: Harvest Hill House, Harvest Hill Lane, Allesley, Coventry, CV5 9DD, UK.
            </p>
          </section>

          <div className="not-prose mt-10 rounded-xl border bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
            We may change this Privacy Policy from time to time. Changes will be posted on this page
            and apply from your first use of the Site after the update. Please check back regularly.
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
              <li className="pt-1 border-t mt-2">
                <a href="#contact" className="block rounded-md px-2 py-1 hover:bg-muted">
                  15. Contact
                </a>
              </li>
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

/** Content */
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
    id: "about",
    num: 1,
    title: "Information About Us",
    body: [
      "Our Site and all software are solely owned and operated by Virtuous Improvement Technologies Ltd, a company registered in England.",
      "Registered address: Harvest Hill House, Harvest Hill Lane, Allesley, Coventry, CV5 9DD, United Kingdom.",
      "Data Protection Officer: Mr Adrian Jones · Email: info@vi-tech.co.uk · Tel: +44 7740 656573.",
    ],
    hr: true,
  },
  {
    id: "scope",
    num: 2,
    title: "What Does This Policy Cover?",
    body: [
      "This Policy applies to your use of our Site and associated software packages.",
      "Our Site may contain links to other websites; we are not responsible for how your data is collected, stored, or used by such websites. Check their policies before providing data.",
    ],
    hr: true,
  },
  {
    id: "personal-data",
    num: 3,
    title: "What is Personal Data?",
    body: [
      "Personal data is any information about you that enables you to be identified, directly or indirectly — for example, a name, an identification number, location data, or an online identifier.",
    ],
    hr: true,
  },
  {
    id: "your-rights",
    num: 4,
    title: "What Are My Rights?",
    body: [
      "Under the UK GDPR, you have rights including: to be informed; access; rectification; erasure (‘to be forgotten’); restriction; objection; data portability; and rights related to automated decision-making and profiling.",
      "For more information or to exercise your rights, contact us (see Contact). You may also contact the Information Commissioner’s Office (ICO).",
    ],
    hr: true,
  },
  {
    id: "collection-use",
    num: 5,
    title: "What Data Do You Collect and How Do You Use It?",
    body: [
      "We may collect identity and contact details, account credentials, technical data (device, IP, logs), usage and cookie/analytics data, and limited communications/service data.",
      "We use this data to provide and improve the Service, administer accounts, secure our systems, communicate with you (including support), and comply with legal obligations.",
    ],
    hr: true,
  },
  {
    id: "marketing",
    num: 6,
    title: "Marketing Preferences",
    body: [
      "We will not send unlawful marketing or spam. You can opt out of marketing emails at any time via unsubscribe links or by contacting us.",
    ],
    hr: true,
  },
  {
    id: "retention",
    num: 7,
    title: "How Long Will You Keep My Personal Data?",
    body: [
      "We do not keep personal data longer than necessary for the purpose(s) for which it was collected.",
    ],
    list: [
      "Business records are generally retained for a minimum of 6 years; certain deed contracts may be retained for 12 years.",
      "Employee medical surveillance records may be retained for 40 years (e.g., per Control of Asbestos Regulations).",
      "When due for disposal, hard-copy records are shredded.",
    ],
    hr: true,
  },
  {
    id: "storage-transfer",
    num: 8,
    title: "How and Where Do You Store or Transfer My Personal Data?",
    body: [
      "We store and process personal data in the United Kingdom; UK GDPR protections therefore apply.",
    ],
    hr: true,
  },
  {
    id: "sharing",
    num: 9,
    title: "Do You Share My Personal Data?",
    body: [
      "We do not share your personal data with third parties for their own purposes, except as required by law (e.g., legal proceedings, court orders, or government instructions).",
    ],
    hr: true,
  },
  {
    id: "control",
    num: 10,
    title: "How Can I Control My Personal Data?",
    body: [
      "In addition to your UK GDPR rights, if you submit personal data via our Site you may be given options to restrict our use for direct marketing (e.g., unsubscribe links, account settings).",
      "You may also register with TPS/CTPS/MPS in the UK to reduce unsolicited marketing.",
    ],
    hr: true,
  },
  {
    id: "withhold",
    num: 11,
    title: "Can I Withhold Information?",
    body: [
      "You may access certain areas of the Site without providing personal data, but some features may require it.",
    ],
    hr: true,
  },
  {
    id: "access",
    num: 12,
    title: "How Can I Access My Personal Data? (Subject Access Requests)",
    body: [
      "You can request details and a copy of the personal data we hold about you by submitting a subject access request (SAR) in writing (see Contact).",
      "We usually respond within one month; complex requests may take up to three months. If your request is manifestly unfounded or excessive, an administrative fee may apply.",
    ],
    hr: true,
  },
  {
    id: "cookies",
    num: 13,
    title: "Cookies & Analytics",
    body: [
      "Our Site uses first-party cookies to facilitate and improve your experience and may use certain third-party cookies.",
      "We use Google Analytics to understand how visitors use our Site. Learn more about GA cookies at:",
      'https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage',
      "See also our Cookie Policy.",
    ],
    hr: true,
  },
  {
    id: "changes",
    num: 14,
    title: "Changes to this Privacy Policy",
    body: [
      "We may update this Policy if the law changes or our business practice changes. Updates will be posted on this page.",
    ],
    hr: false,
  },
];