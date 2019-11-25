const express = require("express");
const axios = require("axios");
const cors = require("cors");

const port = process.env.PORT || 7006;
const app = express();
var server   = require('http').Server(app);
var io       = require('socket.io')(server);

app.use(cors());

const config = {
    headers: {
      'Authorization': 'token a9b5f03f9c33ab3:b88ec9d98a1ea68'
    }
  }

app.get("/", (req, res) => {
    axios.get(
        "https://dev-lestari.multiinti.io/api/method/digitalwastev2.addon.count_customer", config
    ).then(response => {
        res.json({response : response.data})
    })
});

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        5000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
    try {
        const response = await axios.get(
            "https://dev-lestari.multiinti.io/api/method/digitalwastev2.addon.count_customer", config
        );
        socket.emit("total_customer_registered", response.data.total_customer_registered);
        socket.emit("total_picker_registered", response.data.total_picker_registered);
        socket.emit("total_bank_sampah_registered", response.data.bank_sampah_registered);
        socket.emit("total_inc_order_draft", response.data.incoming_order[0].total_inc_order);
        socket.emit("total_inc_order_to_order", response.data.incoming_order[1].total_inc_order);
        socket.emit("total_order_made_today", response.data.order_made_today[0].total_order_today);
        socket.emit("total_all_order_on_process", response.data.total_order[2].total_order);
        socket.emit("total_all_order_finish", response.data.total_order[1].total_order);
        socket.emit("total_all_order_cancel", response.data.total_order[0].total_order);

    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};

if (process.env.NODE_ENV === "production"){
    app.use(express.static(__dirname + '/client/build'));

    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "client" , "build" ,"index.html"))
    })
}

server.listen(port, () => console.log(`Listening on port ${port}`));