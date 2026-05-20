import { beforeEach } from "vitest";

const dom = (globalThis as { jsdom?: { window: Window & typeof globalThis } }).jsdom;

if (dom?.window) {
  Object.defineProperty(globalThis, "localStorage", {
    configurable: true,
    get: () => dom.window.localStorage
  });
  Object.defineProperty(globalThis, "sessionStorage", {
    configurable: true,
    get: () => dom.window.sessionStorage
  });
}

beforeEach(() => {
  if (dom?.window) {
    dom.window.localStorage.clear();
    dom.window.sessionStorage.clear();
  }
});
