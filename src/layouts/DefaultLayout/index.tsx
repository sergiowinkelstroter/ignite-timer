import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header";

import * as C from "./styles";

export const DefaultLayout = () => {
  return (
    <C.LayoutContainer>
      <Header />
      <Outlet />
    </C.LayoutContainer>
  );
};
