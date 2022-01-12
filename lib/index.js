// 1. 路由功能
// 2. 模板引擎
// 3. 静态文件

const http = require('http')
const { flatRoutes, getCurrentRoute } = require('./utils')

function Application({ routes }) {
    this.routes = flatRoutes(routes)
    this.server = null
    this.goNext = true
    this.globalMiddlewares = []
    this.scopeMiddleware = {}
}

const prototype = Application.prototype

prototype.applyMiddleware = function(path, middleware) {
    if (middleware) {
        if (!this.scopeMiddleware[path]) {
            this.scopeMiddleware[path] = []
        }
        this.scopeMiddleware[path].push(middleware)
    } else {
        middleware = path
        this.globalMiddlewares.push(middleware)
    }
}

prototype.next = function() {
    this.goNext = true
}

prototype.listen = function(port = 3009, callback) {
    this.server = http.createServer((req, res) => {
        const { url, method } = req
        if (this.globalMiddlewares.length) {
            for(let j = 0, _j = this.globalMiddlewares.length; j < _j; j++) {
                
            }
        }
        if (!this.goNext) {
            return
        }
        const currentRoute = getCurrentRoute(this.routes, url, method)
        if (currentRoute) {
            currentRoute.handler(req, res, this.next)
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain')
            res.end('Not Found')
        }
    })
    this.server.listen(port, '127.0.0.1', () => {
        callback && callback()
    })
}

module.exports = Application