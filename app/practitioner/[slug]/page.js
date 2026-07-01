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
    title: `${p.name} — ${s.name} (Telehealth)`,
    description: `${p.name}, ${p.credential}. ${p.bio}`,
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
  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: p.name,
    medicalSpecialty: s.name,
    url: `${SITE.url}/practitioner/${p.slug}`,
    areaServed: "AU",
    description: p.bio,
    availableService: { "@type": "MedicalProcedure", name: "Telehealth consultation" },
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <JsonLd data={physician} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <Link href={`/${s.slug}`}>{s.plural}</Link> / {p.name}
      </div>
      <div className="page-head">
        <h1>{p.name}{p.sample && <span className="tag">Sample listing</span>}</h1>
        <p><span className="credential">{p.credential}</span> · {s.name} · Telehealth Australia-wide</p>
      </div>
      <section className="block prose" style={{ paddingTop: 16, maxWidth: 720 }}>
        <p>{p.bio}</p>
        {p.sample && (
          <p style={{ color: "#5b716b", fontSize: 15 }}>
            This is a sample listing shown during launch. Verified provider
            profiles — with credentials confirmed against the AHPRA register —
            are being added.
          </p>
        )}
        <div className="cta">
          <h2>Book with a {s.name.toLowerCase()}</h2>
          <p>See {s.plural.toLowerCase()} available via telehealth across Australia.</p>
          <Link href={`/${s.slug}`} className="btn">Browse {s.plural.toLowerCase()}</Link>
        </div>
      </section>
    </div>
  );
}
