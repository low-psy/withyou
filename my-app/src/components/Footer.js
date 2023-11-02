import classes from './Footer.module.css'

function Footer({className}){
  return (
    <div className={`${className} ${classes["footer-wrapper"]}`}>
      <div className={classes.footer}>footer</div>
    </div>
  );
}

export default Footer