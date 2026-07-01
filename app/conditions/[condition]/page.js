import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, conditions, getCondition, getSpecialty } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return conditions.map((c) => ({ condition: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCondition(params.condition);
  if (!c) return {};
  return {
    title: `${c.name} — Symptoms, Assessment & Treatment in Australia`,
    description: c.summary.slice(0, 155),
    alternates: { canonical: `/conditions/${c.slug}` },
  };
}

export default function ConditionPage({ params }) {
  const c = getCondition(params.condition);
  if (!c) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Health info", item: `${SITE.url}/conditions/${c.slug}` },
      { "@type": "ListItem", position: 3, name: c.name, item: `${SITE.url}/conditions/${c.slug}` },
    ],
  };
  const medPage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${c.name} — Symptoms, Assessment & Treatment`,
    url: `${SITE.url}/conditions/${c.slug}`,
    description: c.summary,
    lastReviewed: "2026-07-01",
    reviewedBy: { "@type": "Person", name: c.reviewer },
    about: { "@type": "MedicalCondition", name: c.name },
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <JsonLd data={medPage} />
      <JsonLd data={faqPage} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Health info / {c.name}
      </div>
      <div className="page-head">
        <h1>{c.name}</h1>
        <p>{c.summary}</p>
        <span className="reviewer">Medically reviewed by {c.reviewer}</span>
      </div>

      <section className="block prose" style={{ paddingTop: 24, maxWidth: 760 }}>
        {c.sections.map((sec, i) => (
          <div key={i}>
            <h2>{sec.h}</h2>
            <p>{sec.body}</p>
          </div>
        ))}

        <div className="faq">
          <h2>Frequently asked questions</h2>
          {c.faqs.map((f, i) => (
            <div key={i}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>

        <div className="cta">
          <h2>Speak with a provider about {c.name.toLowerCase()}</h2>
          <p>Connect with trusted Australian providers offering telehealth appointments.</p>
          {c.relatedSpecialties.map((sp) => {
            const s = getSpecialty(sp);
            return (
              <Link key={sp} href={`/${sp}`} className="btn" style={{ margin: "0 6px" }}>
                Find {s.plural.toLowerCase()}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
