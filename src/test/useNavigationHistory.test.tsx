import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, renderHook, waitFor } from "@testing-library/react";
import { createStore, Provider } from "jotai";
import type { ReactNode } from "react";
import { selectedMenuAtom } from "@/atoms/menuAtom";
import { currentTrackIdAtom } from "@/atoms/playerAtom";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";

const setup = () => {
  const store = createStore();
  renderHook(() => useNavigationHistory(), {
    wrapper: ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>,
  });
  return store;
};

const isOnGuard = () => window.history.state?.guard === true;

beforeEach(() => {
  window.history.replaceState(null, "");
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe("useNavigationHistory", () => {
  it("메인에서 들어가면 보초 기록을 한 칸만 쌓고, 곡을 바꿔도 더 쌓지 않는다", () => {
    const pushState = vi.spyOn(window.history, "pushState");
    const store = setup();

    act(() => store.set(selectedMenuAtom, "TLDR"));
    act(() => store.set(currentTrackIdAtom, "01"));
    act(() => store.set(currentTrackIdAtom, "02"));
    act(() => store.set(selectedMenuAtom, "visuals"));

    expect(pushState).toHaveBeenCalledTimes(1);
    expect(isOnGuard()).toBe(true);
  });

  it("곡 재생 중 뒤로 가면 곡만 끄고, 보초 기록을 다시 쌓는다", async () => {
    const store = setup();
    act(() => {
      store.set(selectedMenuAtom, "TLDR");
      store.set(currentTrackIdAtom, "01");
    });

    act(() => window.history.back());

    await waitFor(() => expect(store.get(currentTrackIdAtom)).toBeNull());
    expect(store.get(selectedMenuAtom)).toBe("TLDR");
    expect(isOnGuard()).toBe(true);
  });

  it("메뉴에서 뒤로 가면 메인으로 가고, 보초 기록이 남지 않는다", async () => {
    const store = setup();
    act(() => store.set(selectedMenuAtom, "archive"));

    act(() => window.history.back());

    await waitFor(() => expect(store.get(selectedMenuAtom)).toBeNull());
    expect(isOnGuard()).toBe(false);
  });

  it("화면에서 직접 메인으로 돌아오면 보초 기록을 치운다", async () => {
    const store = setup();
    act(() => store.set(selectedMenuAtom, "externals"));
    const back = vi.spyOn(window.history, "back");

    act(() => store.set(selectedMenuAtom, null));

    expect(back).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(isOnGuard()).toBe(false));
  });
});
