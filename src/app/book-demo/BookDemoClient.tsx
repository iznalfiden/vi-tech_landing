'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2 } from 'lucide-react';

export default function BookDemoClient() {
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);

  const mk = (delay = 0) => ({
    initial: { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' as const },
    transition: { duration: 0.5, ease: 'easeOut' as const, delay },
  });

  function validate(formData: FormData) {
    const e: Record<string, string> = {};
    const email = String(formData.get('email') || '').trim();
    const first = String(formData.get('firstName') || '').trim();
    const last = String(formData.get('lastName') || '').trim();
    const company = String(formData.get('company') || '').trim();
    const message = String(formData.get('message') || '').trim();

    if (!first) e.firstName = 'Please enter your first name.';
    if (!last) e.lastName = 'Please enter your last name.';
    if (!company) e.company = 'Please enter your company.';
    if (!email) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Please enter a valid email.';
    if (!message) e.message = 'Please add a brief message.';

    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError(null);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // honeypot
    if (String(formData.get('website') || '').length > 0) return;

    const v = validate(formData);
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const payload = {
      firstName: String(formData.get('firstName') || '').trim(),
      lastName: String(formData.get('lastName') || '').trim(),
      company: String(formData.get('company') || '').trim(),
      email: String(formData.get('email') || '').trim(),
      message: String(formData.get('message') || '').trim(),
      website: String(formData.get('website') || ''), // honeypot
    };

    setSubmitting(true);
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        if (res.status === 400 && data?.issues) {
          const mapped: Record<string, string> = {};
          for (const [k, arr] of Object.entries<Record<string, string[]>>(data.issues)) {
            if (Array.isArray(arr) && arr[0]) mapped[k] = arr[0];
          }
          setErrors(mapped);
        } else {
          setServerError(data?.error || 'Something went wrong. Please try again.');
        }
        return;
      }

      setSubmitted(true);
      formEl.reset();
    } catch {
      setServerError('Network error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative isolate">
      <div
        aria-hidden
        className="
    pointer-events-none fixed inset-0 -z-10
    bg-white
    bg-[radial-gradient(1800px_1000px_at_95%_-300px,rgba(139,92,246,0.36),transparent_72%),
        radial-gradient(1600px_900px_at_-280px_115%,rgba(37,99,235,0.28),transparent_74%),
        radial-gradient(1200px_700px_at_40%_-120px,rgba(16,185,129,0.18),transparent_68%),
        radial-gradient(900px_520px_at_110%_85%,rgba(124,58,237,0.22),transparent_70%)]
  "
      />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 pt-20 md:pt-28 pb-10 md:pb-14">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Book a demo
          </motion.h1>

          <motion.p {...mk(0.08)} className="mt-4 max-w-2xl text-muted-foreground text-lg">
            Fill in the form below — First name, Last name, Company, Email, and Message — and we’ll get back to you to arrange a convenient time.
          </motion.p>
        </div>
      </section>

      {/* FORM */}
      <section className="relative isolate overflow-hidden pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-4">
          <motion.div {...mk(0.06)} className="rounded-3xl border bg-white/80 backdrop-blur p-6 md:p-8 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center text-center gap-3 py-10" aria-live="polite">
                <span className="grid place-items-center size-14 rounded-2xl bg-emerald-100 text-emerald-700">
                  <CheckCircle2 className="size-8" />
                </span>
                <h2 className="text-2xl font-bold">Thank you! Your request was sent</h2>
                <p className="text-muted-foreground max-w-prose">
                  We’ll contact you at the provided email to schedule your demo.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                {/* honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                {serverError && (
                  <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                    {serverError}
                  </div>
                )}

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      autoComplete="given-name"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      required
                    />
                    {errors.firstName && <p id="firstName-error" className="text-sm text-red-600">{errors.firstName}</p>}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      autoComplete="family-name"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      required
                    />
                    {errors.lastName && <p id="lastName-error" className="text-sm text-red-600">{errors.lastName}</p>}
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      autoComplete="organization"
                      aria-invalid={!!errors.company}
                      aria-describedby={errors.company ? 'company-error' : undefined}
                      required
                    />
                    {errors.company && <p id="company-error" className="text-sm text-red-600">{errors.company}</p>}
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <p id="email-error" className="text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div className="grid gap-2 md:col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Briefly describe your goals and preferred demo dates"
                      className="min-h-[140px] resize-vertical"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      required
                    />
                    {errors.message && <p id="message-error" className="text-sm text-red-600">{errors.message}</p>}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button type="submit" className="rounded-full" disabled={submitting}>
                    {submitting ? 'Sending…' : 'Book a demo'}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    By submitting, you agree to our processing of your personal data.
                  </p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </main>
  );
}