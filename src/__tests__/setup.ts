import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';

import '../__mocks__/mocks';

expect.extend(matchers);

afterEach(() => {
    cleanup();
});
