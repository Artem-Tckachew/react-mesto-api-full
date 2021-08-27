import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'

const Card = ({ card, onCardLike, onCardDelete, onCardClick }) => {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }
  const isOwn = card.owner._id === currentUser._id;

  const cardDeleteButtonClassName = (
    `element__remove ${isOwn ? 'element__remove_active' : 'element__remove_innactive'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;
  return(
    <article className="element" >
    <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} />
    <img src={card.link} onClick={handleClick} alt={card.name} className="element__image" />
    <div className="element__description">
      <h2 className="element__title">{card.name}</h2>
      <div className="element__likes">
        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
        <p className="element__like_count">{card.likes.length}</p>
      </div>
    </div>
  </article>
  )
}
export default Card;