import Link from "next/link";
import {
  SITE, specialties, locations, conditions, questions,
  specialtiesByCategory,
} from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const groups = specialtiesByCategory();
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
            Connect with psychiatrists, psychologists, GPs and allied health via
            telehealth — plus clear, medically-reviewed guides and answers to
            your health questions.
          </p>
          <div className="pill-row">
            <Link href="/psychiatrist" className="pill">Psychiatrists</Link>
            <Link href="/online-gp" className="pill">Online GP</Link>
            <Link href="/adhd-gp" className="pill">ADHD assessment</Link>
            <Link href="/conditions" className="pill">Health guides</Link>
            <Link href="/questions" className="pill">Q&amp;A</Link>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <h2 className="section-title">Browse by provider</h2>
          <p className="section-sub">Telehealth appointments available Australia-wide.</p>
          {Object.entries(groups).map(([cat, list]) => (
            <div key={cat} style={{ marginBottom: 28 }}>
              <h3 className="cat-title">{cat}</h3>
              <div className="grid grid-3">
                {list.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}`} className="card">
                    <h3>{s.plural}</h3>
                    <p>{s.blurb}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">Find care in your city</h2>
          <p className="section-sub">Every provider available to your location, across Australia.</p>
          <div className="pill-row" style={{ justifyContent: "flex-start" }}>
            {locations.map((l) => (
              <Link key={l.slug} href={`/location/${l.slug}`} className="pill">
                {l.name}, {l.state}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row-head">
            <h2 className="section-title">Understand your health</h2>
            <Link href="/conditions" className="see-all">All guides →</Link>
          </div>
          <p className="section-sub">Plain-English, medically-reviewed condition guides.</p>
          <div className="grid grid-3">
            {conditions.slice(0, 6).map((c) => (
              <Link key={c.slug} href={`/conditions/${c.slug}`} className="card">
                <h3>{c.name}</h3>
                <p>{c.summary.slice(0, 110)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row-head">
            <h2 className="section-title">Answers from Australian doctors</h2>
            <Link href="/questions" className="see-all">All questions →</Link>
          </div>
          <p className="section-sub">Common health questions, answered plainly.</p>
          <div className="qa-list">
            {questions.slice(0, 6).map((q) => (
              <Link key={q.slug} href={`/questions/${q.slug}`} className="qa-item">
                {q.question}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
