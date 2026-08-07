// src/utils/workforce.js

/**
 * Deduplicates overlapping active session intervals using Sweep-line algorithm.
 * Example: Session 1 [10:00-10:15], Session 2 [10:05-10:20] -> Total Active: 20 mins.
 */
export function calculateDeduplicatedActiveTime(intervals) {
  if (!intervals || intervals.length === 0) return 0;

  // Sort intervals based on start time
  intervals.sort((a, b) => a.start - b.start);

  let merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    let current = intervals[i];
    let previous = merged[merged.length - 1];

    if (current.start <= previous.end) {
      // Overlapping intervals, merge them
      previous.end = Math.max(previous.end, current.end);
    } else {
      // No overlap, add to merged list
      merged.push(current);
    }
  }

  // Calculate total seconds from merged distinct intervals
  let totalActiveSeconds = 0;
  merged.forEach(interval => {
    totalActiveSeconds += (interval.end - interval.start);
  });

  return totalActiveSeconds;
}