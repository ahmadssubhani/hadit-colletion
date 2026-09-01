import { NextRequest, NextResponse } from "next/server";
import { searchHadiths } from "@/lib/search";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const result = await searchHadiths({
    q: params.get("q") ?? undefined,
    bookId: params.get("bookId") ?? undefined,
    hadithStatus: params.get("hadithStatus") ?? undefined,
    chainStatus: params.get("chainStatus") ?? undefined,
    narrationStatus: params.get("narrationStatus") ?? undefined,
    scholarId: params.get("scholarId") ?? undefined,
    assessment: params.get("assessment") ?? undefined,
    page: Number(params.get("page") ?? "1") || 1,
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }
  return NextResponse.json(result);
}
