/**
 * Do the setup here if you DO NOT set globals to true
 */
import matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

// Extends Vitest's expect function with matchers from the testing-library
expect.extend(matchers);

// Unmounts React trees that were mounted with render.
afterEach(() => {
	cleanup();
});
