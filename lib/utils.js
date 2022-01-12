const { pathToRegexp } = require('path-to-regexp')

module.exports = {
    flatRoutes: routes => {
        const newRoutes = []
        routes.forEach(route => {
            if (Array.isArray(route)) {
                route.forEach(r => {
                    r.method = r.method || 'GET'
                    newRoutes.push(r)
                })
            } else {
                const { namespace } = route
                route.routes.forEach(r => {
                    r.path = `/${namespace}${r.path}`
                    r.method = r.method || 'GET'
                    newRoutes.push(r)
                })
            }
        })
        
        return newRoutes
    },
    getCurrentRoute: (routes, url, requestMethod) => {
        let currentRoute = false
        const length = routes.length
        for (let i = 0; i < length; i++) {
            const route = routes[i]
            const { path, method } = route
            const regexp = pathToRegexp(path)
            if (regexp.exec(url) && requestMethod === method) {
                currentRoute = route
                break
            }
        }
        return currentRoute
    }
}