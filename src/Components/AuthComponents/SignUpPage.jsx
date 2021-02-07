import style from './index.module.css'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'


const SignUpPage = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  })
  const history = useHistory()

  function handlerChange({ target: { name, value } }) {
    setInputs({
      ...inputs, [name]: value,
    })
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
              <input required onChange={handlerChange} name="email" type="email" placeholder="   Enter your E-mail" className={style.inputForm} id="inputEmail" />
            </div>
            <div className={style.elementAuth}>
              <label htmlFor="inputPassword" className={style.lableForm}>Password</label>
              <input required onChange={handlerChange} name="password" type="password" placeholder="   Enter your Password" className={style.inputForm} id="inputPassword" />
            </div>
            <div className={style.elementAuth}>
              <label htmlFor="inputName" className={style.lableForm}>Name</label>
              <input required onChange={handlerChange} name="name" type="text" placeholder="   Enter your Name" className={style.inputForm} id="inputName" />
            </div>
            <div className={style.elementAuth}>
              <Button text={"Sign Up"} type={"submit"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
