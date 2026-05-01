import { Mail } from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact/contact-form";
import { BookCallButton } from "@/components/contact/book-call-button";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-12">
          <p className="font-mono text-xs text-accent mb-3">
            // 05 — contact()
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-fg font-medium mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="font-sans text-base text-fg-muted max-w-xl mx-auto">
            Tell me where your business is leaking time or leads. I&apos;ll reply within 24h with how I&apos;d solve it.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.1} className="space-y-8">
            <div>
              <h3 className="font-serif text-2xl text-fg font-medium mb-3">
                Prefer to talk live?
              </h3>
              <p className="font-sans text-base text-fg-muted mb-5">
                Book a 30-minute discovery call. No pressure, no pitch — just a chat about your project.
              </p>
              <BookCallButton />
            </div>

            <div className="flex items-center gap-2 text-fg-subtle">
              <span className="h-px flex-1 bg-border" />
              <span className="font-sans text-xs uppercase tracking-[0.2em]">or</span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-fg-subtle font-medium mb-3">
                Direct contact
              </p>
              <ul className="space-y-3">
                <ContactRow href="mailto:justene.dev@gmail.com" icon={<Mail size={16} />}>
                  justene.dev@gmail.com
                </ContactRow>
                <ContactRow href="https://wa.me/639638296973" icon={<FaWhatsapp size={16} />}>
                  09638296973 (WhatsApp)
                </ContactRow>
                <ContactRow
                  href="https://www.facebook.com/Just10AiAutomation/"
                  icon={<FaFacebookF size={16} />}
                >
                  Facebook
                </ContactRow>
                <ContactRow
                  href="https://www.linkedin.com/in/justene-selgas-152052377/?skipRedirect=true"
                  icon={<FaLinkedinIn size={16} />}
                >
                  LinkedIn
                </ContactRow>
                <ContactRow href="#" icon={<FaInstagram size={16} />}>
                  Instagram (coming soon)
                </ContactRow>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <li>
      <a
        href={href}
        className="inline-flex items-center gap-3 font-sans text-base text-fg hover:text-accent transition-colors"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="text-accent">{icon}</span>
        {children}
      </a>
    </li>
  );
}
