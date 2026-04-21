import { Mail, Phone, MapPin, Linkedin, Github, Briefcase } from "lucide-react";

export type SocialLink = {
  id: number;
  title: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const primarySocials: SocialLink[] = [
  {
    id: 5000,
    title: "Email",
    value: "tka.huzaifa@gmail.com",
    href: "mailto:tka.huzaifa@gmail.com",
    icon: Mail,
  },
  {
    id: 5003,
    title: "LinkedIn",
    value: "muhammad-huzaifa-3740a917b",
    href: "https://www.linkedin.com/in/muhammad-huzaifa-3740a917b",
    icon: Linkedin,
  },
];

// Full list (footer/contact)
export const allSocials: SocialLink[] = [
  ...primarySocials,
  {
    id: 5001,
    title: "WhatsApp",
    value: "+92 300 5547963",
    href: "https://wa.me/923005547963",
    icon: Phone,
  },
  {
    id: 5005,
    title: "Upwork",
    value: "View profile",
    href: "https://www.upwork.com/freelancers/~0170e3ff717e5b9904?mp_source=share",
    icon: Briefcase,
  },
  {
    id: 5002,
    title: "Location",
    value: "Pakistan (PKT)",
    href: "#",
    icon: MapPin,
  },
];
