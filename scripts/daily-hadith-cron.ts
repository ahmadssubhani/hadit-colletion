import { runDailyHadithIngest, setActiveTopic, getDailyStatus } from "../lib/cron/daily-ingest";

async function main() {
  const args = process.argv.slice(2);

  const apply = args.includes("--apply");
  const showStatus = args.includes("--status");
  const topicIndex = args.indexOf("--topic");
  const setTopicIndex = args.indexOf("--set-topic");
  const batchSizeIndex = args.indexOf("--batch-size");

  const topicSlug = topicIndex !== -1 ? args[topicIndex + 1] : undefined;
  const setTopicSlug = setTopicIndex !== -1 ? args[setTopicIndex + 1] : undefined;
  const batchSize = batchSizeIndex !== -1 ? Number(args[batchSizeIndex + 1]) || 5 : 5;

  console.log("\n=================================================================");
  console.log("  DAILY HADITH SHORTLIST & INGESTION CRON RUNNER                 ");
  console.log("=================================================================\n");

  if (setTopicSlug) {
    console.log(`Setting active daily topic to: ${setTopicSlug}...`);
    const res = await setActiveTopic(setTopicSlug);
    console.log(res.message);
    return;
  }

  if (showStatus) {
    console.log("Fetching daily status...\n");
    const status = await getDailyStatus(topicSlug);
    console.log(`Active Topic: ${status.activeTopic.title} (${status.activeTopic.slug})`);
    console.log(`Next Run Day: Day ${status.activeTopic.dayNumber}`);
    console.log(`Remaining in Topic Pool: ${status.remainingCandidatesInPool}`);
    console.log(`\nUpcoming Next 5 Hadiths:`);
    status.upcomingShortlist.forEach((h, idx) => {
      console.log(`  ${idx + 1}. [${h.bookTitle} #${h.hadithNumber}] ${h.chapter}`);
      console.log(`     Identifier: ${h.identifier} | Status: ${h.hadithStatus}`);
      console.log(`     EN: ${h.englishPreview.slice(0, 100)}...`);
    });
    return;
  }

  console.log(`Running mode: ${apply ? "APPLY (Persisting to database)" : "DRY RUN (Simulation)"}`);
  console.log(`Batch size: ${batchSize} hadiths daily\n`);

  const result = await runDailyHadithIngest({
    topicSlug,
    apply,
    batchSize,
  });

  if (!result.success) {
    console.error(`Error: ${result.message}`);
    if (result.error) console.error(result.error);
    process.exit(1);
  }

  console.log(`\n-----------------------------------------------------------------`);
  console.log(`  RUN MODE: General Multi-Source Daily Hadith Ingestion`);
  console.log(`  DAY: Day ${result.dayNumber} | DATE: ${result.runDate}`);
  console.log(`  SHORTLISTED TODAY: ${result.count} hadiths`);
  console.log(`  REMAINING IN POOL: ${result.remainingInTopicPool} hadiths`);
  console.log(`-----------------------------------------------------------------\n`);

  if (result.sourceHealth && result.sourceHealth.length > 0) {
    console.log(`Source Health & Connectivity (DATA_INGESTION.md Specs):`);
    result.sourceHealth.forEach((sh) => {
      const flagStr = sh.status === "ok" ? "[OK]" : "[FLAGGED / UNREACHABLE]";
      console.log(`  - ${sh.name} (${sh.sourceType}): ${flagStr} - ${sh.fetchedCount} fetched${sh.errorMessage ? ` (${sh.errorMessage})` : ""}`);
    });
    console.log("");
  }

  console.log(`Selected 5 Hadiths for Today (Day ${result.dayNumber}):\n`);
  result.shortlistedHadiths.forEach((h, idx) => {
    console.log(`[#${idx + 1}] ${h.bookTitle} — Hadith ${h.hadithNumber}`);
    console.log(`    Chapter: ${h.chapter}`);
    console.log(`    Identifier: ${h.identifier} | Grade: ${h.hadithStatus}`);
    console.log(`    Arabic: ${h.arabicPreview}`);
    console.log(`    English: ${h.englishPreview}`);
    if (h.sourceUrl) console.log(`    Source: ${h.sourceUrl}`);
    console.log("");
  });

  console.log(result.message);
  console.log("\nDone.\n");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
