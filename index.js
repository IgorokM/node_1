const app = require('express')();
const port = 8580;



function template(name, pass) {
    return `
                <form action="./login">
                    <label for="name">Name</label>
                    <input id="name" name="name" value="${name}"/>
                    <label for="pass">Password</label>
                    <input id="pass" name="pass" value="${pass}" type="password"/>
                    <input type="submit" value="Send"/>
                </form>`;
}
let name = '';
let pass = '';
app.get('/', (request, response) => {
    response.send(template(name, pass));
});
app.get('/login', (req, res) => {
    name = req.query.name;
    pass = req.query.pass;
    if (name && pass) {
        res.status(200).send(`Hi ${name}`);
    }
    res.redirect(301, './');
})
app.listen(port);