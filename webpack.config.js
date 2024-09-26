const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
    entry: "./src/myfiwidget.ts",
    devtool: "inline-source-map",
    output: {
        filename: "myfiwidget.js",
        path: path.resolve(__dirname, "dist/_bundles"),
        publicPath: "",
        libraryTarget: "umd",
        library: {
            export: "default",
            name: "myfiwidget",
            type: "umd",
        },
        libraryExport: "default",
        // umdNamedDefine: true,
        globalObject: `(typeof self !== 'undefined' ? self : this)`,
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        // Add support for TypeScripts fully qualified ESM imports.
        extensionAlias: {
            ".js": [".js", ".ts"],
            ".cjs": [".cjs", ".cts"],
            ".mjs": [".mjs", ".mts"],
        },
    },

    module: {
        rules: [
            {
                test: /\/.json$/,
                use: ["cson-loader"]
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    minimize: true,
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                ]
            },
            {
                test: /\.tsx?$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new CleanWebpackPlugin(),
    ],
};
