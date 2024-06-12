import {execSync} from "child_process";

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
        config.module.rules.push(        {
                test: /\.(js|ts|jsx|tsx)$/,
                use: [
                    {
                        loader: '@qa-compass/code-jump-webpack-react',
                        options: {
                            service: "github",
                            repoUrl: 'https://github.com/qa-compass/examples.git',
                            branch: process.env.VERCEL_GIT_COMMIT_REF || execSync("git rev-parse --abbrev-ref HEAD").toString().trimEnd(),
                            commit: execSync("git rev-parse HEAD").toString().trimEnd(),
                        }
                    }
                ],
                exclude: /node_modules/,
            }
        )
        return config
    },
};

export default nextConfig;