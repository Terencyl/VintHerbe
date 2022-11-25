import React from 'react';
import CardItem from './CardItem';
import './Cards.css';
import orchid from '../images/orchid.jpg'

function Cards() {
  return (
    <div className = 'cards'>
        <h1>Check out our latest plants</h1>
        <div className='cards_container'>
            <div className='cards_wrapper'>
                <ul className='cards_items'>
                    <CardItem 
                    src={orchid}
                    text="Don't forget to water it !"
                    label='Orchids'
                    price='15.99€'
                    path='/'         
                    /> {/* TODO BUY PAGE */}
                </ul>
            </div>
        </div>
    </div>
  );
}

export default Cards;