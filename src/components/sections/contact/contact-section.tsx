import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 space-y-8">
      <SectionHeader
        eyebrow="Let’s build"
        title="Contact"
        subtitle="Tell me what you’re building — I’ll reply with clear next steps, timeline, and approach."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_.8fr] gap-4 items-start">
        {/* Form -> mailto (simple, no backend) */}
        <div className="glass rounded-3xl p-6 md:p-7">
          <form
            className="space-y-3"
            action="mailto:tka.huzaifa@gmail.com"
            method="post"
            encType="text/plain"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input name="name" placeholder="Your name" />
              <Input name="email" placeholder="Email" type="email" />
            </div>
            <Input
              name="subject"
              placeholder="Subject (e.g. SaaS dashboard, AI voice agent…)"
            />
            <Textarea name="message" placeholder="Message" />

            <div className="flex flex-wrap gap-2 pt-2">
              <Button className="rounded-xl" type="submit">
                Send
              </Button>
              <Button asChild variant="outline" className="rounded-xl">
                <a href="mailto:tka.huzaifa@gmail.com">Email directly</a>
              </Button>
            </div>
          </form>
        </div>

        {/* CTA card */}
        <div className="glass rounded-3xl p-6 md:p-7 space-y-3">
          <div className="text-lg font-semibold tracking-tight">
            Fast response, zero fluff
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            I can help with: system design + clean UI, multi-tenant SaaS,
            integrations, performance, and shipping production-ready features.
          </p>

          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Email:</span>{" "}
              <a
                className="underline underline-offset-4"
                href="mailto:tka.huzaifa@gmail.com"
              >
                tka.huzaifa@gmail.com
              </a>
            </div>
            <div>
              <span className="text-muted-foreground">Location:</span> Pakistan
              (Remote)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
