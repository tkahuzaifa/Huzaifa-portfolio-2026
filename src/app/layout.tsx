import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Muhammad Huzaifa | Finance & Shopify",
  description:
    "Finance operations and ERP specialist plus Shopify expert. Billing, AR/AP, project finance, and high-converting ecommerce builds.",
  openGraph: {
    title: "Muhammad Huzaifa | Finance & Shopify",
    description:
      "Finance operations, ERP workflows, and Shopify Plus development for scaling brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-grid flex flex-col">
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-6 lg:px-8 pt-2 pb-10 md:pt-3">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
