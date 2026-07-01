import Link from "next/link";
import { notFound } from "next/navigation";
import {
  SITE, questions, getQuestion, getSpecialty, getCondition,
} from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return questions.map((q) => ({ slug: q.slug }));
}

export function generateMetadata({ params }) {
  const q = getQuestion(params.slug);
  if (!q) return {};
  return {
    title: q.question,
    description: q.answer.slice(0, 155),
    alternates: { canonical: `/questions/${q.slug}` },
  };
}

export default function QuestionPage({ params }) {
  const q = getQuestion(params.slug);
  if (!q) notFound();

  const links = (q.tags || [])
    .map((t) => {
      const s = getSpecialty(t);
      if (s) return { href: `/${s.slug}`, label: `Find ${s.plural.toLowerCase()}` };
      const c = getCondition(t);
      if (c) return { href: `/conditions/${c.slug}`, label: `${c.name} guide` };
      return null;
    })
    .filter(Boolean);

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Q&A", item: `${SITE.url}/questions` },
      { "@type": "ListItem", position: 3, name: q.question, item: `${SITE.url}/questions/${q.slug}` },
    ],
  };
  const qaPage = {
    "@context": "https://schema.org",
    "@type": "QAPage",
    mainEntity: {
      "@type": "Question",
      name: q.question,
      answerCount: 1,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
        author: { "@type": "Organization", name: q.answeredBy },
      },
    },
  };

  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <JsonLd data={qaPage} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / <Link href="/questions">Q&amp;A</Link> / {q.question}
      </div>
      <div className="page-head">
        <h1>{q.question}</h1>
      </div>
      <section className="block" style={{ paddingTop: 8, maxWidth: 720 }}>
        <p className="answer">{q.answer}</p>
        <p className="meta">Answered by {q.answeredBy}</p>

        {links.length > 0 && (
          <div className="chip-row">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="chip">{l.label}</Link>
            ))}
          </div>
        )}

        <div className="cta" style={{ marginTop: 32 }}>
          <h2>See a doctor about this</h2>
          <p>Connect with trusted Australian telehealth providers.</p>
          <Link href="/online-gp" className="btn">Find an online GP</Link>
        </div>
      </section>
    </div>
  );
}
