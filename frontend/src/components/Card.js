import { CurrentUserContext } from '../contexts/CurrentUserContext'
import React from 'react'

const Card = (props) => {
  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return(
    <article className="element" >
    <button type="button" className={props.card.owner === currentUser._id ? 'element__remove_active' : 'element__remove_innactive'} onClick={handleDeleteClick} />
    <img src={props.link} onClick={handleClick} alt={props.name} className="element__image" />
    <div className="element__description">
      <h2 className="element__title">{props.card.name}</h2>
      <div className="element__likes">
        <button type="button" className={props.card.likes.some(i => i === currentUser._id) ? 'element__like element__like_active' : 'element__like'} onClick={handleLikeClick} />
        <p className="element__like_count">{props.card.likes.length}</p>
      </div>
    </div>
  </article>
  )
}
export default Card;