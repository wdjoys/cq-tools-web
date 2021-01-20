// vue.config.js for less-loader@6.0.0
module.exports = {
    css: {
        loaderOptions: {
            less: {
                lessOptions: {
                    modifyVars: {
                        'border-radius-base': '3px'
                    },
                    javascriptEnabled: true
                }
            }
        },
        requireModuleExtension: true
    }

}
