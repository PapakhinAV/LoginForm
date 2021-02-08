import style from './index.module.css'


const Button = ({ text, type, click, disableFunc, goal }) => {
  if (click) {
    return (<button onClick={click} className={style.buttonComp} type={type}>{text}</button>)
  }
  if (goal === "signin") {
    return <button disabled={!disableFunc} className={style.buttonComp} type={type}>{text}</button>
  }
  return (
    <button className={style.buttonComp} type={type}>{text}</button>
  );

}

export default Button;
