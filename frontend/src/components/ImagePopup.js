function ImagePopup({ onClose, card }) {
  //if (!card) return null;
  return (
    <div
      className={`popup${
        //!(Object.keys(card).length === 0 && card.constructor === Object)
        card ? " popup_opened" : ""
      }`}
      id="popup_view-photo"
    >
      <div className="popup__content popup__content_type_photo">
        {card && (
          <>
            <button
              type="button"
              className="popup__close-button"
              onClick={onClose}
            />

            <img src={card.link} alt={card.name} className="popup__photo" />
            <p className="popup__photo-caption">{card.name}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;
