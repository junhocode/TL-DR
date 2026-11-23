import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createStore, Provider } from "jotai";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { Lyrics } from "@/components/Lyrics/Lyrics";
import { TRACKS } from "@/constants/tracks";

const renderLyrics = (trackId: string | null) => {
  const store = createStore();
  store.set(currentTrackIdAtom, trackId);
  return render(
    <Provider store={store}>
      <Lyrics />
    </Provider>,
  );
};

afterEach(cleanup);

describe("Lyrics", () => {
  it("재생 중인 곡의 번호, 제목, 가사를 보여 준다", () => {
    const track = TRACKS[1];
    renderLyrics(track.id);

    expect(screen.getByRole("heading").textContent).toBe(`${track.id}. ${track.title}`);
    expect(screen.getByText(track.lyrics.split("\n")[0], { exact: false })).toBeTruthy();
  });

  it("재생 중인 곡이 없으면 아무것도 보여 주지 않는다", () => {
    const { container } = renderLyrics(null);
    expect(container.textContent).toBe("");
  });
});
