import { useState } from 'react'
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

  function openModal() {
    setIsOpen(!isOpen)
  }

  const history = useHistory()

  function handlerChange({ target: { name, value } }) {
    setInputs({
      ...inputs, [name]: value,
    })
    if (name === "email") {
      localStorage.setItem(name, value)
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
            <input required onChange={handlerChange} name="email" type="email" placeholder="   Enter your E-mail" className={style.inputForm} id="inputEmail" />
          </div>
          <div className={style.elementAuth}>
            <label htmlFor="inputPassword" className={style.lableForm}>Password</label>
            <input required onChange={handlerChange} name="password" type="password" placeholder="   Enter your Password" className={style.inputForm} id="inputPassword" />
          </div>
          <div className={style.elementAuth}>
            <Button text={"Sign In"} type={"submit"} />
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

