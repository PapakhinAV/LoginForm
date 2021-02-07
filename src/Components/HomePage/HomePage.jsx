
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import style from './index.module.css'

const HomePage = () => {

  const history = useHistory()

  useEffect(() => {
    (async () => {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/home`, {
        method: 'GET',
        credentials: 'include'
      })
      if (response.status !== 200) {
        history.push("/")
      }
    })()
  }, [history])

  async function logout() {
    let response = await fetch(`${process.env.REACT_APP_SERVER_URL}/logout`, {
      method: 'DELETE',
      credentials: 'include'
    });
    if (response.status === 200) {
      history.push('/')
    }
  }

  return (
    <div className={style.homeBlock}>
      <Button text={"Logout"} type={"button"} click={logout} />
      <img className={style.imgBlock} src={process.env.REACT_APP_HOME_IMG} alt="img" />
    </div>
  );
}

export default HomePage;
