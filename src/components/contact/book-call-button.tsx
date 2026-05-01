"use client";

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

export function BookCallButton() {
  function open() {
    const url = "https://calendly.com/justeneselgas2004/30min";
    if (window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url });
      return;
    }
    // First click — load script then open
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => {
      window.Calendly?.initPopupWidget({ url });
    };
    document.body.appendChild(script);
  }

  return (
    <Button onClick={open} size="lg" className="w-full">
      <Calendar size={16} />
      Book a Call
    </Button>
  );
}
