import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import React from 'react'
import api from '../utils/api'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { Route, useHistory, Switch, Redirect } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cardForDelete, setCardForDelete] = React.useState(null);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState();
  const [isCardsLoading, setIsCardsLoading] = React.useState(false);
  const [isCardsLoadError, setIsCardsLoadError] = React.useState();
  const [email, setEmail] = React.useState('');

  const history = useHistory();
  
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    if (isLiked) {
      api.deleteLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((el) =>
          el._id === card._id ? newCard : el
        ))
      })
        .catch(res => {
          console.log(`Error: ${res.status}`)
        })
    } else {
      api.postLike(card._id).then((newCard) => {
        setCards((cards) => cards.map((el) =>
          el._id === card._id ? newCard : el
        ))
      })
        .catch(res => {
          console.log(`Error: ${res.status}`)
        })
    }
  }

function handleAddPlaceSubmit(card) {
  setIsLoading(true)
  api.addCard(card)
  .then((newCard) => {
    setCards([newCard, ...cards]);
    closeAllPopups(); 
  })
  .catch((error) => console.log(`Ошибка добавления карточки с сервера: ${error}`))
  .finally(() =>  setIsLoading(false));
} 

function handleCardDelete(evt) {
  evt.preventDefault();
  api.deleteCard(cardForDelete._id)
  .then(() => {
      setCards(cards.filter((c) => (c._id !== cardForDelete._id)));
      setIsDeleteCardPopupOpen(false);
  })
  .catch((error) => console.log(`Ошибка удаления карточки с сервера: ${error}`));;
} 

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setIsDeleteCardPopupOpen(false);
    setTooltipStatus();
    setCardForDelete(undefined);
  }

function handleUpdateUser(item){
  setIsLoading(true);
  api.setUserData(item)
    .then(res => {
      setCurrentUser(res);
      closeAllPopups()
    })
    .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`))
    .finally(() => setIsLoading(false));
}

function handleUpdateAvatar(item){
  setIsLoading(true)
  api.setUserAvatar(item)
  .then(res => {
    setCurrentUser(res);
    closeAllPopups()
  })
  .catch((error) => console.log(`Ошибка загрузки данных пользователя с сервера: ${error}`))
  .finally(() => setIsLoading(false));
}

React.useEffect(() => {
  if (isLoggedIn) {
    const promises = [api.getUserData(), api.getInitialCards()];

    Promise.all(promises)
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((result) => console.log(`${result} при загрузке данных`));
  }
}, [isLoggedIn]);

const tokenCheck = React.useCallback(() => {
  auth.getContent().then((result) => {
    if (result) {
    setIsLoggedIn(true);
    setEmail(result.email);
    history.push('/');
  }
})
  .catch(res => {
    console.log(`Error: ${res.status}`)
  })
}
, [history])

React.useEffect(() => {
  tokenCheck();
}, [tokenCheck]);

React.useEffect(() => {
  if (loggedIn) {
    history.push('/')
  }
}, [isLoggedIn, history])

function onRegister({ email, password }){
  auth.register(email, password)
    .then((res) => {
      history.push('/signin');
      setTooltipStatus({
        text: 'Вы успешно зарегистрировались', 
        iconType: 'success'
      })
    })
    .catch(() => {
      setTooltipStatus({
        text: 'Что-то пошло не так!  Попробуйте ещё раз.', 
        iconType: 'error'
      });
    })
} 

function onLogin(data){
  const { password, email } = data;
  auth.login(email, password)
    .then((data) => {
      setIsLoggedIn(true);
      setEmail(email);
      history.push('/');
      console.log('push');
    })
    .catch(() => {
      setTooltipStatus({
        text: 'Что-то пошло не так! Попробуйте ещё раз.', 
        iconType: 'error'
      });
    })
}

function onSignOut(){
  auth.logout()
  .then(() => {
  setIsLoggedIn(false);
  history.push('/signin');
})
.catch(err => console.log(err))
}

  return (
     <CurrentUserContext.Provider value={currentUser}>
  <div className="page">
    <Header  email={email} onSignOut={onSignOut} />
    <Switch>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/"exact>
    <Main onEditProfile={setIsEditProfilePopupOpen}  isCardsLoading={isCardsLoading} isCardsError={isCardsLoadError}
    onAddPlace={setIsAddPlacePopupOpen}
    onEditAvatar={setIsEditAvatarPopupOpen} 
    onCardClick={handleCardClick} onCardLike={handleCardLike} cards={cards} onCardDelete={handleCardDeleteRequest}/>
    <Footer />
    
    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSending={isLoading} /> 

    <PopupWithForm name="submit" title="Вы уверены?" text="Да" onSubmit={handleCardDelete} isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} >
    </PopupWithForm>
   
    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSending={isLoading}/> 

    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSending={isLoading}/>

    <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </ProtectedRoute>
    <Route path="/signup">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/signin">
              <Login onLogin={onLogin} />
            </Route>
            <Route path="*">
              {isLoggedIn ? <Redirect to="/"/> : <Redirect to="/login"/>}
            </Route>
          </Switch>
          <Route path="/(signup|signin)">
          <InfoTooltip isOpen={!!tooltipStatus} onClose={closeAllPopups} status={tooltipStatus} />
        </Route>
  </div>
</CurrentUserContext.Provider>
  );
}

export default App;
