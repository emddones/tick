import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/* Sample of a rendering function */
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            turn: 1,
            squares: Array(9).fill(null)
        };
    }

    initialize(){
        this.setState ({
            turn: 1,
            squares: Array(9).fill(null)
        });
    }

    handleClick(i) {
        if (calculateWinner(this.state.squares) || this.state.squares[i]) {
            return;
        }
        const squares = this.state.squares.slice(); //copies the arrays first begore mutating to optimize re-renders
        var marker = this.determinePlayer();
        squares[i] = marker;
        this.setState({ squares: squares, turn: this.state.turn + 1 });
    }

    isXNext() {
        return this.state.turn % 2 === 1;
    }

    determinePlayer() {
        return this.isXNext() ? 'X' : 'O';
    }

    renderSquare(i) {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}>
        </Square>;
    }

    render() {
        let status;
        const winner = calculateWinner(this.state.squares);
        const turnDesc = 'Turn(' + this.state.turn + ') ';
        if (winner) {
            status = turnDesc + 'Winner is : ' + winner;
        } else {
            status = turnDesc + 'Next player: ' + this.determinePlayer();
        }

        return (
            <div>                
                <div className="status">{status} <button onClick={() => this.initialize()}> New Game </button> </div>                
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}