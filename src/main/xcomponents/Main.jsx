/* eslint-disable */
import React, { Component } from "react";
import Modal from "../Modal/index";

class Main extends Component {
    constructor (){
        super ()
        this.state = {
            isModalOpen: false
        }
    }

  toggleState = e => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleState}>Open Modal</button>
        <div>Modal is: {this.state.isModalOpen ? "Open" : "Closed"}</div>
        {this.state.isModalOpen && (
          <Modal
            id="modal"
            isOpen={this.state.isModalOpen}
            onClose={this.toggleState}
          >
            <div className="box-body">I am the content of the modal</div>
          </Modal>
        )}
      </div>
    );
  }
}

export default Main;
