/**
 * Runs database seed during Vercel build when SEED_ON_DEPLOY=true.
 * Set in Vercel project env vars along with DB_URL.
 */
require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});

const { runSeed } = require("./seed");

async function main() {
  if (process.env.SEED_ON_DEPLOY !== "true") {
    console.log("SEED_ON_DEPLOY is not true — skipping database seed.");
    process.exit(0);
  }

  console.log("SEED_ON_DEPLOY=true — seeding production database...");
  await runSeed();
  console.log("Deploy seed finished.");
}

main().catch((err) => {
  console.error("Deploy seed failed:", err);
  process.exit(1);
});
