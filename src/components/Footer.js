import React from "react";
import {
     Game_State_Playing,
  } from "../Constants";

function Footer({onNewGameClick,onSuggestClick,gameState}){
    return (
        <div className="panel footer">
            {
                gameState === Game_State_Playing && 
                <button onClick={onSuggestClick}>Suggest</button>
            }
            {
                gameState !== Game_State_Playing && 
                <button onClick={onNewGameClick}>New Game</button>
            } 
        </div>

    );
}

export default Footer;