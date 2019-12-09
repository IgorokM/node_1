const express = require('express');
const bodyParser = require('body-parser');
const server = express();
const port = 8580;



/**
 * @param {string | string[]} name
 * @param {string | string[]} age
 */
function template(name, age) {
    return `
<form action="./" method="POST">
    <label for="name">Name: </label>
    <input id="name" name="name" value="${name}"/>
    <label for="age">Age: </label>
    <input id="age" name="age" value="${age}" type="text"/>
    <input type="submit" value="Send"/>
</form>`;
}
server.use(bodyParser.urlencoded({
    extended: true
}));

server.post('/', (req, res) => {
    const name = req.body.name || '';
    const age = req.body.age || '';
    const url = require('url');

    res.redirect(url.format({
        pathname: '/',
        query: {
            name,
            age
        }
    }));
});

server.get('/', (req, res) => {
    const name = req.query.name || '';
    const age = req.query.age || '';
    const SUCCESS = `<h1>Hi ${name}</h1>`;
    const TEMPLATE = template(name, age);
    if (name && age) {
        res.send(SUCCESS);
    } else if (!name && !age) {
        res.send(TEMPLATE);
    } else {
        res.status(401).send(TEMPLATE);
    }
});

server.listen(port);