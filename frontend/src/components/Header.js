import headerLogo from "../images/header-logo.svg";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Header({ loggedIn, email, onLogout }) {
  const location = useLocation();
  return (
    <header className="header">
      <img alt="Логотип проекта" src={headerLogo} className="header__logo" />
      <div className="header__menu">
        {location.pathname === "/" ? (
          <>
            <p className="header__email">{email}</p>
            <NavLink to="/sign-in" className="header__link" onClick={onLogout}>
              Выйти
            </NavLink>
          </>
        ) : location.pathname === "/sign-in" ? (
          <NavLink to="/sign-up" className="header__link">
            Регистрация
          </NavLink>
        ) : (
          <NavLink to="/sign-in" className="header__link">
            Войти
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
