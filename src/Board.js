import React from "react";
import Cell from "./Cell";
import { rand } from "./helper";
import "./App.css";
export default class Board extends React.Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightsStartsOn: 0.25,
  };
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard(),
    };
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nCols; y++) {
      let row = [];
      for (let x = 0; x < this.props.nRows; x++) {
        row.push(rand() < this.props.chanceLightsStartsOn);
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround(coord) {
    console.log("flipping");
    const [y, x] = coord.split("-").map(Number);
    const { nRows, nCols } = this.props;
    const board = this.state.board;
    // console.log(y);
    // console.log(x);
    // console.log(board);

    function flipCell(y, x) {
      if (x >= 0 && x < nRows && y >= 0 && y < nCols) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    let hasWon = board.every((cols) => cols.every((rows) => !rows));
    this.setState({ board: board, hasWon: hasWon });
  }

  makeTable() {
    let tblCells = this.state.board.map((cols, y) => {
      return (
        <tr key={y}>
          {cols.map((rows, x) => {
            let coord = `${y}-${x}`;
            return (
              <Cell
                key={coord}
                isLit={rows}
                flipCellsAroundMe={() => this.flipCellsAround(coord)}
              />
            );
          })}
        </tr>
      );
    });

    return tblCells;
  }
  render() {
    if (this.state.hasWon) {
      return (
        <div className="Board-title">
          <div className="winner">
            <span className="neon">YOU! </span>
            <span className="flux">WIN!</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="Board-title">
            <div className="neon">LIGHTS</div>
            <div className="flux">OUT</div>
          </div>
          <table className="Board">
            <tbody>{this.makeTable()}</tbody>
          </table>
        </div>
      );
    }
  }
}
