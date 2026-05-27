import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Process } from "@/components/sections/Process";
import { PostRegistration } from "@/components/sections/PostRegistration";
import { Comparison } from "@/components/sections/Comparison";
import { Management } from "@/components/sections/Management";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { FAQ } from "@/components/sections/FAQ";
import { siteConfig } from "@/lib/site";

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.nameEn,
  url: siteConfig.url,
  description: siteConfig.description,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: `+82-${siteConfig.customerCenter.replace(/-/g, "")}`,
    contactType: "customer service",
    areaServed: "KR",
    availableLanguage: ["Korean"],
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Features />
        <Process />
        <PostRegistration />
        <Comparison />
        <Management />
        <BlogPreview />
        <FAQ />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </>
  );
}
