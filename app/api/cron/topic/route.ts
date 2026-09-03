import { NextRequest, NextResponse } from "next/server";
import { setActiveTopic } from "@/lib/cron/daily-ingest";
import { getAllTopicDefinitions, registerCustomTopic } from "@/lib/cron/topics-registry";

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!cronSecret) return true;

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace(/^Bearer\s+/i, "");
  return token === cronSecret;
}

export async function GET() {
  const topics = getAllTopicDefinitions().map((t) => ({
    slug: t.slug,
    title: t.title,
    arabicTitle: t.arabicTitle,
    description: t.description,
    keywords: t.keywords,
    totalCandidates: t.hadithCandidates?.length ?? 0,
  }));

  return NextResponse.json({
    topics,
    instructions: "To switch or register the active topic, send a POST request with { slug, title, keywords }.",
  });
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Provide Authorization: Bearer <CRON_SECRET>" },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { slug, title, arabicTitle, description, keywords, hadithCandidates } = body;

    if (!slug) {
      return NextResponse.json({ error: "Missing required 'slug' field." }, { status: 400 });
    }

    if (hadithCandidates && Array.isArray(hadithCandidates) && hadithCandidates.length > 0) {
      registerCustomTopic({
        slug,
        title: title || slug,
        arabicTitle: arabicTitle || "",
        description: description || "",
        keywords: keywords || [slug],
        searchQueries: {
          arabic: keywords || [slug],
          english: keywords || [slug],
        },
        hadithCandidates,
      });
    }

    const result = await setActiveTopic(slug, {
      title,
      arabicTitle,
      description,
      keywords,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
