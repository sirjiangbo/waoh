// 1. 路由功能
// 2. 模板引擎
// 3. 静态文件

const http = require('http');
// const { flatRoutes, getCurrentRoute } = require('./utils')

function isFunction(f) {
    return typeof f === 'function'
}

function start() {
    const server = http.createServer((req, res) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('Hello World')
    });

    return new Promise(resolve => {
        server.listen(this.port, this.host, () => {
            resolve();
        })
    })
}

function addRoutes(namespace, routes) {
    routes = routes || namespace
    if (isFunction(routes)) {
        
    } else {
        if (Array.isArray(routes)) {
            // todo 提出处理route的方法
            routes.forEach(route => {
                if (!this.routesMap[route.path]) {
                    this.routesMap[route.path] = []
                }
                this.routesMap[route.path].push(route)
            })
        } else {
            const name = routes.name || ''
            const currentRoutes = routes.routes
            const temp = Array.isArray(currentRoutes) ? currentRoutes : [currentRoutes]
            temp.forEach(route => {
                const fullPath = `${name ? '/' + name : ''}${route.path === '/' ? '' : route.path}`
                if (!this.routesMap[fullPath]) {
                    this.routesMap[fullPath] = []
                }
                this.routesMap[fullPath].push(route)
            })
        }
    }
}

function applyMiddleware(namespace, routes) {
    this.addRoutes(namespace, routes)
}

function createApp(options) {
    return {
        port: 3001,
        host: 'localhost',
        ...options,
        routesMap: {},
        start,
        addRoutes,
        applyMiddleware

    }
}

function Application(options) {
    return createApp(options)
}

module.exports = Application