// app/services/page.tsx
import type { Metadata } from "next";
import { FM } from "@/components/motion";
import { Briefcase, GraduationCap, FileText, ArrowRight, CheckCircle } from "lucide-react";
import { createMetadata } from "@/lib/og";

export const metadata: Metadata = createMetadata({
  title: "Services",
  description: "Vi-Tech professional services: Operational Excellence Consultancy, Lean Training & Capability Development, Technical Process Documentation",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white text-foreground">
      {/* HERO */}
      <section
        className="relative isolate overflow-hidden py-16 md:py-24
        bg-[radial-gradient(1200px_600px_at_95%_-120px,rgba(99,102,241,0.35),transparent_60%),radial-gradient(900px_500px_at_-120px_120%,rgba(37,99,235,0.28),transparent_60%)]
        bg-[#0e0a24]"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <FM as="h1" className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Vi-Tech Services
            </FM>
            <FM
              as="p"
              delay={0.05}
              className="mt-6 text-xl md:text-2xl text-white/90 leading-relaxed"
            >
              Supporting Organisations to Achieve Sustainable Operational Excellence
            </FM>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4">
          <FM
            as="p"
            className="text-lg text-muted-foreground leading-relaxed"
          >
            While the Vi-Tech platform provides a powerful digital system for managing operational excellence, 
            many organisations also require practical support to design, implement and sustain improvement initiatives.
          </FM>
          <FM
            as="p"
            delay={0.05}
            className="mt-4 text-lg text-muted-foreground leading-relaxed"
          >
            For this reason, Vi-Tech offers a range of professional services designed to help organisations 
            strengthen their operational systems and maximise the value of the platform.
          </FM>
          <FM
            as="p"
            delay={0.1}
            className="mt-4 text-lg text-muted-foreground leading-relaxed"
          >
            These services combine digital operational excellence tools with hands-on improvement expertise, 
            ensuring that organisations not only gain visibility into their operations but also develop the 
            capability required to continuously improve them.
          </FM>
        </div>
      </section>

      {/* THREE SERVICE AREAS */}
      <section className="py-16 md:py-20 bg-[#f7f7fb]">
        <div className="mx-auto max-w-7xl px-4">
          <FM as="h2" className="text-2xl md:text-3xl font-bold text-center mb-12">
            Our services typically fall into three areas:
          </FM>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { 
                Icon: Briefcase, 
                title: "Operational Excellence Consultancy",
                desc: "Designing and implementing high-performance operational systems"
              },
              { 
                Icon: GraduationCap, 
                title: "Lean Training & Capability Development",
                desc: "Building internal operational excellence expertise"
              },
              { 
                Icon: FileText, 
                title: "Technical Process Documentation",
                desc: "Capturing operational knowledge and process standards"
              },
            ].map(({ Icon, title, desc }, i) => (
              <FM
                as="div"
                key={title}
                delay={0.08 * i}
                className="rounded-2xl border bg-white p-8 text-center hover:shadow-lg transition-shadow"
              >
                <span className="inline-grid place-items-center h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-lg">
                  <Icon className="h-8 w-8" />
                </span>
                <h3 className="mt-6 text-xl font-bold">{title}</h3>
                <p className="mt-3 text-muted-foreground">{desc}</p>
              </FM>
            ))}
          </div>

          <FM
            as="p"
            delay={0.3}
            className="mt-10 text-center text-lg text-muted-foreground"
          >
            Together these services help organisations build the operational foundations required to achieve sustainable performance improvements.
          </FM>
        </div>
      </section>

      {/* INTEGRATING SERVICES */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <FM as="h2" className="text-2xl md:text-3xl font-bold">
                Integrating Services with the Vi-Tech Platform
              </FM>
              <FM
                as="p"
                delay={0.05}
                className="mt-4 text-lg text-muted-foreground leading-relaxed"
              >
                A key advantage of working with Vi-Tech is the ability to combine consultancy, 
                training and documentation services with the Vi-Tech digital platform.
              </FM>
              <FM
                as="p"
                delay={0.1}
                className="mt-4 text-lg font-medium text-foreground"
              >
                This allows organisations to:
              </FM>
            </div>
            <FM delay={0.15} className="space-y-4">
              {[
                "Document operational processes within StandardiziT",
                "Verify process adherence through GoSeeiT audits",
                "Manage operational problems through ResolviT",
                "Capture and implement improvement ideas through ImproviT",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#f7f7fb]">
                  <CheckCircle className="h-6 w-6 text-violet-600 shrink-0 mt-0.5" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </FM>
          </div>

          <FM
            as="p"
            delay={0.2}
            className="mt-12 text-center text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            By connecting these activities within a single system, organisations create a closed-loop 
            operational excellence environment that continuously strengthens operational performance.
          </FM>
        </div>
      </section>

      {/* SUPPORTING AT EVERY STAGE */}
      <section className="py-16 md:py-20 bg-[#0e0a24] text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <FM as="h2" className="text-2xl md:text-3xl font-bold">
            Supporting Organisations at Every Stage of Their Improvement Journey
          </FM>
          <FM
            as="p"
            delay={0.05}
            className="mt-6 text-lg text-white/85 leading-relaxed"
          >
            Organisations engage Vi-Tech services at many different stages of their Operational Excellence journey. 
            Some organisations require support to establish their first structured improvement system, 
            while others seek to strengthen existing improvement programmes or digitise their operational management systems.
          </FM>
          <FM
            as="p"
            delay={0.1}
            className="mt-6 text-lg text-white/90 font-medium"
          >
            Regardless of the starting point, the goal remains the same: to help organisations develop the systems, 
            knowledge and operational discipline required to continuously improve the way work is performed.
          </FM>
        </div>
      </section>

      {/* OPERATIONAL EXCELLENCE CONSULTANCY */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <FM as="h2" className="text-2xl md:text-3xl font-bold">
              Operational Excellence Consultancy
            </FM>
            <FM
              as="p"
              delay={0.05}
              className="mt-2 text-lg text-violet-600 font-medium"
            >
              Designing and Implementing High-Performance Operational Systems
            </FM>
            <FM
              as="p"
              delay={0.1}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              Operational Excellence cannot be achieved through software or improvement tools alone. 
              Sustainable improvement requires a structured operational system supported by clear processes, 
              leadership engagement and disciplined management practices.
            </FM>
            <FM
              as="p"
              delay={0.15}
              className="mt-4 text-lg text-muted-foreground leading-relaxed"
            >
              Vi-Tech consultants work alongside organisations to design and implement the operational 
              frameworks required to achieve these outcomes.
            </FM>
          </div>

          <FM
            as="div"
            delay={0.2}
            className="mt-10 rounded-2xl bg-[#f7f7fb] p-8 md:p-10"
          >
            <h3 className="text-lg font-semibold mb-6">Our consultancy services focus on building the core elements of Operational Excellence, including:</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Operational performance diagnostics",
                "Value stream analysis and process mapping",
                "Production flow optimisation",
                "Workload balancing and line design",
                "Operational governance structures",
                "Structured problem solving systems",
                "Improvement programme design",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ArrowRight className="h-4 w-4 text-violet-600 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </FM>

          <FM
            as="p"
            delay={0.25}
            className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-4xl"
          >
            These engagements are designed to strengthen the organisation&apos;s operational system rather than 
            deliver isolated improvement projects. The objective is to help organisations build a self-sustaining 
            improvement capability that continues to deliver results long after the initial engagement has concluded.
          </FM>
        </div>
      </section>

      {/* LEAN TRAINING */}
      <section className="py-16 md:py-20 bg-[#f7f7fb]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <FM as="h2" className="text-2xl md:text-3xl font-bold">
              Lean Training & Capability Development
            </FM>
            <FM
              as="p"
              delay={0.05}
              className="mt-2 text-lg text-violet-600 font-medium"
            >
              Building Internal Operational Excellence Expertise
            </FM>
            <FM
              as="p"
              delay={0.1}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              Sustainable improvement requires organisations to develop internal capability. 
              Vi-Tech therefore provides a range of structured training programmes designed to equip 
              teams with the knowledge and practical skills required to drive improvement initiatives.
            </FM>
          </div>

          <FM
            as="div"
            delay={0.15}
            className="mt-10 rounded-2xl bg-white p-8 md:p-10 shadow-sm"
          >
            <h3 className="text-lg font-semibold mb-6">Training programmes typically cover key Operational Excellence disciplines such as:</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Lean principles and operational excellence fundamentals",
                "Standardised work development",
                "Waste identification and process improvement",
                "Problem solving and root cause analysis",
                "Continuous improvement methods",
                "Lean leadership Behaviours and governance",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ArrowRight className="h-4 w-4 text-violet-600 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </FM>

          <FM
            as="p"
            delay={0.2}
            className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-4xl"
          >
            Training sessions are designed to be highly practical and often include real operational 
            examples and hands-on workshops. By developing internal improvement capability, organisations 
            ensure that Operational Excellence becomes part of everyday management practice rather than 
            a temporary initiative.
          </FM>
        </div>
      </section>

      {/* TECHNICAL PROCESS DOCUMENTATION */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <FM as="h2" className="text-2xl md:text-3xl font-bold">
              Technical Process Documentation
            </FM>
            <FM
              as="p"
              delay={0.05}
              className="mt-2 text-lg text-violet-600 font-medium"
            >
              Capturing Operational Knowledge and Process Standards
            </FM>
            <FM
              as="p"
              delay={0.1}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              One of the most common challenges within operational environments is the absence of clear 
              and structured process documentation. In many organisations, critical operational knowledge 
              exists primarily in the experience of individuals rather than in documented procedures. 
              This creates risk, inconsistency and difficulty when training new employees.
            </FM>
            <FM
              as="p"
              delay={0.15}
              className="mt-4 text-lg text-muted-foreground leading-relaxed"
            >
              Vi-Tech provides specialist services to support the creation of high-quality operational 
              documentation across manufacturing, engineering and maintenance processes.
            </FM>
          </div>

          <FM
            as="div"
            delay={0.2}
            className="mt-10 rounded-2xl bg-[#f7f7fb] p-8 md:p-10"
          >
            <h3 className="text-lg font-semibold mb-6">This includes:</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Standardised work instructions",
                "Manufacturing process documentation",
                "Maintenance procedures and task instructions",
                "Safety and operational control procedures",
                "Engineering process documentation",
                "Training and onboarding documentation",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <ArrowRight className="h-4 w-4 text-violet-600 shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </FM>

          <FM
            as="p"
            delay={0.25}
            className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-4xl"
          >
            These documents are designed not simply as administrative records but as practical operational 
            guides that help teams perform work safely, consistently and efficiently. Where appropriate, 
            documentation can also be integrated directly into the StandardiziT platform, allowing organisations 
            to manage process standards digitally.
          </FM>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0e0a24]">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <FM as="h2" className="text-2xl md:text-3xl font-bold text-white">
            Ready to Strengthen Your Operational Excellence?
          </FM>
          <FM
            as="p"
            delay={0.05}
            className="mt-4 text-lg text-white/85"
          >
            Contact us to discuss how Vi-Tech services can support your improvement journey.
          </FM>
          <FM delay={0.1} className="mt-8">
            <a
              href="/book-demo"
              className="inline-flex items-center gap-2 rounded-full bg-white text-[#0e0a24] px-8 py-4 font-semibold hover:bg-white/90 transition-colors"
            >
              Book a Consultation
              <ArrowRight className="h-5 w-5" />
            </a>
          </FM>
        </div>
      </section>
    </div>
  );
}
