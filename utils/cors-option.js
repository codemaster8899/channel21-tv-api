require("dotenv").config();

const domainsFromEnv = process.env.CORS_DOMAIN || "http://localhost:3000";
const whitelist = domainsFromEnv
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
