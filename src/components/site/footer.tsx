import { Mail } from "lucide-react";
import { FaLinkedinIn, FaFacebookF, FaWhatsapp } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fg-muted font-sans">
            © {new Date().getFullYear()} Justene. Built with Claude Code.
          </p>
          <div className="flex items-center gap-2">
            <FooterLink href="https://www.linkedin.com/in/justene-selgas-152052377/" label="LinkedIn">
              <FaLinkedinIn size={16} />
            </FooterLink>
            <FooterLink href="https://www.facebook.com/Just10AiAutomation/" label="Facebook">
              <FaFacebookF size={16} />
            </FooterLink>
            <FooterLink href="mailto:theconceptlogin@gmail.com" label="Email">
              <Mail size={16} />
            </FooterLink>
            <FooterLink href="https://wa.me/639638296973" label="WhatsApp">
              <FaWhatsapp size={16} />
            </FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      className="p-2 rounded-lg text-fg-subtle hover:text-accent hover:bg-bg-elevated transition-all"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
