// app/about/page.tsx
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { FM } from "@/components/motion";
import { Lightbulb, Settings, ShieldCheck, Wrench, ArrowRight } from "lucide-react";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "About – Vi-Tech",
  description: "About Vi-Tech",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />

      {/* BRAND PANEL */}
      <section
        className="relative isolate overflow-hidden py-16 md:py-24
        bg-[radial-gradient(1200px_600px_at_95%_-120px,rgba(99,102,241,0.35),transparent_60%),radial-gradient(900px_500px_at_-120px_120%,rgba(37,99,235,0.28),transparent_60%)]
        bg-[#0e0a24]"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-16">
            {/* Our Mission + illustration (right) */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              <div className="max-w-3xl">
                <FM as="h2" className="font-display text-3xl md:text-4xl font-bold text-white">
                  Our Mission
                </FM>
                <FM
                  as="p"
                  delay={0.05}
                  className="mt-5 text-white/85 leading-relaxed text-lg"
                >
                  To create software that simplifies business improvement tools without dilution, enabling all employees to be involved and engaged. Changing the way businesses look at and drive process improvement through the application of game-changing collaborative systems that track, record and measure performance in real-time, for real results.
                </FM>
              </div>

              <FM
                delay={0.08}
                className="relative h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden"
              >
                <Image
                  src="/about.svg"
                  alt="Visual overview of Vi-Tech approach"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-contain p-4"
                />
              </FM>
            </div>

            {/* Our Products + illustration (left) */}
            <div className="grid items-center gap-8 md:grid-cols-2">
              {/* Illustration left on desktop */}
              <FM className="order-2 md:order-1 relative h-56 sm:h-64 md:h-80 lg:h-96 rounded-2xl bg-white/5 ring-1 ring-white/10 overflow-hidden">
                <Image
                  src="/about2.svg"
                  alt="Suite of Vi-Tech products"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-contain p-4"
                />
              </FM>

              {/* Text right */}
              <div className="order-1 md:order-2 max-w-4xl">
                <FM as="h2" className="font-display text-3xl md:text-4xl font-bold text-white">
                  Our Products
                </FM>
                <FM
                  as="p"
                  delay={0.05}
                  className="mt-5 text-white/85 leading-relaxed text-lg"
                >
                  Having initially created ResolviT, a unique Problem Solving platform that dramatically reduces the time and cost to solve problems via a standardised approach that is coupled with a robust problem management system linked to real-time performance metrics, it became obvious to the team that further business improvement tools that are directly linked to problem solving urgently require the same VI-Tech digital makeover. This additional planned suite of business improvement tools are already in development and scheduled to launched over the next 1–3 years. Tools that will aid every business, in every sector, and are directly linked to the philosophy of Kaizen.
                </FM>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GENUINE SUPPORT */}
      <section className="py-20 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <FM as="h2" className="text-center font-display text-3xl md:text-4xl font-bold">
            Genuine Support
          </FM>
          <FM
            as="p"
            delay={0.05}
            className="mt-3 text-center text-muted-foreground max-w-3xl mx-auto text-lg"
          >
            Our in-house experts support customers in understanding and realising the true
            principles and mechanics of each applicable methodology dependent upon each
            organisation’s maturity level.
          </FM>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: Lightbulb, text: "Immediate access to raise ideas real time" },
              { Icon: Settings, text: "System operations for facilitators" },
              { Icon: ShieldCheck, text: "Super User system training" },
              { Icon: Wrench, text: "System configuration and implementation by client" },
            ].map(({ Icon, text }, i) => (
              <FM
                as="div"
                key={text}
                delay={0.06 * i}
                className="rounded-2xl border bg-white/80 backdrop-blur p-6 text-center hover:shadow-md transition-shadow"
              >
                <span className="inline-grid place-items-center h-14 w-14 rounded-xl ring-1 ring-violet-300/60">
                  <Icon className="h-7 w-7 text-violet-600" />
                </span>
                <p className="mt-4 text-base leading-relaxed">{text}</p>
              </FM>
            ))}
          </div>
        </div>
      </section>

      {/* OUR RESEARCH */}
      <section className="py-20 md:py-24 bg-[#f7f7fb]">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <FM as="h2" className="font-display text-3xl md:text-4xl font-bold">
            Our Research
          </FM>
          <FM
            as="p"
            delay={0.05}
            className="mt-4 text-muted-foreground text-lg"
          >
            VI-Tech conducted what is believed to be the only study of its kind regarding problem
            solving. Over 500 problem solving practitioners and senior management professionals
            participated and the findings were compelling. They prove that ResolvIT is not only the
            perfect fit for the market, but more importantly, there is an overwhelming need for it.
          </FM>
          <FM as="div" delay={0.12} className="mt-6">
            <Link
              href="/research"
              className="inline-flex items-center gap-2 font-semibold tracking-wide underline-offset-4 hover:underline"
              aria-label="Read our story"
            >
              READ OUR STORY <ArrowRight className="h-4 w-4" />
            </Link>
          </FM>
        </div>
      </section>

      {/* GET IN TOUCH CTA */}
      <section className="py-12 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <FM
            as="div"
            className="relative overflow-hidden rounded-3xl p-10 md:p-14 ring-1 ring-black/5
                       text-white bg-gradient-to-br from-violet-600 via-indigo-600 to-purple-700"
          >
            {/* декоративные пятна */}
            <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 -bottom-24 h-[28rem] w-[28rem] rounded-full bg-indigo-900/40 blur-3xl" />

            <div className="relative mx-auto max-w-3xl text-center">
              <FM as="h3" className="font-display text-3xl md:text-4xl font-bold">
                Get in touch
              </FM>
              <FM
                as="p"
                delay={0.05}
                className="mt-3 text-white/90 text-lg"
              >
                Get in touch for more information around our products and to understand more about how they can work for you.
                One of our team members will discuss everything with you.
              </FM>

              <FM as="div" delay={0.12} className="mt-6">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-white text-gray-900 hover:bg-white/90"
                >
                  <Link href="/contact" aria-label="Contact us">CONTACT US</Link>
                </Button>
              </FM>
            </div>
          </FM>
        </div>
      </section>
      <Footer />
    </div>
  );
}