import { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Button from '../Button/Button'
import style from './index.module.css'
import Modal from '../Modal/Modal'

const LoginPage = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  })
  const [isOpen, setIsOpen] = useState(false)
  const [emailChanged, setEmailChanged] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [errorEmail, setErrorEmail] = useState("Данное поле не может быть пустым")
  const [errorPass, setErrorPass] = useState("Данное поле не может быть пустым")
  const [formValidation, setFormValidation] = useState(false)

  const history = useHistory()

  useEffect(() => {
    if (errorEmail || errorPass) {
      setFormValidation(false)
    } else { setFormValidation(true) }
  }, [errorEmail, errorPass])

  function blurHandler(event) {
    switch (event.target.name) {
      case "email":
        setEmailChanged(true)
        break
      case "password":
        setPasswordChanged(true)
        break
    }
  }

  function openModal() {
    setIsOpen(!isOpen)
  }

  function handlerChange({ target: { name, value } }) {
    setInputs({
      ...inputs, [name]: value,
    })

    const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name === "email") {
      localStorage.setItem(name, value)

      if (!value) {
        return setErrorEmail("Данное поле не может быть пустым")
      }

      if (!regExpEmail.test(String(value).toLowerCase())) {
        setErrorEmail("E-mail не корректен")
      } else {
        setErrorEmail("")
      }

    }
    if (name === "password") {

      if (value.length < 4) {
        setErrorPass("Минимальная длина пароля - 4 символа")

        if (!value) {
          setErrorPass("Данное поле не может быть пустым")
        }
      } else {
        setErrorPass("")
      }

    }

  }
  const [error, setError] = useState('')

  const handlerSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/signInUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: 'include'
    });

    if (response.status === 200) {
      history.push(`/home`)
    } else {
      alert('!! Неправильный логин или пароль !!')
      setError('!! Неправильный логин или пароль !!')
      console.log(error);
    }
  }

  const { email, password } = inputs

  return (
    <div className={style.mainPageBlock}>
      <div className={style.authForm}>
        <form className={style.formStyle} onSubmit={handlerSubmit}>
          <div className={style.elementAuth}>
            <label htmlFor="inputEmail" className={style.lableForm}>Email</label>
            <div className={style.inputForm}>
              <input onBlur={event => blurHandler(event)} required onChange={handlerChange} name="email" type="email" placeholder="   Enter your E-mail" className={style.inputForm} id="inputEmail" />
              {(emailChanged && errorEmail) && <div className={style.errorMessage}>{errorEmail}</div>}
            </div>
          </div>
          <div className={style.elementAuth}>
            <label htmlFor="inputPassword" className={style.lableForm}>Password</label>
            <div className={style.inputForm}>
              <input onBlur={event => blurHandler(event)} required onChange={handlerChange} name="password" type="password" placeholder="   Enter your Password" className={style.inputForm} id="inputPassword" />
              {(passwordChanged && errorPass) && <div className={style.errorMessage}>{errorPass}</div>}
            </div>
          </div>
          <div className={style.elementAuth}>
            <Button text={"Sign In"} type={"submit"} goal={"signin"} disableFunc={formValidation} />
          </div>
        </form>
        <div className={style.elementAuth}>
          {<Link to={"/signup"}><Button text={"Sign Up"} type={"button"} /></Link>}
          <Button text={"Forgot your password?"} type={"button"} click={openModal} />
        </div>
      </div>
      <Modal open={isOpen} openModal={openModal} />
    </div>
  );
}

export default LoginPage;

