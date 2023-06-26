import React, { useState, useEffect } from 'react';
import MainSection from './MainSection';
import Card from './Card';

export default function CardGrid(props) {

    const cards = props.cardsArray.map((card, index) => 
        <Card card={card} handleClick={() => props.handleClick()} key={index}/>
        );

    return (
        <div className='CardGrid'>
            {cards}
        </div>
    )
}