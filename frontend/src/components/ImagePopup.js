
const ImagePopup = (props) => {
  return (
    <section className={`overlay overlay_img ${props.card ? 'overlay_active' : '' }`}>
      <figure className="popup popup_imgcard">
        <button type="button" className="popup__close popup__close_img" onClick={props.onClose} />
        <img className="popup__img" src={props.card?.link} alt={props.card?.name} />
        <div className="popup__imgcapiton" name="fig">{props.card?.name}</div>
      </figure>
    </section>
  );
}
export default ImagePopup;