module.exports = env => {
    const isDev = env === 'dev';
    return {
        mode: isDev ? "development" : "production",
        entry: {
            xdompath: "./src/index.js",
            "xdompath.global": "./globalScoping.js"
        },
        devtool: "sourcemap",
        optimization: {
            minimize: !isDev
        },
        output: {
            path: __dirname + "/dist",
            filename: `[name]${isDev ? '' : '.min'}.js`
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