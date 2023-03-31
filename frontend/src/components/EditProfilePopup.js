import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          value={name || ""}
          onChange={handleNameChange}
          className="popup__field"
          id="profile-name"
          name="name"
          minLength="2"
          maxLength="40"
          noValidate
          required
          placeholder="Имя"
        />
        <span className="popup__field-error profile-name-error" />
        <input
          value={description || ""}
          onChange={handleDescriptionChange}
          className="popup__field"
          id="profile-job"
          name="about"
          minLength="2"
          maxLength="200"
          noValidate
          required
          placeholder="О себе"
        />
        <span className="popup__field-error profile-job-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
