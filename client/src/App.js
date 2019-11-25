import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import Logo from "./logo1.png"
class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: "https://project-react-new.herokuapp.com"
    };
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    const socket = socketIOClient.connect();
    socket.on("total_customer_registered", data => this.setState({ response: data }));
    socket.on("total_picker_registered", data => this.setState({ response2: data }));
    socket.on("total_inc_order_draft", data => this.setState({ response3: data }));
    socket.on("total_inc_order_to_order", data => this.setState({ response4: data }));
    socket.on("total_order_made_today", data => this.setState({ response5: data }));
    socket.on("total_bank_sampah_registered", data => this.setState({ response6: data }));
    socket.on("total_all_order_on_process", data => this.setState({ response7: data }));
    socket.on("total_all_order_finish", data => this.setState({ response8: data }));
    socket.on("total_all_order_cancel", data => this.setState({ response9: data }));
  }
  
  
  render() {
    const { response } = this.state;
    const { response2 } = this.state;
    const { response3 } = this.state;
    const { response4 } = this.state;
    const { response5 } = this.state;
    const { response6 } = this.state;
    const { response7 } = this.state;
    const { response8 } = this.state;
    const { response9 } = this.state;

    return (
      <body className = "body">
        <div className="main-overview-banner">
          <div className="overviewcard">
              <div>
                <p className="textContent">Total User</p>
                {response ?
                  <p className="textContent2">{response}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Picker</p>
                {response ?
                  <p className="textContent2">{response2}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Bank Sampah</p>
                {response ?
                  <p className="textContent2">{response6}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
        </div>

        {/* Baris 2 */}
        <div className="main-overview">
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Incoming Order</p>
                {response ?
                  <p className="textContent2">{response3}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Incoming To Order</p>
                {response ?
                  <p className="textContent2">{response4}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
        </div>

        {/* Baris 3 */}
        <div className="main-overview">
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Order On Process</p>
                {response ?
                  <p className="textContent2">{response7}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Order Finish</p>
                {response ?
                  <p className="textContent2">{response8}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
        </div>

        {/* Baris 4 */}
        <div className="main-overview">
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Order Cancel</p>
                {response ?
                  <p className="textContent2">{response9}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
          <div className="overviewcard">
              <div>
                <p className="textContent">Total Order Today</p>
                {response ?
                  <p className="textContent2">{response5}</p>:<p className="textContent2">Loading</p>
                }
              </div>
              <div>
                <img src={Logo} className="overviewcard_icon" alt="Logo"></img>
              </div>
          </div>
        </div>
      </body>
    );
  }
}
export default App;