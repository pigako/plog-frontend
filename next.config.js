const withImages = require("next-images");
const withCSS = require("@zeit/next-css");
const CKEditorWebpackPlugin = require("@ckeditor/ckeditor5-dev-webpack-plugin");
const { styles } = require("@ckeditor/ckeditor5-dev-utils");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

module.exports = withCSS(
    withImages(
        withBundleAnalyzer({
            compress: true,
            useFileSystemPublicRoutes: false,

            webpack(config, options) {
                const prod = process.env.NODE_ENV === "production";
                console.log(config.module.rules); // <- 추가

                // 1. 기존 nextjs webpack 처리를 ckeditor에서 처리할 부분을 제외하고 할 수 있도록 설정
                config.module.rules.forEach(function (rule, index, array) {
                    if (!rule.test) return;
                    const test = rule.test.toString();
                    if (test.includes("css")) {
                        array[index] = {
                            ...rule,
                            exclude: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/
                        };
                    } else if (test.includes("svg")) {
                        array[index] = {
                            ...rule,
                            exclude: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/
                        };
                    }
                });

                // 2. ckeditor css 처리
                config.module.rules.push({
                    test: /ckeditor5-[^/]+\/theme\/[\w-/]+\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                injectType: "singletonStyleTag"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: styles.getPostCssConfig({
                                themeImporter: {
                                    themePath: require.resolve("@ckeditor/ckeditor5-theme-lark")
                                },
                                minify: true
                            })
                        }
                    ]
                });

                // 3. ckeditor svg 처리
                config.module.rules.push({
                    test: /ckeditor5-[^/]+\/theme\/icons\/.+\.svg$/,
                    use: ["raw-loader"]
                });

                return {
                    ...config,
                    mode: prod ? "production" : "development",
                    devtool: prod ? "hidden-source-map" : "eval",
                    plugins: [...config.plugins, new options.webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/)]
                };
            }
        })
    )
);
