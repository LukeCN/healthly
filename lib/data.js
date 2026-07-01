import snapshot from "./snapshot.json";

// Airtable is the source of truth. This snapshot is regenerated from it by
// scripts/sync.mjs (see lib/airtable.js). The app builds statically from the
// snapshot so it deploys with zero runtime dependencies.

export const SITE = {
  name: "Healthly",
  url: "https://healthly.au",
  tagline: "Find trusted Australian health providers",
  description:
    "Healthly helps Australians find trusted health providers and understand their health — psychiatrists, psychologists, GPs and allied health, plus clear, medically-reviewed guides and answers.",
};

export const specialties = snapshot.specialties;
export const locations = snapshot.locations;
export const conditions = snapshot.conditions;
export const questions = snapshot.questions;
export const providers = snapshot.providers;

export const getSpecialty = (slug) => specialties.find((s) => s.slug === slug);
export const getLocation = (slug) => locations.find((l) => l.slug === slug);
export const getCondition = (slug) => conditions.find((c) => c.slug === slug);
export const getQuestion = (slug) => questions.find((q) => q.slug === slug);
export const getProvider = (slug) => providers.find((p) => p.slug === slug);

export const providersBySpecialty = (slug) =>
  providers.filter((p) => p.specialty === slug);

// Telehealth providers serve every location in this launch dataset.
export const providersBySpecialtyLocation = (specialtySlug) =>
  providers.filter((p) => p.specialty === specialtySlug);

export const specialtiesByCategory = () => {
  const groups = {};
  for (const s of specialties) {
    (groups[s.category] = groups[s.category] || []).push(s);
  }
  return groups;
};

export const questionsByTag = (tag) =>
  questions.filter((q) => (q.tags || []).includes(tag));

export const conditionsForSpecialty = (slug) =>
  conditions.filter((c) => (c.relatedSpecialties || []).includes(slug));

export const conditionsByCategory = () => {
  const groups = {};
  for (const c of conditions) {
    (groups[c.category] = groups[c.category] || []).push(c);
  }
  return groups;
};
