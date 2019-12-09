import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./custom.css";
class App extends Component {
  constructor() {
    super();
    var today = new Date(),
    day = today.getDay(),
    date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    
    this.state = {
      response: false,
      // endpoint: "https://project-react-new.herokuapp.com"
      endpoint: "http://localhost:7006",
      date: date,
      day: day,
      time: today.toLocaleTimeString()
    }

    this.countingSecond = this.countingSecond.bind(this)
  }

  countingSecond() {
    let d = new Date()
    this.setState({
      time: d.toLocaleTimeString()
    })
  }  
  componentWillMount() {
    setInterval(this.countingSecond, 1000)
  }


  componentDidMount() {
    // const socket = socketIOClient.connect();
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on("total_order", data => this.setState({ total_order: data }));
    socket.on("order_cancel", data => this.setState({ order_cancel: data }));
    socket.on("order_finish", data => this.setState({ order_finish: data }));
    socket.on("order_assigned", data => this.setState({ order_assigned: data }));
    socket.on("queue_today", data => this.setState({ queue_today: data }));
    socket.on("queue_carry_over", data => this.setState({ queue_carry_over: data }));
    socket.on("hit_target", data => this.setState({ hit_target: data }));
    // socket.on("longest_queue", data => this.setState({ longest_queue: data }));
  }
  

  render() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const { total_order } = this.state;
    const { order_cancel } = this.state;
    const { order_finish } = this.state;
    const { order_assigned } = this.state;
    const { queue_today } = this.state;
    const { queue_carry_over } = this.state;
    const { hit_target } = this.state;
    // const { longest_queue } = this.state;

    return (
      <body className = "body">
      <div className="wrapper">
        <div className="box order content">
          <h3>Order Today</h3>
          {total_order ?
            <p>{total_order}</p>:<p>0</p>
          }
        </div>

        <div className="box done content">
          <h3>Order Done</h3>
          {order_finish ?
            <p>{order_finish}</p>:<p>0</p>
          }
        </div>

        <div className="box assigned content">
          <h3>Order Assign</h3>
          {order_assigned ?
            <p>{order_assigned}</p>:<p>0</p>
          }
        </div>

        <div className="box time content">
          <h3 className="date-content">{days[this.state.day]}, {this.state.date}</h3>
          <h3 className="time-content">{this.state.time}</h3>
          <h3>Hit Rate</h3>
          {hit_target ?
            <h3>{hit_target} %</h3>:<h3>0</h3>
          }
        </div>

        <div className="box cancelled content">
          <h3>Cancelled</h3>
          {order_cancel ?
            <p>{order_cancel}</p>:<p>0</p>
          }
        </div>
        
        <div className="box carry content">
          <h3>Queue Today</h3>
          {queue_today ?
            <p>{queue_today}</p>:<p>0</p>
          }
          <h3>Carry Order</h3>
          {queue_carry_over ?
            <p>{queue_carry_over}</p>:<p>0</p>
          }
        </div>
      </div>
      </body>
    );
  }
}
export default App;