/** @type {import('next').NextConfig} */

// has to be const/require because import is not recognized in next.config.js
const { withAxiom } = require("next-axiom");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "dl.airtable.com",
      "thumbs.gfycat.com",
      "s3.us-west-2.amazonaws.com",
      "v5.airtableusercontent.com",
      "media.tenor.com"
    ],
  },
};

module.exports = withAxiom(nextConfig);
