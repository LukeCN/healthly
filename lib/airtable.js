// Airtable is Healthly's source of truth.
// Base: Healthly (appz5IY7rXF2nyr7Z) in the Telehealth Australia Group workspace.
//
// To regenerate lib/snapshot.json from Airtable, set an Airtable Personal
// Access Token (with data.records:read on the base) as AIRTABLE_TOKEN and run:
//   AIRTABLE_TOKEN=xxx node scripts/sync.mjs
//
// The app builds statically from the snapshot, so no token is needed to deploy.

export const AIRTABLE_BASE = "appz5IY7rXF2nyr7Z";

export const TABLES = {
  specialties: "Specialties",
  locations: "Locations",
  conditions: "Conditions",
  questions: "Questions",
  providers: "Providers",
};

export async function fetchTable(name, token) {
  const records = [];
  let offset;
  do {
    const url = new URL(
      `https://api.airtable.com/v0/${AIRTABLE_BASE}/${encodeURIComponent(name)}`
    );
    if (offset) url.searchParams.set("offset", offset);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(`Airtable ${name}: ${res.status}`);
    const json = await res.json();
    records.push(...json.records.map((r) => r.fields));
    offset = json.offset;
  } while (offset);
  return records;
}
