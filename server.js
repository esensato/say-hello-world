const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());  
app.use(cors())

var mural = []

app.get("/", (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send("Mural de recados...")

})

app.post("/", (request, response) => {
  
    response.setHeader('Content-Type', 'application/json');
    const to = request.body.to;
    const msg = request.body.msg;
    let novo = true;
    for (var i = 0; i < mural.length; i++) {
        if (mural[i].to == to) {
            mural[i].msg = msg;
            novo = false;
            break;
        }
    }

    if (novo) {
        mural.push({to: to, msg: msg});
    }

    response.send({ret: "OK"});

})

app.get("/:to", (request, response) => {
  
    response.setHeader('Content-Type', 'application/json');
    let ret = {msg: "Nenhuma mensagem para você"}
    const to = request.params.to;
    for (var i = 0; i < mural.length; i++) {
        if (mural[i].to == to) {
            ret = mural[i].msg;
            break;
        }
    }
    response.send(ret);

})

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
