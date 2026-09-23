/**
 * Registers the test-only module hooks. Loaded through `node --import` by the
 * `test` script so every test file can import application modules that use the
 * `@/…` alias or import `.json` data.
 */

import { register } from "node:module";

register("./alias-hooks.mjs", import.meta.url);
