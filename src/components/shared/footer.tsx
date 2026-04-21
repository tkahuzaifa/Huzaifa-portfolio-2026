import { Separator } from "@/components/ui/separator";
import { SocialChips } from "@/components/shared/social-chips";

export function Footer() {
  return (
    <footer className="mt-auto pt-6 pb-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-6 md:p-8">
          <Separator className="opacity-50" />

          <div className="mt-6 space-y-4">
            {/* Row 1: text + nav */}
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="text-sm text-muted-foreground max-w-2xl">
                © {new Date().getFullYear()} Muhammad Huzaifa
              </div>

              <div className="text-sm text-muted-foreground">
                Open to freelance and long-term opportunities.
              </div>
            </div>

            {/* Row 2: socials (right aligned) */}
            <div className="flex md:justify-end">
              <SocialChips
                compact
                variant="all"
                showTooltipValue
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
