"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { usePathname, useSearchParams } from "next/navigation";
// import { Github } from "lucide-react";
import { ProfileSwitcher } from "./profile-switcher";
import { cn } from "@/lib/utils";
import {
  PROFILE_QUERY_KEY,
  getProfileOption,
  normalizeProfile,
} from "@/lib/profile";

// const GITHUB_REPO_URL = "https://github.com/usama86/usama-portfolio-v2";

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
  { label: "Testimonials", href: "#testimonials", type: "hash" as const },
  { label: "Skills", href: "#skills", type: "hash" as const },
  { label: "Contact", href: "#contact", type: "hash" as const },
];

const INNER_NAV = [
  { label: "Home", href: "/", type: "route" as const },
  { label: "All projects", href: "/projects", type: "route" as const },
];

export function Navbar() {
  const pathname = usePathname();
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
  const isProfileSelection = isHome && !profile;
  const showNav = !isProfileSelection;
  const showResume = profile === "finance";
  const profileOption = getProfileOption(profile);
  const profileQuery = profile ? `?${PROFILE_QUERY_KEY}=${profile}` : "";
  const tagline =
    profileOption?.tagline ?? "Senior Finance & Accounts Professional";

  function withProfile(href: string, includeProfile = true) {
    if (!includeProfile) return href;
    return profile ? `${href}${profileQuery}` : href;
  }

  return (
    <header className="sticky top-0 z-50">
      <div
        className={cn(
          "glass border-b border-border/60 shadow-sm",
          isProfileSelection &&
            "bg-gradient-to-r from-background/70 via-background/60 to-muted/40"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href={withProfile("/", false)} className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-primary/20 grid place-items-center">
              <span className="text-sm font-semibold">MH</span>
            </div>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">
                Muhammad Huzaifa
              </div>
              {/* <div className="text-xs text-muted-foreground">{tagline}</div> */}
            </div>
          </Link>

          {/* Desktop nav */}
          {showNav && (
            <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
              {nav.map((i) =>
                i.type === "route" ? (
                  <Link
                    key={i.href}
                    href={withProfile(i.href, i.href !== "/")}
                    className="hover:text-foreground transition-colors"
                  >
                    {i.label}
                  </Link>
                ) : (
                  <a
                    key={i.href}
                    href={i.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {i.label}
                  </a>
                )
              )}
          </nav>
          )}

          <div className="flex items-center gap-2">
            {showNav && <ProfileSwitcher iconOnly className="md:hidden" />}
            {showNav && <ProfileSwitcher className="hidden md:flex" />}
            <ThemeToggle />

            <Button
              asChild
              variant="outline"
              size="icon"
              className="rounded-xl hidden md:inline-flex"
              aria-label="View source on GitHub"
            >
              {/* <a href={GITHUB_REPO_URL} target="_blank" rel="noreferrer">
                <Github className="h-5 w-5" />
              </a> */}
            </Button>

            {/* Desktop resume (finance only) */}
            {showResume && (
              <Button asChild className="rounded-xl hidden md:inline-flex">
                <a href={withProfile("/resume")} target="_blank" rel="noreferrer">
                  Resume
                </a>
              </Button>
            )}

            {/* Mobile menu */}
            {showNav && <MobileNav />}
          </div>
        </div>
      </div>
    </header>
  );
}
