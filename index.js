const server = require('./server')
server.listen({
    index(q, r) {
        let ret = {"success": true};
        r.send(ret)
    }
})