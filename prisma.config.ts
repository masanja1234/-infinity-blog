import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // DATABASE_URL → pooled connection for normal app queries
    url: process.env["DATABASE_URL"],
    // DIRECT_URL → direct connection used only when running migrations
    directUrl: process.env["DIRECT_URL"],
  },
});
