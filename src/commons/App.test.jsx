import { render, screen } from "@testing-library/react";
import { describe, test, it, expect, beforeEach } from "vitest";
import App from "./App";
import { useReducer } from "react";

describe("Testing the App component", async () => {

  beforeEach(() => {
    render(<App />)
  })

  test("Should load to Overview", () => {
    expect(screen.getByText(/overview/)).toBeDefined()
  })

  test("Should render NavBar", () => {
    expect(screen.getByText(/Gallery/i)).toBeDefined()
  })

  
})