import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../app";

describe("app", () => {
  it("renders without crashing", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Hello, world!" })).toBeInTheDocument();
  });
});
