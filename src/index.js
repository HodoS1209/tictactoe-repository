import React from "react";
import ReactDOM from "react-dom";
import "./index.css"

class Square extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <button className="square" onClick={() => {this.props.onClick();}}>
        {this.props.value || <div>&nbsp;</div>}
      </button>
    );
  }
}


class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   
    return this.props.squares.map((arrayElement, index) => {

      const arrowSquareFunction = () => this.props.handleSquareClick(index);

      return ( <div className="square">
        <Square
          key={index}
          onClick={arrowSquareFunction}
          value={arrayElement}
        />

        {(index + 1) % 3 === 0 ? <br/> : <></>}
      
        </div>
      );
    });
  }
}


class Game extends React.Component {

  constructor(props) {
 
    super(props);


    this.state = {
      squares: Array(9).fill(null), 
      nextSymbol: "X",
      gamewon: false,
    };

   
    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  winning(squares){
    const winningPositions = [  
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ]

    for (let i=0 ; i < winningPositions.length ; i++) {
      let [a,b,c] = winningPositions[i]

        if (
          (squares[a]==="X" || squares[b]==="O") &&
          squares[a] === squares[b] &&
          squares[a] === squares[c]
        ) {
          return winningPositions[i];
        }
    }
}

  
  handleSquareClick(index) {
 
    const stateSquares = this.state.squares;

    if (stateSquares[index] !== null || this.state.gamewon) {
      return;
    }
  
    stateSquares[index] = this.state.nextSymbol;

    let winningPosition = this.winning(stateSquares);
    if (winningPosition) {
      this.setState({ gamewon: true });
      console.log(`Win ${winningPosition}`);
    }
   
    const nextSymbol = this.state.nextSymbol === "X" ? "O" : "X";

    this.setState({ squares: stateSquares, nextSymbol: nextSymbol });

  }


  render() {
    
    return (
      <Board
        squares={this.state.squares}
        handleSquareClick={this.handleSquareClick}
      />
    );

  }
}

ReactDOM.render(<Game />, document.getElementById("root"));