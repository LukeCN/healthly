import Link from "next/link";
import { SITE, conditionsByCategory } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Health Guides — Medically Reviewed Conditions",
  description:
    "Plain-English, medically-reviewed guides to common health conditions in Australia — mental health, women's and men's health and more.",
  alternates: { canonical: "/conditions" },
};

export default function ConditionsIndex() {
  const groups = conditionsByCategory();
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Health guides", item: `${SITE.url}/conditions` },
    ],
  };
  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Health guides
      </div>
      <div className="page-head">
        <h1>Health guides</h1>
        <p>Clear, medically-reviewed guides to common health conditions in Australia.</p>
      </div>
      <section className="block" style={{ paddingTop: 24 }}>
        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <h2 className="cat-title">{cat}</h2>
            <div className="grid grid-3">
              {list.map((c) => (
                <Link key={c.slug} href={`/conditions/${c.slug}`} className="card">
                  <h3>{c.name}</h3>
                  <p>{c.summary.slice(0, 110)}…</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
