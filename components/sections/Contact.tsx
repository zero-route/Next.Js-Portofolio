"use client";

import { Icon } from "@/components/ui/Icon";
import { socials } from "@/lib/data";
import { useRevealOnScroll } from "@/hooks/useRevealOnScroll";

export default function Contact() {
  const infoTitle = useRevealOnScroll<HTMLHeadingElement>();
  const infoDesc = useRevealOnScroll<HTMLParagraphElement>();
  const formWrap = useRevealOnScroll<HTMLDivElement>();

  return (
    <section id="contact" className="px-5 pb-0 pt-20">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-12 text-center">
          <h2 className="font-display text-[28px] text-white">
            Contact <span className="bg-gradient-text bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-[13px] text-text-secondary">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="flex flex-col gap-10 md:flex-row md:gap-16">
          <div className="md:flex-1">
            <h3
              ref={infoTitle.ref}
              className={`mb-3 font-display text-xl text-white transition-all duration-700 ${
                infoTitle.isVisible ? "translate-x-0 opacity-100" : "-translate-x-[60px] opacity-0"
              }`}
            >
              Let&apos;s work together
            </h3>
            <p
              ref={infoDesc.ref}
              className={`mb-6 text-[13px] leading-relaxed text-text-secondary transition-all delay-150 duration-700 ${
                infoDesc.isVisible ? "translate-x-0 opacity-100" : "-translate-x-[60px] opacity-0"
              }`}
            >
              I&apos;m always looking for exciting new projects. Whether you need a website, a web app, or
              just want to collaborate — feel free to reach out!
            </p>

            <ContactDetail icon="envelope" label="Email" value="iostream911@gmail.com" href="mailto:iostream911@gmail.com" />
            <ContactDetail
              icon="location"
              label="Location"
              value="Barru, Indonesia"
              href="https://maps.app.goo.gl/1rNGZ7gpT4d9EuPG7?g_st=ac"
            />

            <div className="my-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  aria-label={s.name}
                  className="flex h-8 w-8 items-center justify-center rounded-md border border-border-subtle text-text-secondary transition-colors hover:border-accent-cyan-light hover:text-accent-cyan-light"
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>

            <div className="rounded-[10px] border border-accent-cyan-light/20 bg-bg-secondary/50 p-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent-cyan-light/30 bg-black/50 px-3.5 py-1.5 font-mono text-[11px] text-accent-cyan-light">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
                Available for work
              </span>
              <p className="mt-2 text-xs text-text-secondary">
                Open to freelance projects, internships, or full-time opportunities.
              </p>
            </div>
          </div>

          <div
            ref={formWrap.ref}
            className={`transition-all duration-700 md:flex-1 ${
              formWrap.isVisible ? "translate-x-0 opacity-100" : "translate-x-[60px] opacity-0"
            }`}
          >
            <form
              action="https://formsubmit.co/iostream911@gmail.com"
              method="POST"
              className="flex flex-col gap-1.5 rounded-xl border border-accent-cyan-light/15 bg-bg-secondary/50 p-6"
            >
              <input type="hidden" name="_subject" value="Pesan Baru dari Portofolio Website!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value="https://zero-route.github.io/Web-test/#contact" />

              <FormField label="Your Name" name="name" placeholder="William" />
              <FormField label="Email Address" name="email" type="email" placeholder="hello@example.com" />
              <FormField label="Subject" name="subject" placeholder="Project inquiry..." />

              <label className="mt-3 font-mono text-[11px] text-accent-cyan-light">Message</label>
              <textarea
                name="message"
                required
                placeholder="Tell me about your project..."
                className="min-h-[100px] resize-y rounded-lg border border-border-subtle bg-black/60 px-3 py-2.5 text-[13px] text-white outline-none transition-colors focus:border-accent-cyan-light focus:shadow-[0_0_10px_rgba(56,189,248,0.2)]"
              />

              <button
                type="submit"
                className="mt-4.5 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-accent py-2.5 font-mono text-xs text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]"
              >
                Send Message <Icon name="send" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
}) {
  return (
    <>
      <label className="mt-3 font-mono text-[11px] text-accent-cyan-light">{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="rounded-lg border border-border-subtle bg-black/60 px-3 py-2.5 text-[13px] text-white outline-none transition-colors focus:border-accent-cyan-light focus:shadow-[0_0_10px_rgba(56,189,248,0.2)]"
      />
    </>
  );
}

function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div className="mb-4 flex items-center gap-3.5">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-accent-cyan-light/20 bg-accent-cyan-light/10">
        <Icon name={icon} className="text-accent-cyan-light" />
      </div>
      <div>
        <span className="block text-[11px] uppercase tracking-wide text-text-muted">{label}</span>
        <a href={href} target="_blank" className="text-[13px] font-semibold text-white transition-colors hover:text-accent-cyan-light">
          {value}
        </a>
      </div>
    </div>
  );
}
