import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { TrustBanner } from "@/components/sections/TrustBanner";
import { Stories } from "@/components/sections/Stories";
import { Features } from "@/components/sections/Features";
import { Certifications } from "@/components/sections/Certifications";
import { Process } from "@/components/sections/Process";
import { PostRegistration } from "@/components/sections/PostRegistration";
import { Comparison } from "@/components/sections/Comparison";
import { Management } from "@/components/sections/Management";
import { PartnerBenefits } from "@/components/sections/PartnerBenefits";
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
        <TrustBanner />
        <Stories />
        <Features />
        <Certifications />
        <Process />
        <PostRegistration />
        <Comparison />
        <Management />
        <PartnerBenefits />
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
