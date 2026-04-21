"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, ExternalLink } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
// import { Github } from "lucide-react";
import { ProfileSwitcher } from "./profile-switcher";
import {
  PROFILE_QUERY_KEY,
  getProfileOption,
  normalizeProfile,
} from "@/lib/profile";

const HOME_NAV_FINANCE = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "Experience", href: "#experience", type: "hash" as const },
  { label: "Skills", href: "#skills", type: "hash" as const },
  // { label: "Certificates", href: "#certificates", type: "hash" as const },
  { label: "Contact", href: "#contact", type: "hash" as const },
];

const HOME_NAV_WEB = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "Projects", href: "#projects", type: "hash" as const },
  { label: "Experience", href: "#experience", type: "hash" as const },
  { label: "Testimonials", href: "#testimonials", type: "hash" as const },
  { label: "Skills", href: "#skills", type: "hash" as const },
  { label: "Contact", href: "#contact", type: "hash" as const },
];

const INNER_NAV = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "All projects", href: "/projects", type: "route" as const },
];

const PSEB_URL =
  "https://portal.techdestination.com/verify-certificate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpc3RyYXRpb25ObyI6IkZMMjEvUFNFQi8yMDI1LzIyMjkyIiwidHlwZSI6ImZyZWVsYW5jZXIiLCJpYXQiOjE3NjcwODAwNzIsImV4cCI6MTc3NDg1NjA3Mn0.8poPngm4g1fKYxFxxRFe_nZYfAbK2b_4NVoyJCNVje0";
// const GITHUB_REPO_URL = "https://github.com/usama86/usama-portfolio-v2";

type Props = {
  onNavigate?: () => void;
};

export function MobileNav({ onNavigate }: Props) {
  const [open, setOpen] = React.useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHome = pathname === "/";
  const profile = normalizeProfile(searchParams.get(PROFILE_QUERY_KEY));
  const baseNav = isHome
    ? profile === "web"
      ? HOME_NAV_WEB
      : HOME_NAV_FINANCE
    : INNER_NAV;
  const nav =
    !isHome && profile === "finance"
      ? baseNav.filter((item) => item.href !== "/projects")
      : baseNav;
  const profileOption = getProfileOption(profile);
  const profileQuery = profile ? `?${PROFILE_QUERY_KEY}=${profile}` : "";
  const subtitle =
    profileOption?.tagline ?? "Senior Finance & Accounts Professional";

  function withProfile(href: string, includeProfile = true) {
    if (!includeProfile) return href;
    return profile ? `${href}${profileQuery}` : href;
  }

  function handleNavClick(href: string, type: (typeof nav)[number]["type"]) {
    setOpen(false);

    if (type === "route") {
      router.push(withProfile(href, href !== "/"));
      onNavigate?.();
      return;
    }

    // Wait a tick so Sheet closes before scroll
    setTimeout(() => {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      onNavigate?.();
    }, 50);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[320px] sm:w-[360px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            Muhammad Huzaifa
            {/* <div className="text-xs text-muted-foreground font-normal mt-1">
              {subtitle}
            </div> */}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          {nav.map((i) => (
            <button
              key={i.href}
              type="button"
              onClick={() => handleNavClick(i.href, i.type)}
              className="w-full text-left rounded-xl px-3 py-2 text-sm hover:bg-muted transition-colors"
            >
              {i.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Profile
          </div>
          <ProfileSwitcher
            compact
            stretch
            className="w-full"
            onChange={() => setOpen(false)}
          />
        </div>

        <Separator className="my-6" />

        <div className="space-y-2">
          <Button asChild variant="outline" className="w-full rounded-xl">
            <a href="mailto:tka.huzaifa@gmail.com">Email</a>
          </Button>
          {/* <Button asChild variant="outline" className="w-full rounded-xl">
            <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
              <span className="inline-flex items-center gap-2">
                <Github className="h-4 w-4" />
                View source (GitHub)
              </span>
            </a>
          </Button> */}

          <Button asChild variant="outline" className="w-full rounded-xl">
            <Link href={withProfile("/projects")}>All projects</Link>
          </Button>
        </div>

        <a
          href={PSEB_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <span>PSEB Registered Freelancer • 2025–2026</span>
          <ExternalLink className="h-3.5 w-3.5 opacity-70" />
        </a>
      </SheetContent>
    </Sheet>
  );
}
