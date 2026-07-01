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
export const SITE = {
  name: "Healthly",
  url: "https://healthly.au",
  tagline: "Find trusted Australian health providers",
  description:
    "Healthly helps Australians find and connect with trusted health providers and understand their health — starting with mental health and telehealth care.",
};

export const specialties = [
  {
    slug: "psychiatrist",
    name: "Psychiatrist",
    plural: "Psychiatrists",
    blurb:
      "Medical doctors specialising in the diagnosis, treatment and prescribing for mental health conditions.",
  },
  {
    slug: "psychologist",
    name: "Psychologist",
    plural: "Psychologists",
    blurb:
      "Registered practitioners providing assessment and evidence-based talking therapies for mental health and wellbeing.",
  },
  {
    slug: "adhd-gp",
    name: "ADHD GP",
    plural: "ADHD GPs",
    blurb:
      "GPs with a special interest in assessing, diagnosing and managing adult ADHD, including prescribing where appropriate.",
  },
];

export const locations = [
  { slug: "sydney", name: "Sydney", state: "NSW" },
  { slug: "melbourne", name: "Melbourne", state: "VIC" },
  { slug: "brisbane", name: "Brisbane", state: "QLD" },
  { slug: "perth", name: "Perth", state: "WA" },
  { slug: "adelaide", name: "Adelaide", state: "SA" },
  { slug: "gold-coast", name: "Gold Coast", state: "QLD" },
];

// Sample listings for the launch skeleton. Marked sample:true so we never
// present unverified credentials as real. Verified providers replace these.
export const providers = [
  {
    slug: "dr-alex-morgan",
    name: "Dr Alex Morgan",
    credential: "MBBS, FRANZCP",
    specialty: "psychiatrist",
    telehealth: true,
    bio: "Consultant psychiatrist with a focus on adult ADHD, anxiety and mood disorders. Offers telehealth consultations Australia-wide.",
    sample: true,
  },
  {
    slug: "dr-priya-nair",
    name: "Dr Priya Nair",
    credential: "MBBS, FRANZCP",
    specialty: "psychiatrist",
    telehealth: true,
    bio: "Psychiatrist experienced in complex mood and anxiety presentations, with a warm, collaborative approach to care.",
    sample: true,
  },
  {
    slug: "sam-taylor",
    name: "Sam Taylor",
    credential: "MPsych (Clinical), MAPS",
    specialty: "psychologist",
    telehealth: true,
    bio: "Clinical psychologist providing CBT and ACT for anxiety, depression and burnout via secure telehealth.",
    sample: true,
  },
  {
    slug: "jordan-lee",
    name: "Jordan Lee",
    credential: "MPsych (Clinical), MAPS",
    specialty: "psychologist",
    telehealth: true,
    bio: "Clinical psychologist supporting adults with ADHD, stress and life transitions.",
    sample: true,
  },
  {
    slug: "dr-casey-ryan",
    name: "Dr Casey Ryan",
    credential: "MBBS, FRACGP",
    specialty: "adhd-gp",
    telehealth: true,
    bio: "GP with a special interest in adult ADHD assessment and management. Telehealth appointments, no referral needed.",
    sample: true,
  },
  {
    slug: "dr-jamie-brooks",
    name: "Dr Jamie Brooks",
    credential: "MBBS, FRACGP",
    specialty: "adhd-gp",
    telehealth: true,
    bio: "GP providing affordable ADHD assessments and ongoing medication reviews via telehealth.",
    sample: true,
  },
];

export const conditions = [
  {
    slug: "adhd",
    name: "ADHD",
    reviewer: "Dr Casey Ryan, FRACGP",
    summary:
      "Attention-deficit/hyperactivity disorder (ADHD) is a common neurodevelopmental condition affecting attention, impulse control and activity levels. It can be assessed and managed by psychiatrists and, increasingly, by GPs with a special interest.",
    sections: [
      {
        h: "What is ADHD?",
        body:
          "ADHD is a neurodevelopmental condition that affects how the brain regulates attention, impulsivity and activity. It often continues from childhood into adulthood, where it can affect work, study and relationships.",
      },
      {
        h: "Getting assessed in Australia",
        body:
          "A diagnosis involves a structured clinical assessment against DSM-5 criteria, a developmental history, and screening for co-existing conditions. In some states, appropriately trained GPs can now assess and manage adult ADHD, shortening waits and reducing cost.",
      },
    ],
    faqs: [
      {
        q: "Can a GP diagnose ADHD in Australia?",
        a: "In several states, appropriately trained GPs can assess, diagnose and manage adult ADHD, including prescribing where clinically appropriate. Rules vary by state.",
      },
      {
        q: "How long does an ADHD assessment take?",
        a: "A GP-led pathway is often completed within a couple of weeks, compared with 6–18 months for many private psychiatrists.",
      },
    ],
    relatedSpecialties: ["psychiatrist", "adhd-gp"],
  },
  {
    slug: "anxiety",
    name: "Anxiety",
    reviewer: "Dr Alex Morgan, FRANZCP",
    summary:
      "Anxiety disorders involve persistent, excessive worry or fear that interferes with daily life. They are common and highly treatable with therapy, and sometimes medication.",
    sections: [
      {
        h: "Understanding anxiety",
        body:
          "Occasional anxiety is normal, but an anxiety disorder involves worry or fear that is persistent, out of proportion, and affects everyday functioning. Common types include generalised anxiety, social anxiety and panic disorder.",
      },
      {
        h: "Treatment options",
        body:
          "Evidence-based psychological therapies such as CBT are first-line. Psychologists provide these, and GPs or psychiatrists can advise on medication where appropriate.",
      },
    ],
    faqs: [
      {
        q: "Do I need a referral to see a psychologist for anxiety?",
        a: "You can see a psychologist without a referral, though a GP Mental Health Treatment Plan may give you access to Medicare rebates for a number of sessions.",
      },
    ],
    relatedSpecialties: ["psychologist", "psychiatrist"],
  },
  {
    slug: "depression",
    name: "Depression",
    reviewer: "Dr Priya Nair, FRANZCP",
    summary:
      "Depression is a common mood condition involving persistent low mood, loss of interest, and changes in energy, sleep and concentration. It is treatable with therapy, lifestyle support and, where needed, medication.",
    sections: [
      {
        h: "Recognising depression",
        body:
          "Depression is more than feeling down. It involves a persistent low mood or loss of interest lasting two weeks or more, often with changes to sleep, appetite, energy and concentration.",
      },
      {
        h: "Getting help",
        body:
          "Psychologists provide evidence-based talking therapies, while GPs and psychiatrists can coordinate care and medication. Telehealth makes support accessible from anywhere in Australia.",
      },
    ],
    faqs: [
      {
        q: "Is depression treatable through telehealth?",
        a: "Yes. Many people effectively manage depression with telehealth therapy and GP support, though anyone in crisis should seek urgent in-person help.",
      },
    ],
    relatedSpecialties: ["psychologist", "psychiatrist"],
  },
];

export const getSpecialty = (slug) => specialties.find((s) => s.slug === slug);
export const getLocation = (slug) => locations.find((l) => l.slug === slug);
export const getCondition = (slug) => conditions.find((c) => c.slug === slug);
export const getProvider = (slug) => providers.find((p) => p.slug === slug);
export const providersBySpecialty = (slug) =>
  providers.filter((p) => p.specialty === slug);
// Telehealth providers serve every location in this launch skeleton.
export const providersBySpecialtyLocation = (specialtySlug) =>
  providers.filter((p) => p.specialty === specialtySlug);
