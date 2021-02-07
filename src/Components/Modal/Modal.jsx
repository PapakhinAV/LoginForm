import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import style from './index.module.css'
import ReactDom from "react-dom"

const Modal = ({ open, openModal }) => {

  const [curentEmail, setCurentEmail] = useState("")
  let store = localStorage.getItem('email')
  useEffect(() => {
    (() => {
      setCurentEmail(localStorage.getItem('email'))
    })()
  }, [store])

  if (!open) { return null }

  function handlerChange({ target: { value } }) {
    setCurentEmail(value)
  }

  function handlerSubmit() {
    openModal()

  }

  return ReactDom.createPortal(
    <>
      <div className={style.backgroundLayer}></div>

      <form className={style.modalForm} onSubmit={handlerSubmit}>
        <div className={style.elementAuth}>
          <label htmlFor="inputEmail" className={style.lableForm}>Email</label>
          <input required value={curentEmail} onChange={handlerChange} name="email" type="email" placeholder="   Enter your E-mail" className={style.inputForm} id="inputEmail" />
        </div>
        <Button text={"Reset Password"} type={"submit"} />
        <Button text={"Back"} type={"button"} click={openModal} />
      </form>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
