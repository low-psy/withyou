import { Fragment } from "react"

function SearchCalendar({onSearch, calendar}){
  return (
    <Fragment>
      {calendar.map(v=>{
        return <li onClick={onSearch} className={v.className}>
          {v.children}
        </li>;
      })}
    </Fragment>
  );
}

export default SearchCalendar