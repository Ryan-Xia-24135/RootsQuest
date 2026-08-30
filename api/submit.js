const requiredFields = [
  "student_name",
  "grade",
  "age",
  "city",
  "student_email",
  "guardian_name",
  "guardian_email",
  "guardian_consent",
  "technology_access",
  "weekly_availability",
  "preferred_times",
  "referral_source",
  "favourite_subjects",
  "outside_stem",
  "independent_comfort",
  "world_problem",
  "nature_observation",
  "design_idea",
];

const airtableFields = {
  student_name: "Student Name",
  grade: "Grade",
  age: "Age",
  city: "City or Town",
  student_email: "Student Email",
  guardian_name: "Guardian Name",
  guardian_email: "Guardian Email",
  guardian_phone: "Guardian Phone",
  guardian_consent: "Guardian Consent",
  technology_access: "Technology Access",
  weekly_availability: "Weekly Availability",
  preferred_times: "Preferred Times",
  referral_source: "Referral Source",
  favourite_subjects: "Favourite Subjects",
  outside_stem: "Outside STEM Activities",
  outside_stem_details: "Outside STEM Details",
  independent_comfort: "Independent Work Comfort",
  world_problem: "World Problem",
  nature_observation: "Nature Observation",
  design_idea: "Design Idea",
  participation_notes: "Participation Notes",
  student_questions: "Student Questions",
};

const isEmpty = (value) => Array.isArray(value) ? value.length === 0 : !String(value ?? "").trim();

export async function POST(request) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;

  if (!apiKey || !baseId) {
    console.error("Airtable environment variables are missing.");
    return Response.json({ error: "The submission service is not configured." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const missing = requiredFields.filter((field) => isEmpty(body[field]));
  if (missing.length > 0) {
    return Response.json({ error: "Required form fields are missing." }, { status: 400 });
  }

  if (!/^\S+@\S+\.\S+$/.test(String(body.student_email)) || !/^\S+@\S+\.\S+$/.test(String(body.guardian_email))) {
    return Response.json({ error: "A valid email address is required." }, { status: 400 });
  }

  const fields = {};
  for (const [key, airtableName] of Object.entries(airtableFields)) {
    const value = body[key];
    if (isEmpty(value)) continue;
    fields[airtableName] = Array.isArray(value) ? value.join(", ") : String(value).slice(0, 10000);
  }

  try {
    const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent("Submissions")}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });

    if (!response.ok) {
      const details = await response.text();
      console.error("Airtable submission failed:", response.status, details);
      return Response.json({ error: "The submission could not be saved." }, { status: 502 });
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Airtable request error:", error);
    return Response.json({ error: "The submission service is unavailable." }, { status: 502 });
  }
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
