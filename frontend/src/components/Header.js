import logo from "../images/logo.svg";
import React from "react";
import NavBar from "./NavBar";

function Header({ email, onClick, menuText }) {
  const [isOpened, setIsOpened] = React.useState(false);

  function openBurgerMenu() {
    setIsOpened(!isOpened);
  }
  return (
    <>
      {isOpened && (
        <NavBar
          isOpened={isOpened}
          email={email}
          menuText={menuText}
          onClick={onClick}
        />
      )}
      <header className="header">
        <div
          className="logo"
          style={{ backgroundImage: `url(${logo}) no-repeat` }}
        ></div>
        <div
          className={
            isOpened ? "menu__burger_close_icon" : "menu__burger_lines_icon"
          }
          onClick={openBurgerMenu}
        ></div>
        {!isOpened && (
          <NavBar
            isOpened={isOpened}
            email={email}
            menuText={menuText}
            onClick={onClick}
          />
        )}
      </header>
    </>
  );
}

export default Header;
