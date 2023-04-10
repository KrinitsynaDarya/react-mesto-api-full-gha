import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import EditProfilePopup from "./EditProfilePopup";

import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import InfoTooltip from "./InfoTooltip";
import api from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";

import ProtectedRouteElement from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import * as auth from "../utils/Auth";
import { useNavigate } from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState();
  const [isSucces, setIsSucces] = React.useState(false);

  const navigate = useNavigate();

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setUserEmail(userData.email);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  function handleUpdateUser(userData) {
    api
      .editUserInfo(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        // popupEditProfile.renderLoading(false);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .editUserAvatar(userData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        //popupEditAvatar.renderLoading(false);
      });
  }

  function handleAddPlaceSubmit(itemData) {
    api
      .addNewCard(itemData)
      .then((itemData) => {
        setCards([itemData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        //popupAddCard.renderLoading(false);
      });
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

 function tokenCheck() {

  auth.getContent()
  .then((res) => {
      if (res.authorized === false) {
          setLoggedIn(false);

      } else if (res.authorized === true) {
          setLoggedIn(true);
          navigate("/", { replace: true });
      }
  })
  .catch((err) => {
      setLoggedIn(false);
      console.log(err.message);
  })
}

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsSucces(true);
          setIsInfoToolTipOpen(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch(() => {
        setIsSucces(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        setIsSucces(false);
        setIsInfoToolTipOpen(true);
      });
  }

  function handleLogout() {
    auth
    .logout()
    .then(() => {
        setLoggedIn(false);
        setUserEmail();
      }
    )
    .catch((err) => {
      console.log(err.message);
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <Header loggedIn={loggedIn} email={userEmail} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>

        <Footer />
        <ImagePopup
          onClose={() => {
            setSelectedCard(null);
          }}
          card={selectedCard}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          isSucces={isSucces}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
