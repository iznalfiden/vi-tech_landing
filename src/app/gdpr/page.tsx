// app/gdpr-compliance-statement/page.tsx
import { PrintButton } from "@/components/PrintButton";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GDPR Compliance Statement | Virtuous Improvement Technologies",
  description:
    "Our GDPR readiness: information audits, policies & procedures, SAR handling, security controls, employee obligations, and contacts.",
};

// По исходному документу: 04/09/2025 (дд/мм/гггг)
const lastUpdated = "September 4, 2025";

export default function GDPRCompliancePage() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl/tight sm:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
              GDPR Compliance Statement
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
              We are committed to protecting personal information that we process and to maintaining
              a compliant and consistent approach to data protection across our organisation. This
              statement summarises our GDPR preparation, roles, policies, procedures and controls.
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

          {/* Contact */}
          <section id="contact" className="scroll-mt-24">
            <h2 className="group inline-flex items-baseline gap-2">
              10. Contact
              <a
                href="#contact"
                aria-label="Link to Contact"
                className="no-underline text-muted-foreground opacity-0 transition group-hover:opacity-100"
              >
                #
              </a>
            </h2>
            <p>
              Report incidents or send GDPR enquiries to the Directors:<br />
              <strong>Virtuous Improvement Technologies Ltd</strong><br />
              Harvest Hill House, Harvest Hill Lane, Allesley, Coventry, CV5 9DD, UK<br />
              Email: <a href="mailto:hello@vi-tech.io">hello@vi-tech.io</a> ·{" "}
              <Link href="https://vi-tech.io/contact" target="_blank" rel="noreferrer">
                Contact form
              </Link>
            </p>
          </section>

          <div className="not-prose mt-10 rounded-xl border bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
            This statement summarises our GDPR posture and will be updated as required by law or
            practice. Please check back regularly for changes.
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
                  10. Contact
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

/** Content (adapted for web layout) */
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
    id: "commitment-scope",
    num: 1,
    title: "Commitment & Scope",
    body: [
      "We maintain a robust data protection programme aligned to GDPR and the UK’s Data Protection Act. Our objective is to operate an effective regime that safeguards personal information we process.",
    ],
    hr: true,
  },
  {
    id: "preparation",
    num: 2,
    title: "Preparation for GDPR Compliance",
    body: [
      "We updated and expanded policies, procedures, controls and roles to ensure ongoing compliance.",
    ],
    hr: true,
  },
  {
    id: "information-audit",
    num: 3,
    title: "Information Audit",
    body: [
      "We conducted a company-wide audit to identify personal data held, its sources, purposes, processing activities and disclosures.",
    ],
    hr: true,
  },
  {
    id: "policies-procedures",
    num: 4,
    title: "Policies & Procedures",
    body: [
      "We revised data protection policies and operating procedures to meet GDPR standards and relevant data protection laws.",
      "We do not store or transfer personal information outside the EU; for UK-based organisations we apply strict safeguards, encryption, and integrity controls. We perform due diligence on all recipients of personal data and ensure enforceable data subject rights.",
    ],
    hr: true,
  },
  {
    id: "sar",
    num: 5,
    title: "Subject Access Requests (SAR)",
    body: [
      "Employees and data subjects can request access to information held about them (e.g., personnel files, records, emails where they are the focus).",
      "We honour the 30-day timeframe to provide requested information, subject to lawful extensions.",
    ],
    hr: true,
  },
  {
    id: "privacy-notice",
    num: 6,
    title: "Privacy Notice / Policy",
    body: [
      "Our Privacy Notice explains why we need personal data, how we use it, individual rights, disclosures and safeguards.",
      "It is aligned to our ongoing commitment and updated as needed.",
    ],
    hr: true,
  },
  {
    id: "accuracy-retention",
    num: 7,
    title: "Accuracy & Retention",
    body: [
      "Individuals should notify us of inaccurate or outdated information so we can correct it promptly.",
      "We do not retain data longer than necessary for the purposes for which it was collected.",
    ],
    hr: true,
  },
  {
    id: "employee-obligations",
    num: 8,
    title: "Employee Obligations & Security",
    body: [
      "Employees handling personal data must keep it accurate, necessary, and secure; use password-protected and encrypted tools; lock files; and ensure proper destruction (e.g., shredding hard copies).",
      "No personal data may be taken off-site without prior consent of directors; off-site use demands heightened care (no unattended devices, prevent shoulder surfing, etc.).",
    ],
    list: [
      "Restrict access on a ‘need-to-know’ basis.",
      "Use encryption for transmitting personal/special category data.",
      "Ensure permanent removal from servers/mailboxes when disposing.",
    ],
    hr: true,
  },
  {
    id: "non-compliance",
    num: 9,
    title: "Consequences of Non-Compliance & Incident Reporting",
    body: [
      "Failure to observe data protection principles may lead to disciplinary action up to dismissal and potential personal criminal liability.",
      "Any incident of actual or potential loss of personal data must be reported to the directors immediately.",
    ],
    hr: true,
  },
];