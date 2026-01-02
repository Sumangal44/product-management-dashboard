import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Provide a mock for confirm to avoid accidental dialog errors during tests.
if (typeof globalThis.confirm === 'undefined') {
  globalThis.confirm = vi.fn();
}
