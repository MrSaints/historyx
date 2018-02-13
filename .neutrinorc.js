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
                    title: "History",
                },
                env: ["NODE_ENV", "VERSION"],
            },
        ],
        neutrino => {
            if (neutrino.options.command === "start") {
                neutrino.config.devServer.clear();
            }
        },
    ],
};
