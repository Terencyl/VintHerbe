import React from 'react';
import { Link } from 'react-router-dom';

function CardItem(props) {
  return (
    <>
        <li className='cards_item'>
            <Link className='cards_item_link' to={props.path}>         {/* TODO BUY PAGE */}
                <figure className='cards_item_img-wrap' data-category={props.label}>
                    <img src={props.src} alt='Plant' className='cards_item_img' />
                </figure>
                <div className='cards_item_info'>
                    <h5 className='cards_item_text'>{props.text}</h5>
                    <h5 className='cards_item_price'>{props.price}</h5>
                </div>
            </Link>
        </li> 
    </>
  )
}

export default CardItem;