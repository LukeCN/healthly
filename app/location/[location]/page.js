import Link from "next/link";
import { notFound } from "next/navigation";
import { SITE, locations, specialties, getLocation } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return locations.map((l) => ({ location: l.slug }));
}

export function generateMetadata({ params }) {
  const l = getLocation(params.location);
  if (!l) return {};
  return {
    title: `Telehealth Doctors & Health Providers in ${l.name}, ${l.state}`,
    description: `Find psychiatrists, psychologists, GPs and allied health available to patients in ${l.name}, ${l.state} via telehealth on Healthly.`,
    alternates: { canonical: `/location/${l.slug}` },
  };
}

export default function LocationPage({ params }) {
  const l = getLocation(params.location);
  if (!l) notFound();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: `${l.name}, ${l.state}`, item: `${SITE.url}/location/${l.slug}` },
    ],
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / {l.name}
      </div>
      <div className="page-head">
        <h1>Health providers in {l.name}, {l.state}</h1>
        <p>
          Every kind of provider available to patients in {l.name} and across {l.state}
          {" "}via secure telehealth — no long waitlists, appointments within days.
        </p>
      </div>

      <section className="block" style={{ paddingTop: 24 }}>
        <h2 className="section-title">Choose a provider type</h2>
        <p className="section-sub">All available in {l.name} via telehealth.</p>
        <div className="grid grid-3">
          {specialties.map((s) => (
            <Link key={s.slug} href={`/${s.slug}/${l.slug}`} className="card">
              <h3>{s.plural}</h3>
              <p>{s.blurb.slice(0, 96)}…</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <h2 className="section-title">Other cities</h2>
        <div className="pill-row" style={{ justifyContent: "flex-start" }}>
          {locations.filter((x) => x.slug !== l.slug).map((x) => (
            <Link key={x.slug} href={`/location/${x.slug}`} className="pill">
              {x.name}, {x.state}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
