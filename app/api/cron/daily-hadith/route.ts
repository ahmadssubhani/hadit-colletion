import { NextRequest, NextResponse } from "next/server";
import { runDailyHadithIngest, getDailyStatus } from "@/lib/cron/daily-ingest";

interface DailyHadithRequestBody {
  dryRun?: boolean;
  topicSlug?: string;
  batchSize?: number;
}

function isAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!cronSecret) {
    // In local development without CRON_SECRET configured, allow requests
    return true;
  }

  const querySecret = request.nextUrl.searchParams.get("secret");
  if (querySecret === cronSecret) return true;

  const authHeader = request.headers.get("authorization");
  if (!authHeader) return false;

  const token = authHeader.replace(/^Bearer\s+/i, "");
  return token === cronSecret;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const topicSlug = params.get("topic") ?? undefined;
  const applyParam = params.get("apply");

  // If cron-job.org or Vercel cron calls GET with ?apply=true or ?secret=...
  if (applyParam === "true" || params.has("secret")) {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: "Unauthorized. Provide ?secret=<CRON_SECRET> or Authorization header" },
        { status: 401 },
      );
    }

    const batchSize = Number(params.get("batch_size") || 5);
    const dryRunParam = params.get("dry_run");
    const isDryRun = dryRunParam === "true";

    try {
      const result = await runDailyHadithIngest({
        topicSlug,
        apply: !isDryRun,
        batchSize,
      });
      return NextResponse.json(result, { status: result.success ? 200 : 400 });
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  }

  try {
    const status = await getDailyStatus(topicSlug);
    return NextResponse.json(status);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Provide Authorization: Bearer <CRON_SECRET>" },
      { status: 401 },
    );
  }

  try {
    let body: DailyHadithRequestBody = {};
    try {
      body = (await request.json()) as DailyHadithRequestBody;
    } catch {
      // Empty body is okay
    }

    const searchParams = request.nextUrl.searchParams;
    const dryRunParam = searchParams.get("dry_run");
    const isDryRun = dryRunParam === "true" || body.dryRun === true;
    const topicSlug = body.topicSlug || searchParams.get("topic") || undefined;
    const batchSize = body.batchSize || Number(searchParams.get("batch_size") || 5);

    const result = await runDailyHadithIngest({
      topicSlug,
      apply: !isDryRun,
      batchSize,
    });

    return NextResponse.json(result, { status: result.success ? 200 : 400 });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
