import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const response = http.get("https://swapi.dev/api/people", () => {
  HttpResponse.json({
    results: [{ name: "Luke Skywalker" }, { name: "Darth Vader" }],
  });
});

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders the heading h1", () => {
  render(<App />);
  const titleElement = screen.getByText(/Star Wars:Testing API Calls/i);
  expect(titleElement).toBeInTheDocument();
});
