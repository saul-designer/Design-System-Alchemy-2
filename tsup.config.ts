import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "theme/index": "src/theme/index.ts",
    "forms/index": "src/forms/index.ts",
    "charts/index": "src/charts/index.ts",
    testing: "src/testing.ts",
    "hooks/index": "src/hooks/index.ts",
    "email/index": "src/email/index.ts",
  },
  format: ["cjs", "esm"],
  outExtension({ format }) {
    return { js: format === "cjs" ? ".cjs" : ".js" };
  },
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "lucide-react",
    "@emotion/react",
    "@emotion/styled",
    "next",
    "react-hook-form",
    "@hookform/resolvers",
    "@hookform/resolvers/zod",
    "zod",
    "recharts",
    "@testing-library/react",
    "@testing-library/jest-dom",
    "@testing-library/user-event",
  ],
});
