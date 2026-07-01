import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE, specialties, locations, getSpecialty, providersBySpecialty,
} from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return specialties.map((s) => ({ specialty: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getSpecialty(params.specialty);
  if (!s) return {};
  return {
    title: `${s.plural} in Australia — Telehealth`,
    description: `Find ${s.plural.toLowerCase()} offering telehealth appointments across Australia. ${s.blurb}`,
    alternates: { canonical: `/${s.slug}` },
  };
}

export default function SpecialtyPage({ params }) {
  const s = getSpecialty(params.specialty);
  if (!s) notFound();
  const provs = providersBySpecialty(s.slug);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: s.plural, item: `${SITE.url}/${s.slug}` },
    ],
  };
  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${s.plural} in Australia`,
    url: `${SITE.url}/${s.slug}`,
    about: s.name,
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <JsonLd data={collection} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / {s.plural}
      </div>
      <div className="page-head">
        <h1>{s.plural} in Australia</h1>
        <p>{s.blurb} All providers below offer secure telehealth appointments Australia-wide.</p>
      </div>

      <section className="block" style={{ paddingTop: 24 }}>
        <h2 className="section-title">Available {s.plural.toLowerCase()}</h2>
        <p className="section-sub">Sample listings — verified providers coming soon.</p>
        <div className="grid grid-2">
          {provs.map((p) => (
            <Link key={p.slug} href={`/practitioner/${p.slug}`} className="card">
              <h3>
                {p.name}
                {p.sample && <span className="tag">Sample</span>}
              </h3>
              <span className="credential">{p.credential}</span>
              <p style={{ marginTop: 8 }}>{p.bio}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <h2 className="section-title">{s.plural} by city</h2>
        <div className="pill-row" style={{ justifyContent: "flex-start" }}>
          {locations.map((l) => (
            <Link key={l.slug} href={`/${s.slug}/${l.slug}`} className="pill">
              {s.plural} in {l.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
