const path = require('path');
const cwd = process.cwd();
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(dir) {
    return path.posix.join(cwd, dir)
}

function getAssetsPath(_path, config) {
    var assetsSubDirectory = config.assetsSubDirectory
    return path.posix.join(cwd, assetsSubDirectory, _path)
}

module.exports = function (config) {
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
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            scss: 'style-loader!css-loader!sass-loader'
                        }
                    }
                },
                // {
                //   test: /\.(css|scss)$/,
                //   use: ExtractTextPlugin.extract({
                //       fallback: 'style-loader',
                //       use: ['css-loader', 'sass-loader'] 
                //   })
                // },
                {
                    test: /\.(css|scss)$/,
                    use: ['style-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.js(x)*$/,
                    loader: 'babel-loader',
                    include: [resolve('node_modules/i-tofu'), resolve('src')]
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

