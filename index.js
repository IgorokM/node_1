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

function server(req, res) {
    const data = getDataUrl(req.url);
    const name = data.name || '';
    const pass = data.pass || '';
    res.writeHeader(200, { 'Content-type': 'text/html' });
    if(name && pass){
        res.end(`<h1>Hi ${name}</h1>`);
    }else{
        res.end(template(name, pass));
    }
}

http.createServer(server).listen(port);