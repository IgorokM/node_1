const app = require('express')();
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

app.get('/', (request, response) => {
    const name = request.query.name || '';
    const pass = request.query.pass || '';
    if (name && pass) {
        response.send(`<h1>Hi ${name}</h1>`);
    }
    response.send(template(name, pass));
});
app.listen(port);