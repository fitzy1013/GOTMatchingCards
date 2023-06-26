import React, { useState, useEffect } from 'react';
import CardGrid from './CardGrid';

export default function Card(props) {
    return (
        <div className='card-container' onClick={() => props.handleClick(props.card.id)}>
            <img className='characterImage' src={props.card.imageURL}/>
            <p className='characterNameElement'>{props.card.name}</p>
        </div>
    )
}