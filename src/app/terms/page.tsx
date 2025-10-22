// app/terms/page.tsx
import { PrintButton } from "@/components/PrintButton";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | Virtuous Improvement Technologies",
  description: "Terms of Service for Virtuous Improvement Technologies Ltd.",
};

const lastUpdated = "March 22, 2023";

export default function TermsPage() {
  return (
    <main id="top" className="mx-auto max-w-6xl px-4 py-12">
      {/* Header */}
      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl/tight sm:text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-100 dark:to-zinc-400">
              Terms &amp; Conditions
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
          <a
            href="#contact"
            className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
          >
            Contact
          </a>
        </div>
      </header>

      {/* Layout: Content + Sticky ToC */}
      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        {/* Content */}
        <article className="prose prose-zinc max-w-none dark:prose-invert">
          {/* Intro callout */}
          <section className="not-prose rounded-xl border bg-card px-5 py-4 shadow-sm print:shadow-none mb-4">
            <p className="m-0">
              Virtuous Improvement Technologies Ltd. (“VI-TECH”) owns and operates the website{" "}
              <Link href="https://vi-tech.io" target="_blank" rel="noreferrer">vi-tech.io</Link>{" "}
              (the “Site”). The Site and related services, including updates and enhancements, are
              collectively the “Service”. By accessing or using any part of the Service, you agree to
              these Terms &amp; Conditions and the referenced{" "}
              <Link href="/privacy-policy">Privacy Policy</Link> and{" "}
              <Link href="/copyright">Copyright Policy</Link>.
            </p>
          </section>

          {SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <h2 className="group inline-flex items-baseline gap-2">
                <span className="text-zinc-900 dark:text-zinc-100">{s.num}.</span>
                {s.title}
                {/* якорь-ссылка без JS */}
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

              {s.list && (
                <ul className="leading-7 marker:text-zinc-400">
                  {s.list.map((li, i) => <li key={i}>{li}</li>)}
                </ul>
              )}
              <hr className="my-10 border-dashed" />
            </section>
          ))}

          <section id="contact" className="scroll-mt-24">
            <h2 className="group inline-flex items-baseline gap-2">
              17. Contact
              <a
                href="#contact"
                aria-label="Link to Contact"
                className="no-underline text-muted-foreground opacity-0 transition group-hover:opacity-100"
              >
                #
              </a>
            </h2>
            <p>
              If you have questions about the Service or these Terms of Use, contact:<br />
              <strong>Virtuous Improvement Technologies Limited</strong><br />
              Harvest Hill House, Harvest Hill Lane, Allesley, Coventry, UK. CV59DD<br />
              <a href="mailto:info@Vi-Tech.io">info@Vi-Tech.io</a>
            </p>
          </section>

          <div className="not-prose mt-10 rounded-xl border bg-muted/40 px-5 py-4 text-sm text-muted-foreground">
            These Terms incorporate the VI-TECH Privacy Policy and Copyright Policy.
            Your continued use of the Service following notice of changes constitutes acceptance.
          </div>

          <div className="mt-8 print:hidden">
            <a href="#top" className="text-sm text-muted-foreground hover:underline">
              ↑ Back to top
            </a>
          </div>
        </article>

        {/* Sticky ToC */}
        <aside
          aria-label="Table of contents"
          className="print:hidden lg:sticky lg:top-24 self-start"
        >
          <div className="rounded-xl border bg-card shadow-sm p-4">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Contents
            </div>
            <ol className="space-y-1.5 text-sm leading-6">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="block rounded-md px-2 py-1 hover:bg-muted"
                  >
                    {s.num}. {s.title}
                  </a>
                </li>
              ))}
              <li className="pt-1 border-t mt-2">
                <a href="#contact" className="block rounded-md px-2 py-1 hover:bg-muted">
                  17. Contact
                </a>
              </li>
            </ol>
          </div>

          {/* Small print hint */}
          <div className="mt-3 rounded-xl border bg-background p-3 text-xs text-muted-foreground">
            Tip: use the “Print / Save PDF” button to export this page.
          </div>
        </aside>
      </div>
    </main>
  );
}

