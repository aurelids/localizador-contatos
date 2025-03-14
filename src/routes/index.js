import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Edit from "../pages/Edit";

const Private = ({ Item }) => {
  const { signed } = useAuth(); // Utiliza o hook useAuth para acessar o estado de autenticação (signed).
  return signed > 0 ? <Item /> : <Signin />; //Se signed for maior que zero (indicando que o usuário está autenticado), renderiza o componente Item.
};

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route exact path="/home" element={<Private Item={Home} />} />
          <Route path="/" element={<Signin />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/edit" element={<Private Item={Edit} />} />
          <Route path="*" element={<Signin />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;