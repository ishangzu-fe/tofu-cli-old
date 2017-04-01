const path = require('path');
const cwd = process.cwd();
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = (dir) => {
    return path.posix.join(cwd, dir)
}

const getAssetsPath = (_path, config) => {
    var assetsSubDirectory = config.assetsSubDirectory
    return path.posix.join(cwd, assetsSubDirectory, _path)
}

const getCssLoaders = (env, inVue) => {
    let styleLoader = inVue ? 'vue-style-loader' : 'style-loader'

    if (env === 'production') {
        return ExtractTextPlugin.extract({
                    fallback: styleLoader,
                    use: ['css-loader', 'sass-loader']
                })
    } else {
        let loaders = [styleLoader, 'css-loader', 'sass-loader']
        if (inVue) {
            return loaders.join('!')
        } else {
            return loaders
        } 
    }
}

module.exports = function (config) {
    const env = JSON.parse(config.env.NODE_ENV)

    return {
        entry: {
            app: resolve('src/main.js'),
        },
        output: {
            path: resolve('dist'),
            filename: '[name].js',
            publicPath: config.assetsPublicPath
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.common.js',
                '@': resolve('src'),
                'http$': resolve('lib/services.js'),
                'core$': resolve('core/index.js'),
                'config$': resolve('config.js'),
                'views': resolve('src/views'),
                'portal': resolve('src/views/portal'),
                'service': resolve('src/service')
            }
        },
        module: {
            rules: [{
                    test: /\.(vue)$/,
                    enforce: 'pre',
                    loader: 'eslint-loader',
                    include: [resolve('src')],
                    options: {
                        formatter: require("eslint-friendly-formatter")
                    }
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: getCssLoaders(env, true)
                        }
                    }
                },
                {
                    test: /\.(css|scss)$/,
                    use: getCssLoaders(env)
                },
                {
                    test: /\.js(x)*$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.html$/,
                    loader: 'vue-html-loader'
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: getAssetsPath('img/[name].[hash:7].[ext]', config)
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    query: {
                        limit: 10000,
                        name: getAssetsPath('fonts/[name].[hash:7].[ext]', config)
                    }
                }
            ]
        }
    }
}