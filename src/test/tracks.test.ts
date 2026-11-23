import { describe, expect, it } from "vitest";
import { TRACKS } from "@/constants/tracks";

describe("TRACKS", () => {
  it("곡 번호가 겹치지 않는다", () => {
    const ids = TRACKS.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("모든 곡에 제목, 음원, 가사가 있다", () => {
    for (const track of TRACKS) {
      expect(track.title).not.toBe("");
      expect(track.src).not.toBe("");
      expect(track.lyrics.trim()).not.toBe("");
    }
  });
});
