module.exports = env => {
    const isDev = env === 'dev';
    return {
        mode: isDev ? "development" : "production",
        entry: "./src/index.js",
        devtool: "sourcemap",
        optimization: {
            minimize: !isDev
        },
        output: {
            path: __dirname + "/dist",
            filename: `xdompath${isDev ? '' : '.min'}.js`
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                }
            ]
        }
    }; 
};