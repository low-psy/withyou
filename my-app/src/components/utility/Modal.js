import classes from './Modal.module.css';
import Card from './Card';

function Modal({className, children}){
  return (
    <Card className={`${classes.modal} ${className}`}>
      {children}
    </Card>
  );
}

export default Modal