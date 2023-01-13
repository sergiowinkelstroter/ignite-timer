import * as C from "./styles";

import Logo from "../../assets/Logo.svg";
import { Scroll, Timer } from "phosphor-react";
import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <C.HeaderContainer>
      <img src={Logo} alt="" />
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Historico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </C.HeaderContainer>
  );
};
