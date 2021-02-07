import style from './index.module.css'


const Button = ({ text, type, click }) => {
  if (click) {
    return (<button onClick={click} className={style.buttonComp} type={type}>{text}</button>)
  }
  return (
    <button className={style.buttonComp} type={type}>{text}</button>
  );

}

export default Button;
