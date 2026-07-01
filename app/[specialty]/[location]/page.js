import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE, specialties, locations, getSpecialty, getLocation,
  providersBySpecialtyLocation,
} from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  const params = [];
  for (const s of specialties)
    for (const l of locations)
      params.push({ specialty: s.slug, location: l.slug });
  return params;
}

export function generateMetadata({ params }) {
  const s = getSpecialty(params.specialty);
  const l = getLocation(params.location);
  if (!s || !l) return {};
  return {
    title: `${s.plural} in ${l.name}, ${l.state} — Telehealth`,
    description: `Find ${s.plural.toLowerCase()} available to patients in ${l.name}, ${l.state} via telehealth. Book an appointment with a trusted provider on Healthly.`,
    alternates: { canonical: `/${s.slug}/${l.slug}` },
  };
}

export default function SpecialtyLocationPage({ params }) {
  const s = getSpecialty(params.specialty);
  const l = getLocation(params.location);
  if (!s || !l) notFound();
  const provs = providersBySpecialtyLocation(s.slug, l.slug);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: s.plural, item: `${SITE.url}/${s.slug}` },
      { "@type": "ListItem", position: 3, name: `${l.name}, ${l.state}`, item: `${SITE.url}/${s.slug}/${l.slug}` },
    ],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${s.plural} in ${l.name}, ${l.state}`,
    itemListElement: provs.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Physician",
        name: p.name,
        medicalSpecialty: s.name,
        url: `${SITE.url}/practitioner/${p.slug}`,
        areaServed: `${l.name}, ${l.state}`,
        availableService: { "@type": "MedicalProcedure", name: "Telehealth consultation" },
      },
    })),
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <JsonLd data={itemList} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <Link href={`/${s.slug}`}>{s.plural}</Link> / {l.name}
      </div>
      <div className="page-head">
        <h1>{s.plural} in {l.name}, {l.state}</h1>
        <p>
          {s.plural} available to patients in {l.name} and across {l.state} via
          secure telehealth. No long waitlists — most providers offer
          appointments within days.
        </p>
      </div>

      <section className="block" style={{ paddingTop: 24 }}>
        <h2 className="section-title">{provs.length} {s.plural.toLowerCase()} serving {l.name}</h2>
        <p className="section-sub">Telehealth clinics serving patients in this area.</p>
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
        <h2 className="section-title">Other cities</h2>
        <div className="pill-row" style={{ justifyContent: "flex-start" }}>
          {locations.filter((x) => x.slug !== l.slug).map((x) => (
            <Link key={x.slug} href={`/${s.slug}/${x.slug}`} className="pill">
              {s.plural} in {x.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
