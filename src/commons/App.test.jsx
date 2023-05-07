import { render, screen } from "@testing-library/react";
import { describe, test, it, expect, beforeEach } from "vitest";
import App from "./App";
import { useReducer } from "react";

describe("Testing the App component", async () => {

  beforeEach(() => {
    render(<App />)
  })

  test("Should load welcome text", () => {
    expect(screen.getByText(/Revolutionse how You Learn Radiology/)).toBeDefined()
  })

  test("Should load welcome subtitle", () => {
    expect(screen.getByTestId('root-subtitle')).toBeDefined()
  })

  
})