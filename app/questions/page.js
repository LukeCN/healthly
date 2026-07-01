import Link from "next/link";
import { SITE, questions } from "@/lib/data";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "Health Questions Answered by Australian Doctors",
  description:
    "Straight answers to common health questions about telehealth, mental health, prescriptions, referrals and more — reviewed by Australian doctors.",
  alternates: { canonical: "/questions" },
};

export default function QuestionsIndex() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Q&A", item: `${SITE.url}/questions` },
    ],
  };
  return (
    <div className="container">
      <JsonLd data={breadcrumb} />
      <div className="breadcrumb">
        <Link href="/">Home</Link> / Q&amp;A
      </div>
      <div className="page-head">
        <h1>Your health questions, answered</h1>
        <p>Straight, plain-English answers to common questions about care in Australia.</p>
      </div>
      <section className="block" style={{ paddingTop: 24 }}>
        <div className="qa-list">
          {questions.map((q) => (
            <Link key={q.slug} href={`/questions/${q.slug}`} className="qa-item">
              {q.question}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
