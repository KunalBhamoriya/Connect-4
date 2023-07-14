import React,{useEffect, useState} from "react";
import GameCircle from "./GameCircle";
import Header from "./Header";
import Footer from "./Footer";
import "../Game.css";
import { isDraw, isWinner, getComputerMove} from "../helper";
import { Game_State_Playing,
    NO_Player,
    Player_1,
    Player_2,
    Game_State_Win,
    Game_State_Draw
  } from "../Constants";



const GameBoard = () => {
  const [gameBoard, setGameBoard] = useState(Array(16).fill(NO_Player));
  const [currentPlayer,setCurrentPlayer] = useState(Player_1);
  const [gameState,setGameState] = useState(Game_State_Playing);
  const [winPlayer,setWinPlayer] = useState(NO_Player);

  useEffect(() => {
     initGame();
  },[]);

  const initGame = () => {
    setGameBoard(Array(16).fill(NO_Player));
    setCurrentPlayer(Player_1);
    setGameState(Game_State_Playing);
  }


  const initBoard = () =>{
    const circles = [];
    for(let i=0;i<16;i++){
      circles.push(renderCircle(i));
    }
    return circles;
  }

  const suggestMove = () => {
    CircleClicked(getComputerMove(gameBoard));
  }

  const CircleClicked = (id) => {
    console.log("circle clicked " + id);

    if(gameBoard[id] !== NO_Player) return;
    if(gameState !== Game_State_Playing) return;

    if(isWinner(gameBoard,id,currentPlayer)){
      setGameState(Game_State_Win);
      setWinPlayer(currentPlayer);
    }

    if(isDraw(gameBoard,id,currentPlayer)){
      setGameState(Game_State_Draw);
      setWinPlayer(NO_Player);
    }

    setGameBoard(prev =>{
      return prev.map((circle,pos) =>{
        if(pos === id) return currentPlayer;
        return circle;
      })
    })

    setCurrentPlayer(currentPlayer === Player_1?Player_2:Player_1);
  }

  const renderCircle = id =>{
    return <GameCircle key={id} id={id} className={`player_${gameBoard[id]}`} onCircleClicked={CircleClicked}>

    </GameCircle>
  }

    return ( 
      <>
      <Header gameState={gameState} currentPlayer = {currentPlayer} winPlayer={winPlayer}/>
       <div className="gameBoard">   
        {initBoard()}
       </div>
      <Footer onNewGameClick={initGame} onSuggestClick={suggestMove} gameState={gameState}/>
       </> 
    )
};

export default GameBoard;