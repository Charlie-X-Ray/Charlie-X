import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";

describe("Root test", () => {
  test("Should show title", () => {

    render(
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    );

    expect(screen.getByText(/Start Learning!/)).toBeDefined();
    expect(screen.getByText(/A Chest Radiography Library/)).toBeDefined();
  })
})