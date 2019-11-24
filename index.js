const http = require('http');
const port = 8580;



function template(name, pass) {
    return `
<form action="./">
    <label for="name">Name</label>
    <input id="name" name="name" value="${name}"/>
    <label for="pass">Password</label>
    <input id="pass" name="pass" value="${pass}" type="password"/>
    <input type="submit" value="Send"/>
</form>`;
}

function getDataUrl(url) {
    try {
        return require('url').parse(url, true).query;
    } catch (e) { console.error(e.message) }
}

function handler(req, res) {
    const data = getDataUrl(req.url);
    const name = data.name || '';
    const pass = data.pass || '';
    const SUCCESS = `<h1>Hi ${name}</h1>`;
    const TEMPLATE = template(name, pass);
    let body = 0;
    if(name && pass){
        body = SUCCESS;
        res.writeHeader(200, { 'Content-type': 'text/html', 'Content-Length': Buffer.byteLength(body) }).end(SUCCESS);
    }else if(!name && !pass){
        body = TEMPLATE;
        res.writeHeader(200, { 'Content-type': 'text/html', 'Content-Length': Buffer.byteLength(body) }).end(TEMPLATE);
    }else{
        body = TEMPLATE;
        res.writeHeader(401, { 'Content-type': 'text/html', 'Content-Length': Buffer.byteLength(body) }).end(TEMPLATE);
    }
}
http.createServer(handler).listen(port);