import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import Preloader from "./Preloader";

function Main({props}) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" name="avatar"  style={{ backgroundImage: `url(${currentUser.avatar})` }} >
          <div className="profile__avatar profile__avatar_hover" onClick={props.onEditAvatar} />
        </div>
        <div className="profile__intro">
          <h2 className="profile__title" name="name">{currentUser.name}</h2>
          <p className="profile__subtitle" name="about">{currentUser.about}</p>
          <button type="button" className="profile__edit" onClick={props.onEditProfile} />
        </div>
        <button type="button" className="profile__add" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
      {isCardsLoading && (
          <Preloader />
        )}

        {isCardsError && (
          <p className='elements__loading'>isCardsError</p>
        )}

{!isCardsLoading && !isCardsError && (
          <ul className='elements__list'>
      {props.cards.map(card => {
            
            return (<Card
              onCardDelete={props.onCardDelete}
              onCardLike={props.onCardLike}
              card={card}
              onClick={props.onCardClick}
              key={card._id} link={card.link}
              name={card.name}
               />)
          })}
       </ul>
     )}
        </section>
    </main>
  );
}

export default Main;