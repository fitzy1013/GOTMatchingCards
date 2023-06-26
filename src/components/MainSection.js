import React, { useState, useEffect } from 'react';
import CardGrid from './CardGrid';
import Card from './Card';


export default function MainSection(props) {


    const GRID_SIZE = 12;
    const CHARACTER_COUNT = 12;
    const [cards, setCards] = useState([])
    const [chosenCards, setChosenCards] = useState([])
    const [currentScore, setCurrentScore] = useState(0)
    const [highScore, setHighScore] = useState(0);

    console.log(chosenCards);

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    useEffect(() => {
        const loadCards = async () => {
            setCards(shuffle(await (fetchCharacters(CHARACTER_COUNT))))
        }

        loadCards()
    }, [])

    const fetchCharacters = async (amount) => {
        const characters = []
    
        for (let i = 1; i <= amount; i++) {
          const gotUrl = `https://thronesapi.com/api/v2/Characters/${i}`
          const response = await fetch(gotUrl)
          const character = await response.json()
          const id = character.id
          const name = character.fullName
          const imageURL = character.imageUrl
          characters.push({id, name, imageURL })
        }
    
        return characters
      }
    

    function newGame() {
        var highScore_temp = highScore;
        if (highScore_temp < currentScore) {
            highScore_temp = currentScore
        }
        setChosenCards([]);
        setHighScore(highScore_temp)
        setCurrentScore(0);
        newRoundSetup();
    }

    function playRound(id) {
        if (chosenCards.includes(id)) {
            newGame()
        } else {
            setCurrentScore(prevScore => prevScore + 1)
            setChosenCards((prevState) => [...prevState, id])
            newRoundSetup()
        }
    }

    function newRoundSetup() {
        setCards(shuffle(cards));
    }

    function handleClick(id) 
    {
        playRound(id)
    }

    const cards_element = cards.map((card, index) => 
    <   Card card={card} handleClick={() => handleClick(card.id)} key={index}/>
    );
    

    return (
        <div className="MainSection">
            <div className="ScoreSection">
                <span className='currentScore'>Current Score: {currentScore}</span>
                <span className='highScore'>High Score: {highScore}</span>
            </div>
            <div className='CardGrid'>
               {cards_element}
            </div>
        </div>
    );
}
