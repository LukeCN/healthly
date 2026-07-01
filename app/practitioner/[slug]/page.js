import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, providers, getProvider, getSpecialty } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProvider(params.slug);
  if (!p) return {};
  const s = getSpecialty(p.specialty);
  return {
    title: `${p.name} — ${s.name} Telehealth Australia`,
    description: `${p.name}: ${p.bio}`,
    alternates: { canonical: `/practitioner/${p.slug}` },
  };
}

export default function PractitionerPage({ params }) {
  const p = getProvider(params.slug);
  if (!p) notFound();
  const s = getSpecialty(p.specialty);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: s.plural, item: `${SITE.url}/${s.slug}` },
      { "@type": "ListItem", position: 3, name: p.name, item: `${SITE.url}/practitioner/${p.slug}` },
    ],
  };
  const org = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: p.name,
    medicalSpecialty: s.name,
    url: p.website || `${SITE.url}/practitioner/${p.slug}`,
    areaServed: "AU",
    description: p.bio,
    availableService: { "@type": "MedicalProcedure", name: "Telehealth consultation" },
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <JsonLd data={org} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <Link href={`/${s.slug}`}>{s.plural}</Link> / {p.name}
      </div>
      <div className="page-head">
        <h1>{p.name}</h1>
        <p><span className="credential">{p.credential}</span> · {s.name} · Telehealth Australia-wide</p>
      </div>
      <section className="block prose" style={{ paddingTop: 16, maxWidth: 720 }}>
        <p>{p.bio}</p>
        {p.website && (
          <p style={{ marginTop: 20 }}>
            <a href={p.website} target="_blank" rel="noopener noreferrer nofollow" className="btn" style={{ background: "#1f9d78", color: "#fff" }}>
              Visit website →
            </a>
          </p>
        )}
        <p className="meta">
          Listing information is compiled from public sources. Confirm current
          services, fees and availability directly with the provider. Healthly
          is a directory and does not endorse or verify individual providers.
        </p>
        <div className="cta">
          <h2>More {s.plural.toLowerCase()}</h2>
          <p>Browse other {s.plural.toLowerCase()} available via telehealth across Australia.</p>
          <Link href={`/${s.slug}`} className="btn">Browse {s.plural.toLowerCase()}</Link>
        </div>
      </section>
    </div>
  );
}
