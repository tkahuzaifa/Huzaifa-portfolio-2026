export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
};

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "demo-1",
    name: "Sara Khan",
    role: "Ecommerce Manager",
    quote:
      "Fast Shopify delivery with clean UI, better speed scores, and a smooth launch.",
  },
  {
    id: "demo-2",
    name: "Bilal Ahmed",
    role: "Founder, DTC Brand",
    quote:
      "Clear communication, smart CRO improvements, and a theme that finally converts.",
  },
  {
    id: "demo-3",
    name: "Ayesha Malik",
    role: "Product Lead",
    quote:
      "Handled migration and custom sections quickly. The store looks premium now.",
  },
];