/** Content */
const SECTIONS: {
  id: string;
  num: number;
  title: string;
  body: string[];
  list?: string[];
}[] = [
  {
    id: "acceptance",
    num: 1,
    title: "Acceptance of Terms",
    body: [
      "The Service is offered subject to acceptance, without modification, of all terms herein. If you do not agree, do not access or use the Service.",
      "Completing registration or otherwise using any part of the Service constitutes a legally binding agreement to these Terms, including the then-current Privacy Policy and Copyright Policy.",
    ],
  },
  {
    id: "eligibility-fees",
    num: 2,
    title: "Eligibility; Fees & Payment",
    body: [
      "You must be at least 18 years old to use the Service.",
      "Access and use are subject to an executed Order Form and payment of applicable fees. Use during the specified Service Term is limited to the Account Holder and its Authorised Users.",
      "Taxes applicable to the Service are the responsibility of the Account Holder.",
      "Trial or evaluation access is for non-productive, non-commercial evaluation only.",
    ],
  },
  {
    id: "registration",
    num: 3,
    title: "Registration",
    body: [
      "Users must provide current, complete and accurate information as required by the registration process and keep it updated.",
      "Account Holders and Authorised Users are solely responsible for maintaining the confidentiality of usernames and passwords and for all activities under their accounts.",
    ],
  },
  {
    id: "privacy",
    num: 4,
    title: "Privacy",
    body: [
      "VI-TECH’s current Privacy Policy applies. VI-TECH may disclose User Content if necessary to operate the Service, as authorised by the User, as permitted by these Terms/Privacy Policy, or to comply with legal obligations and protect rights, property, and safety.",
    ],
  },
  {
    id: "changes",
    num: 5,
    title: "Changes",
    body: [
      "VI-TECH may modify these Terms at any time. Material changes will be notified with reasonable efforts at least 30 days in advance via email or a notice on the Site.",
      "Continued use after notice constitutes acceptance.",
    ],
  },
  {
    id: "rules",
    num: 6,
    title: "User Rules & Conduct",
    body: [
      "Use is limited to internal business or personal, non-commercial purposes. Unauthorised use is prohibited.",
      "Users are responsible for acts or omissions under their account.",
    ],
    list: [
      "Do not upload unlawful, infringing, deceptive, harassing, obscene or otherwise prohibited content.",
      "No spamming, chain letters, lotteries or gambling.",
      "Do not overload infrastructure or attempt unauthorised access.",
      "No viruses or code intended to disrupt systems.",
      "Do not create accounts by automated means or under false pretences.",
      "Do not scrape or harvest, solicit information from/about minors, disguise the source, or impersonate others.",
      "VI-TECH may suspend/terminate access for violations.",
    ],
  },
  {
    id: "support",
    num: 7,
    title: "Support",
    body: [
      "VI-TECH provides reasonable support via email during regular business hours per its support policy.",
      "Requests should be sent to support@Vi-Tech.io. VI-TECH aims to respond within 1 business day.",
    ],
  },
  {
    id: "content",
    num: 8,
    title: "Content",
    body: [
      "VI-TECH may monitor and disclose information as needed to satisfy laws and obligations. It may remove User Content that does not comply with these Terms.",
      "While VI-TECH uses reasonable efforts to safeguard User Content, absolute security cannot be guaranteed.",
    ],
  },
  {
    id: "proprietary-rights",
    num: 9,
    title: "Proprietary Rights",
    body: [
      "The Service and materials provided are protected by IP laws. VI-TECH and its licensors retain all rights, title and interest.",
      "Restrictions include, without limitation: no reverse engineering, copying, sublicensing, distribution, or use to develop competing products.",
    ],
  },
  {
    id: "license-user-content",
    num: 10,
    title: "License of User Content to VI-TECH",
    body: [
      "By submitting User Content, you grant VI-TECH a non-exclusive, transferable, perpetual, irrevocable, royalty-free, worldwide licence to use such content to operate the Service (including via third-party providers).",
      "VI-TECH may aggregate and analyse User Content, disclosing only non-identifying aggregate information.",
      "User represents it owns/controls rights to the content. Removed content may persist in aggregated or previously shared/exported forms.",
      "You agree to reasonably cooperate in case studies; VI-TECH may use your company name.",
    ],
  },
  {
    id: "term-termination",
    num: 11,
    title: "Term; Termination",
    body: [
      "These Terms apply during the Service Term(s). VI-TECH may terminate upon notice (e.g., 30 days’ notice generally; 10 days for non-payment).",
      "Upon termination (except for breach by User), VI-TECH will refund prepaid amounts for unused Service portions not already incurred.",
      "Obligations accrued prior to termination and Sections 8–17 survive. After termination, VI-TECH may delete account content.",
    ],
  },
  {
    id: "disclaimer",
    num: 12,
    title: "Disclaimer of Warranties",
    body: [
      "THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE”, WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING TITLE, NON-INFRINGEMENT, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND ANY ARISING FROM USAGE OF TRADE.",
      "VI-TECH DOES NOT WARRANT TIMELINESS, ACCURACY, AVAILABILITY, ERROR-FREE OPERATION, VIRUS-FREE OPERATION, OR ANY PARTICULAR RESULTS.",
    ],
  },
  {
    id: "limitation-liability",
    num: 13,
    title: "Limitation of Liability",
    body: [
      "EXCEPT TO THE EXTENT VI-TECH FAILS TO USE COMMERCIALLY REASONABLE EFFORTS TO PROTECT USER CONTENT, VI-TECH IS NOT LIABLE FOR UNAUTHORISED ACCESS OR USE OF ACCOUNTS/TRANSMISSIONS/DATA.",
      "IN NO EVENT WILL VI-TECH BE LIABLE FOR: matters beyond its control; data loss or interruption; indirect/special/incidental/consequential damages; or, in aggregate, more than amounts paid in the previous 12 months or US$50, whichever is greater.",
    ],
  },
  {
    id: "indemnification",
    num: 14,
    title: "Indemnification",
    body: [
      "VI-TECH will defend and indemnify Users against third-party claims that the Service (excluding User Content) infringes IP rights, subject to exceptions.",
      "Users will defend and indemnify VI-TECH against claims arising from interactions with third parties, misuse of the Service, or breach of these Terms.",
    ],
  },
  {
    id: "disputes",
    num: 15,
    title: "Disputes",
    body: [
      "A printed version of these Terms and electronic notices is admissible in proceedings.",
      "These Terms are governed by the laws of the United Kingdom, and disputes are settled under those laws.",
    ],
  },
  {
    id: "general",
    num: 16,
    title: "General Provisions",
    body: [
      "These Terms (including the Privacy Policy and Copyright Policy) are the entire agreement regarding the Service.",
      "If any provision is unenforceable, it will be limited to the minimum extent necessary.",
      "User’s rights are personal and non-assignable without VI-TECH’s consent. VI-TECH may assign without consent.",
      "No partnership, joint venture, or employment is created. Notices must be in writing (mail, email, or overnight delivery).",
    ],
  },
];