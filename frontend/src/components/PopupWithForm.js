function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {
  return (
    <div className={`popup popup_type_${name}${isOpen ? " popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          method="POST"
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button type="submit" className="popup__submit-button">
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
