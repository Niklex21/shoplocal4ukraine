/** @type {import('next').NextConfig} */

import { withAxiom } from 'next-axiom'

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['dl.airtable.com']
  }
}

module.exports = withAxiom(nextConfig)
