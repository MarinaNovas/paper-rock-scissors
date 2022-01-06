import React, { useState, useEffect } from 'react';
import Paper from './icons/Paper';
import Rock from './icons/Rock';
import Scissors from './icons/Scissors';
import Question from './icons/Question';

import './App.css';

function App() {

   const [userChoice, setUserChoice] = useState(null);
   const [computerChoice, setComputerChoice] = useState(null);
   const [wins, setWins] = useState(0);
   const [losses, setLosses] = useState(0);
   const [gameState, setGameState] = useState(null);

   const choices = [
      { id: 1, name: 'rock', component: Rock, lossesTo: 2 },
      { id: 2, name: 'paper', component: Paper, lossesTo: 3 },
      { id: 3, name: 'scissors', component: Scissors, lossesTo: 1 },
   ];

   useEffect(() => {
      if (!userChoice) return;
      const randomChoice = choices[Math.floor(Math.random() * choices.length)];
      setComputerChoice(randomChoice);

      if (randomChoice.id === userChoice.id) {
         setGameState('drew');
         return;
      }
      if (randomChoice.id == userChoice.lossesTo) {
         setGameState('lost');
         setLosses((losses) => losses + 1);
         return;
      }

      if (randomChoice.id !== userChoice.lossesTo) {
         setGameState('won');
         setWins((wins) => wins + 1);
         return;
      }
   }, [userChoice]);


   function handleUserChoice(choice) {
      const chosenChoice = choices.find((item) => item.id === choice);
      setUserChoice(chosenChoice);
   }

   function renderComponent(choice) {
      const Component = choice.component;
      return <Component />
   }

   function restartGame() {
      setGameState(null);
      setUserChoice(null);
      setComputerChoice(null);
   }

   return (
      <div className="app">
         <div className="info">
            <h2>Rock. Paper. Scissors</h2>
            <div className="wins-losses">
               <div className="wins">
                  <span className="number">{wins}</span>
                  <span className="text">{wins === 1 ? 'Win' : 'Wins'}</span>
               </div>
               <div className="losses">
                  <span className="number">{losses}</span>
                  <span className="text">{losses === 1 ? 'Loss' : 'Losses'}</span>
               </div>
            </div>
         </div>
         {gameState &&
            <div className="game-state">
               <div className={`game-state-form ${gameState}`} onClick={restartGame}>
                  <div className="game-state-content">
                     <span>{renderComponent(userChoice)}</span>
                     <span>{`You ${gameState}!`}</span>
                     <span>{renderComponent(computerChoice)}</span>
                  </div>
                  <button>Play Again</button>
               </div>
            </div>}
         <div className="choices">
            <div>You</div>
            <div></div>
            <div>Computer</div>
            <div>
               <button className="rock" onClick={() => handleUserChoice(1)}>
                  <Rock />
               </button>
               <button className="paper" onClick={() => handleUserChoice(2)}>
                  <Paper />
               </button>
               <button className="scissors" onClick={() => handleUserChoice(3)}>
                  <Scissors />
               </button>
            </div>
            <div className="vs">vs</div>
            <div>
               <button className="computer-choice">
                  <Question />
               </button>
            </div>
         </div>
      </div>
   );
}

export default App;
