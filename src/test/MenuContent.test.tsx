import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { createStore, Provider } from "jotai";
import { MenuContent } from "@/components/MenuContent/MenuContent";
import { ARCHIVE } from "@/constants/archive";
import { EXTERNAL } from "@/constants/external";
import { TRACKS } from "@/constants/tracks";
import { VISUALS } from "@/constants/visuals";
import type { MenuId } from "@/types/menu.type";

const renderMenu = (menu: MenuId) =>
  render(
    <Provider store={createStore()}>
      <MenuContent menu={menu} />
    </Provider>,
  );

afterEach(cleanup);

describe("MenuContent", () => {
  it("TL;DR은 곡 목록을 보여 준다", () => {
    renderMenu("TLDR");
    for (const track of TRACKS) {
      expect(screen.getByText(track.title)).toBeTruthy();
    }
  });

  it("externals는 외부 링크를 보여 준다", () => {
    renderMenu("externals");
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(EXTERNAL.map((item) => item.link));
  });

  it("visuals는 영상 링크를 보여 준다", () => {
    renderMenu("visuals");
    const hrefs = screen.getAllByRole("link").map((a) => a.getAttribute("href"));
    expect(hrefs).toEqual(VISUALS.map((item) => item.link));
  });

  it("archive는 사진을 모두 보여 준다", () => {
    renderMenu("archive");
    expect(screen.getAllByRole("img")).toHaveLength(ARCHIVE.length);
  });
});
