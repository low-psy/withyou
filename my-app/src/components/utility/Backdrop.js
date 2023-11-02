import classes from './Backdrop.module.css'

function Backdrop({className, onClick}){
  return <div onClick={onClick} className={`${classes.backdrop} ${className}`} />
}

export default Backdrop