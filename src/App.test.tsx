import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const handler = http.get("https://swapi.dev/api/people/1", () => {
  return HttpResponse.json({ name: "Luke Skywalker" });
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
const server = setupServer(handler);

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

test("renders the heading h1", () => {
  render(<App />);
  const titleElement = screen.getByText(/Star Wars:Testing API Calls/i);
  expect(titleElement).toBeInTheDocument();
});
