const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/**
 * Keep local production builds out of the running dev server's `.next`.
 * On Vercel the build must use the default `.next`, which is where the
 * deployment step looks for the output.
 */
module.exports = (phase) => ({
  reactStrictMode: true,
  distDir:
    process.env.VERCEL || phase === PHASE_DEVELOPMENT_SERVER
      ? '.next'
      : '.next-production',
});
