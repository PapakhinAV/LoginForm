import style from './index.module.css'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'


const SignUpPage = () => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [emailChanged, setEmailChanged] = useState(false)
  const [passwordChanged, setPasswordChanged] = useState(false)
  const [nameChanged, setNameChanged] = useState(false)
  const [errorEmail, setErrorEmail] = useState("Данное поле не может быть пустым")
  const [errorPass, setErrorPass] = useState("Данное поле не может быть пустым")
  const [errorName, setErrorName] = useState("Данное поле не может быть пустым")
  const [formValidation, setFormValidation] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (errorEmail || errorPass || errorName) {
      setFormValidation(false)
    } else { setFormValidation(true) }
  }, [errorEmail, errorPass, errorName])

  function blurHandler(event) {
    switch (event.target.name) {
      case "email":
        setEmailChanged(true)
        break
      case "password":
        setPasswordChanged(true)
        break
      case "name":
        setNameChanged(true)
        break
    }
  }

  function handlerChange({ target: { name, value } }) {
    setInputs({
      ...inputs, [name]: value,
    })

    const regExpEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (name === "email") {
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
      } else { setErrorPass("") }
    }

    if (name === "name") {

      if (value.length < 4) {
        setErrorName("Минимальная длина - 4 символа")

        if (!value) {
          setErrorName("Данное поле не может быть пустым")
        }
      } else { setErrorName("") }
    }


  }
  const [error, setError] = useState('')

  const handlerSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/signUpNewUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    });

    if (response.status === 200) {
      const login = await fetch(`${process.env.REACT_APP_SERVER_URL}/signInUser`, {
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

      if (login.status === 200) {
        history.push(`/home`)
      }
    } else {
      setError('!! Неправильный логин или пароль !!')
      console.log(error);
    }
  }

  const { email, password, name } = inputs


  return (
    <>
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
              <label htmlFor="inputName" className={style.lableForm}>Name</label>
              <div className={style.inputForm}>
                <input onBlur={event => blurHandler(event)} required onChange={handlerChange} name="name" type="text" placeholder="   Enter your Name" className={style.inputForm} id="inputName" />
                {(nameChanged && errorName) && <div className={style.errorMessage}>{errorName}</div>}
              </div>
            </div>
            <div className={style.elementAuth}>
              <Button goal={"signin"} disableFunc={formValidation} text={"Sign Up"} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
