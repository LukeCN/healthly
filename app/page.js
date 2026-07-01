import Link from "next/link";
import { SITE, specialties, locations, conditions } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
  };
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: SITE.name,
    url: SITE.url,
    areaServed: "AU",
  };
  return (
    <>
      <JsonLd data={websiteSchema} />
      <JsonLd data={orgSchema} />
      <section className="hero">
        <div className="container">
          <h1>Find trusted health providers in Australia</h1>
          <p>
            Healthly connects you with psychiatrists, psychologists and GPs —
            and clear, medically-reviewed health information. Starting with
            mental health and telehealth care.
          </p>
          <div className="pill-row">
            {specialties.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="pill">
                {s.plural}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <h2 className="section-title">Browse by provider</h2>
          <p className="section-sub">Telehealth appointments available Australia-wide.</p>
          <div className="grid grid-3">
            {specialties.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="card">
                <h3>{s.plural}</h3>
                <p>{s.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Find care in your city</h2>
          <p className="section-sub">Popular locations across Australia.</p>
          <div className="pill-row" style={{ justifyContent: "flex-start" }}>
            {locations.map((l) => (
              <Link key={l.slug} href={`/psychiatrist/${l.slug}`} className="pill">
                {l.name}, {l.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Understand your health</h2>
          <p className="section-sub">Plain-English, medically-reviewed guides.</p>
          <div className="grid grid-3">
            {conditions.map((c) => (
              <Link key={c.slug} href={`/conditions/${c.slug}`} className="card">
                <h3>{c.name}</h3>
                <p>{c.summary.slice(0, 110)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
