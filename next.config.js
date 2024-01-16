/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const nextConfig = {
    async headers() {
        return [
            {
                source: '/',
                locale: undefined,
                headers: [
                    {
                        key: 'Cache-Control',
                        // value: 'public, max-age=9999999999, must-revalidate',
                        value: 'no-cache',
                    },
                ],
            },
        ];
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,

    // output: 'export',
    trailingSlash: true,
    experimental: {
        serverActions: true,
        // runtime: "edge",
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
            })
        );
        return config;
    },
    images: {
        formats: ['image/webp', 'image/avif'],
        domains: [
            'sstorage.clearance.ae',
            'backend-live.clearance.ae',
            'www.clearance.ae',
        ],
        deviceSizes: [390, 3840],
    },
    sentry: {
        // disableServerWebpackPlugin: true,
        // disableClientWebpackPlugin: true,
        // hideSourceMaps: true,
        // transpileClientSDK: true,
        // See the sections below for information on the following options:
        //   'Configure Source Maps':
        //     - disableServerWebpackPlugin
        //     - disableClientWebpackPlugin
        //     - hideSourceMaps
        //     - widenClientFileUpload
        //   'Configure Legacy Browser Support':
        //     - transpileClientSDK
        //   'Configure Serverside Auto-instrumentation':
        //     - autoInstrumentServerFunctions
        //     - excludeServerRoutes
        //   'Configure Tunneling to avoid Ad-Blockers':
        //     - tunnelRoute
    },
};

const sentryWebpackPluginOptions = {
    // Additional config options for the Sentry webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, configFile, stripPrefix, urlPrefix, include, ignore
    // org: "example-org",
    // project: "duttip",
    // // An auth token is required for uploading source maps.
    // authToken: process.env.SENTRY_AUTH_TOKEN,
    // silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting
module.exports = withSentryConfig(nextConfig, sentryWebpackPluginOptions);
