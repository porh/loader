let http = require('http')
let express = require('express')
let app = express()
let server = http.createServer(app);
app.use(express.json());
let api = {
    index(q, r) {
        ret = {"success": false, "data": 'Init loading...'};
        r.send(ret)
    }
}
let onReq = (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader('Content-Type', 'application/json');
    let dataReq = request.body;
    let apiFuncName = 'index'
    if ('apiFuncName' in request.params) apiFuncName = request.params.apiFuncName;
    if (apiFuncName in api) {
        try {
            console.log(apiFuncName, dataReq)
            api[apiFuncName](dataReq,response)
        } catch (e) {
            process.emitWarning(e);
            console.log(e)
            let res = {success:false, error:"Something happened!"}
            response.status(500).send(res)
        }
    } else {
        let res = {success:false, error:"Method not exist"}
        response.status(500).send(res)
    }
}
app.get('/', onReq)
server.listen(process.env.PORT || '3377');
console.log('server up')
module.exports = {
    listen(_api) {
        api = _api
        app.post('/:apiFuncName', onReq)
        console.log('api set up')
    }
}

