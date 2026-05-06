import { Mail } from "lucide-react";
import { BrandIcon } from "@/components/ui/brand-icon";

export function Footer() {
  return (
    <footer className="relative z-10 py-8 border-t border-border bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-fg-muted font-sans">
            © {new Date().getFullYear()} Justene. Built with{" "}
            <a
              href="https://github.com/justeneselgas114-lab/claude-code-toolkit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover underline-offset-4 hover:underline transition-colors"
            >
              Claude Code
            </a>
            .
          </p>
          <div className="flex items-center gap-2">
            <FooterLink href="https://github.com/justeneselgas114-lab" label="GitHub">
              <BrandIcon name="github" size={18} alt="GitHub" />
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/in/justene-selgas-152052377/?skipRedirect=true" label="LinkedIn">
              <BrandIcon name="linkedin" size={18} alt="LinkedIn" />
            </FooterLink>
            <FooterLink href="https://www.facebook.com/Just10AiAutomation/" label="Facebook">
              <BrandIcon name="facebook" size={18} alt="Facebook" />
            </FooterLink>
            <FooterLink href="#" label="Instagram (coming soon)">
              <BrandIcon name="instagram" size={18} alt="Instagram" />
            </FooterLink>
            <FooterLink href="mailto:justene.dev@gmail.com" label="Email">
              <Mail size={18} className="text-fg-subtle" />
            </FooterLink>
            <FooterLink href="https://wa.me/639638296973" label="WhatsApp">
              <BrandIcon name="whatsapp" size={18} alt="WhatsApp" />
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
      className="p-2 rounded-lg hover:bg-bg-elevated transition-all"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
