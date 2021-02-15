import React, { Component } from "react";
import "./App.css";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(evt) {
    this.props.flipCellsAroundMe();
  }
  render() {
    // let classes = "Cell" + this.props.isLit ? " Cell-lit" : "";

    return (
      <td
        className={`Cell ${this.props.isLit ? "Cell-lit" : ""}`}
        onClick={this.clickHandler}
      ></td>
    );
  }
}
