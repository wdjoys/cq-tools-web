// import { join } from 'path'// 引入path模块
// function resolve (dir) {
//     return join(__dirname, dir)// path.join(__dirname)设置绝对路径
// }

// // vue.config.js for less-loader@6.0.0
// export function chainWebpack (config) {
//     config.resolve.alias
//         .set('@', resolve('./src'))
//     // .set('components', resolve('./src/components'))
//     // .set('assets', resolve('./src/assets'))
//     // .set('common', resolve('./src/common'))
//     // .set('network', resolve('./src/network'))
//     // .set('views', resolve('./src/views'))
//     // set第一个参数：设置的别名，第二个参数：设置的路径
// }

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
