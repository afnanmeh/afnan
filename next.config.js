const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** Keep the running development preview separate from production build files. */
module.exports = (phase) => ({
  reactStrictMode: true,
  distDir: phase === PHASE_DEVELOPMENT_SERVER ? '.next' : '.next-production',
});
