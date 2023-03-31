import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  React.useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = "";
    }
  }, [isOpen, currentUser.avatar]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar:
        avatarRef.current
          .value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          ref={avatarRef}
          className="popup__field popup__field_type_avatar"
          id="avatar-link"
          name="avatar"
          type="url"
          required
          noValidate
          placeholder="Ссылка на картинку"
        />
        <span className="popup__field-error avatar-link-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
