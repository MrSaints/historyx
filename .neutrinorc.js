module.exports = {
    use: [
        [
            "@neutrinojs/react",
            {
                hot: false,
                minify: {
                    babel: {
                        removeConsole: true,
                        removeDebugger: true,
                    },
                },
                html: {
                    title: "HistoryX (3)",
                },
            },
        ],
        neutrino => {
            if (neutrino.options.command === "start") {
                neutrino.config.devServer.clear();
            }
        },
    ],
};
