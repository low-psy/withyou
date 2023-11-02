import classes from './GuestSearchIcon.module.css'

function GuestSearchIcon(){
  return (
    <div className={classes["search_icon-wrapper"]}>
      <span className={`material-icons`}>search</span>
      검색
    </div>
  );
}

export default GuestSearchIcon