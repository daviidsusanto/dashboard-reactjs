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
};

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
        () => getApiAndEmit(socket),
        5000
    );
    socket.on("disconnect", () => console.log("Client disconnected"));
});

const getApiAndEmit = async socket => {
    try {
        const res = await axios.get(
            "https://dev-lestari.multiinti.io/api/method/digitalwastev2.addon.dashboard_external", config
        );
        socket.emit("total_order", res.data.total_order);
        socket.emit("order_cancel", res.data.order_cancel);
        socket.emit("order_finish", res.data.order_finish);
        socket.emit("order_assigned", res.data.order_assigned);
        socket.emit("queue_today", res.data.queue_today);
        socket.emit("queue_carry_over", res.data.queue_carry_over);
        socket.emit("hit_target", res.data.hit_target);
        socket.emit("longest_queue", res.data.longest_queue);

    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

if (process.env.NODE_ENV === "production"){
    app.use(express.static(__dirname + '/client/build'));

    app.get("/",(req,res)=>{
        res.sendFile(path.resolve(__dirname, "client" , "build" ,"index.html"))
    })
}

server.listen(port, () => console.log(`Listening on port ${port}`));

