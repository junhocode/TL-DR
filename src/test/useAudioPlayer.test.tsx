import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { createStore, Provider } from "jotai";
import type { ReactNode } from "react";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { TRACKS } from "@/constants/tracks";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { audio } from "@/lib/audio";

const setup = () => {
  const store = createStore();
  renderHook(() => useAudioPlayer(), {
    wrapper: ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>,
  });
  return store;
};

beforeEach(() => {
  vi.spyOn(audio, "play").mockResolvedValue(undefined);
  vi.spyOn(audio, "pause").mockImplementation(() => {});
  vi.spyOn(audio, "load").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("useAudioPlayer", () => {
  it("곡을 고르면 그 곡 음원으로 재생한다", () => {
    const store = setup();

    act(() => store.set(currentTrackIdAtom, "02"));

    expect(audio.getAttribute("src")).toBe(TRACKS[1].src);
    expect(audio.play).toHaveBeenCalled();
  });

  it("멈추면 재생을 멈추고 음원을 비운다", () => {
    const store = setup();
    act(() => store.set(currentTrackIdAtom, "01"));

    act(() => store.set(currentTrackIdAtom, null));

    expect(audio.pause).toHaveBeenCalled();
    expect(audio.hasAttribute("src")).toBe(false);
  });

  it("곡이 끝나면 다음 곡으로 넘어가고, 마지막 곡이 끝나면 멈춘다", () => {
    const store = setup();
    act(() => store.set(currentTrackIdAtom, "04"));

    act(() => audio.dispatchEvent(new Event("ended")));
    expect(store.get(currentTrackIdAtom)).toBe("05");

    act(() => audio.dispatchEvent(new Event("ended")));
    expect(store.get(currentTrackIdAtom)).toBeNull();
  });

  it("브라우저가 재생을 막으면 재생 상태를 되돌린다", async () => {
    vi.mocked(audio.play).mockRejectedValue(new DOMException("blocked", "NotAllowedError"));
    const store = setup();

    act(() => store.set(currentTrackIdAtom, "01"));

    await waitFor(() => expect(store.get(currentTrackIdAtom)).toBeNull());
  });

  it("곡을 빨리 바꿔서 생긴 AbortError는 무시한다", async () => {
    vi.mocked(audio.play).mockRejectedValue(new DOMException("interrupted", "AbortError"));
    const store = setup();

    await act(async () => store.set(currentTrackIdAtom, "03"));

    expect(store.get(currentTrackIdAtom)).toBe("03");
  });

  it("오디오 오류가 나면 재생 상태를 되돌린다", () => {
    const store = setup();
    act(() => store.set(currentTrackIdAtom, "03"));

    act(() => audio.dispatchEvent(new Event("error")));

    expect(store.get(currentTrackIdAtom)).toBeNull();
  });
});
