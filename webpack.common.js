const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                include: /src/,
                use: {
                    loader: "swc-loader"
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin()
    ]
};