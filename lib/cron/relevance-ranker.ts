import { RawFetchedCandidate, RankedCandidate, RelevanceScoreBreakdown, TopicDefinition } from "./fetchers/types";

export class RelevanceRanker {
  /**
   * Ranks candidates based on Arabic/English keyword overlap with the topic,
   * chapter context, and completeness.
   */
  rank(candidates: RawFetchedCandidate[], topic?: TopicDefinition): RankedCandidate[] {
    const ranked = candidates.map(candidate => {
      const scoreBreakdown = this.scoreCandidate(candidate, topic);
      return {
        candidate,
        scoreBreakdown,
      };
    });

    // Sort descending by total score
    return ranked.sort((a, b) => b.scoreBreakdown.totalScore - a.scoreBreakdown.totalScore);
  }

  private scoreCandidate(candidate: RawFetchedCandidate, topic?: TopicDefinition): RelevanceScoreBreakdown {
    let arabicKeywordScore = 0;
    let englishKeywordScore = 0;
    let chapterScore = 0;
    let completenessScore = 0;
    const diversityBoost = 0;
    const matchedKeywords: string[] = [];

    const arabicText = candidate.arabicText.toLowerCase();
    const englishText = candidate.englishText.toLowerCase();
    const chapterText = candidate.chapter.toLowerCase();

    if (topic && topic.searchQueries) {
      // 1. Arabic Keyword Score
      for (const kw of topic.searchQueries.arabic) {
        if (arabicText.includes(kw)) {
          arabicKeywordScore += 10;
          matchedKeywords.push(kw);
        }
      }

      // 2. English Keyword Score
      for (const kw of topic.searchQueries.english) {
        if (englishText.includes(kw.toLowerCase())) {
          englishKeywordScore += 5;
          matchedKeywords.push(kw);
        }
      }

      // 3. Chapter Context Score
      for (const kw of [...topic.searchQueries.arabic, ...topic.searchQueries.english]) {
        if (chapterText.includes(kw.toLowerCase())) {
          chapterScore += 15;
          if (!matchedKeywords.includes(kw)) matchedKeywords.push(kw);
        }
      }
    }

    // 4. Completeness Score (Penalty for very short fragments or no english)
    if (candidate.arabicText.length > 50) completenessScore += 5;
    if (candidate.englishText.length > 50) completenessScore += 5;
    if (candidate.nodes && candidate.nodes.length > 0) completenessScore += 2;
    if (candidate.assessments && candidate.assessments.length > 0) completenessScore += 3;

    // Optional: Boost diverse traditions if needed, based on some config.

    const totalScore = arabicKeywordScore + englishKeywordScore + chapterScore + completenessScore + diversityBoost;

    return {
      totalScore,
      arabicKeywordScore,
      englishKeywordScore,
      chapterScore,
      completenessScore,
      diversityBoost,
      matchedKeywords
    };
  }
}

