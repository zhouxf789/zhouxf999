
const config = require("./webpack.dev")
const webpack = require('webpack')
const path = require('path')
const WebpackDevServer = require('webpack-dev-server')
const exec = require('child_process').exec
let portSet = null
const HOST = "dev.lyxcool.cn"


function execPort(str) {
    const matchResult = /^\-p([1-9]\d+)$/.exec(str);
    if (matchResult && matchResult[1]) {
        return matchResult[1]
    } else {
        return null
    }
}

process.argv.forEach(val => {
    const result = execPort(val);
    portSet = result;
});


const myserver = function (port) {

    const PORT = portSet || process.env.npm_package_runport;
    config.entry.main.unshift("webpack-dev-server/client?http://" + HOST + ":" + PORT, "webpack/hot/dev-server");
    const compiler = webpack(config)
    const server = new WebpackDevServer(compiler, {
        hot: true,
        stats: {
            colors: true
        },
        host: HOST,
        port: PORT,
        historyApiFallback: true,
        disableHostCheck: true,
        contentBase: path.join(__dirname, '..', 'example')
    })
    server.listen(PORT, function (err) {
        if (err) {
            console.log(err)
            return
        }
        console.log(`Listening at http://${HOST}:${PORT}`)
        exec(`open http://${HOST}:${PORT}`, function (err) {
            if (err) {
                exec(`start http://${HOST}:${PORT}`)
            }
        })
    })
}

myserver();
