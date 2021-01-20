import React from "react";

function NavBar(props) {
  return (
    <>
      <nav className={props.isOpened ? 'menu__mobile' : 'menu'}>
        <p className={`menu__item ${props.isOpened && "menu__item_mobile"}`}>
          {props.email}
        </p>
        <button onClick={props.onClick} className="menu__item menu__item_btn">
          {props.menuText}
        </button>
      </nav>
    </>
  );
}

export default NavBar;
