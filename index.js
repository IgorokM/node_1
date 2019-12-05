const http = require('http');
const url = require('url');
const port = 8580;



/**
 * @param {string | string[]} name
 * @param {string | string[]} pass
 */
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

/**
 * @param {string} urlString
 */
function getDataUrl(urlString) {
    try {
        return url.parse(urlString, true).query;
    } catch (e) {
        console.error(e.message)
    }
}

function handler(req, res) {
    const data = getDataUrl(req.url);
    const name = data.name || '';
    const pass = data.pass || '';
    const SUCCESS = `<h1>Hi ${name}</h1>`;
    const TEMPLATE = template(name, pass);
    if (name && pass) {
        res.writeHeader(200, {
            'Content-type': 'text/html',
            'Content-Length': Buffer.byteLength(SUCCESS)
        }).end(SUCCESS);
    } else if (!name && !pass) {
        res.writeHeader(200, {
            'Content-type': 'text/html',
            'Content-Length': Buffer.byteLength(TEMPLATE)
        }).end(TEMPLATE);
    } else {
        res.writeHeader(401, {
            'Content-type': 'text/html',
            'Content-Length': Buffer.byteLength(TEMPLATE)
        }).end(TEMPLATE);
    }
}
http.createServer(handler).listen(port);