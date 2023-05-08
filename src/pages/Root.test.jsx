import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Root from "./Root";
import { BrowserRouter } from "react-router-dom";

describe("Root test", () => {
  beforeEach(() => {
    render(<BrowserRouter><Root /></BrowserRouter>)
  })

  test("Should load welcome text", () => {
    expect(screen.getByText(/Revolutionise how You Learn Radiology/)).toBeDefined()
  })

  test("Should load welcome subtitle", () => {
    expect(screen.getByTestId('root-subtitle')).toBeDefined()
  })
})