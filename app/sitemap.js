import {
  SITE, specialties, locations, conditions, questions, providers,
} from "@/lib/data";

export default function sitemap() {
  const now = new Date();
  const urls = [
    { url: SITE.url, lastModified: now, priority: 1 },
    { url: `${SITE.url}/conditions`, lastModified: now, priority: 0.8 },
    { url: `${SITE.url}/questions`, lastModified: now, priority: 0.8 },
  ];
  for (const s of specialties) {
    urls.push({ url: `${SITE.url}/${s.slug}`, lastModified: now, priority: 0.8 });
    for (const l of locations)
      urls.push({ url: `${SITE.url}/${s.slug}/${l.slug}`, lastModified: now, priority: 0.7 });
  }
  for (const l of locations)
    urls.push({ url: `${SITE.url}/location/${l.slug}`, lastModified: now, priority: 0.6 });
  for (const c of conditions)
    urls.push({ url: `${SITE.url}/conditions/${c.slug}`, lastModified: now, priority: 0.6 });
  for (const q of questions)
    urls.push({ url: `${SITE.url}/questions/${q.slug}`, lastModified: now, priority: 0.5 });
  for (const p of providers)
    urls.push({ url: `${SITE.url}/practitioner/${p.slug}`, lastModified: now, priority: 0.4 });
  return urls;
}
