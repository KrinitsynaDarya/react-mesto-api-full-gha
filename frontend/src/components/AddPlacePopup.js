import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  // Обработчик изменения инпута обновляет стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  // Обработчик изменения инпута обновляет стейт
  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  React.useEffect(() => {
    if (isOpen) {
      setName("");
      setLink("");
    }
  }, [isOpen]);

  return (
    <PopupWithForm
      onClose={onClose}
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          value={name || ""}
          onChange={handleNameChange}
          className="popup__field popup__field_type_place"
          id="card-name"
          name="name"
          minLength="1"
          maxLength="30"
          noValidate
          required
          placeholder="Название"
        />
        <span className="popup__field-error card-name-error" />
        <input
          value={link || ""}
          onChange={handleLinkChange}
          className="popup__field popup__field_type_link"
          id="card-link"
          name="link"
          type="url"
          required
          noValidate
          placeholder="Ссылка на картинку"
        />
        <span className="popup__field-error card-link-error" />
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
