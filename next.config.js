/** @type {import('next').NextConfig} */

// has to be const/require because import is not recognized in next.config.js
const { withAxiom } = require('next-axiom');

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com']
  }
}

module.exports = withAxiom(nextConfig)
