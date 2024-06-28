import { useContext } from "react";
import { AuthContext } from "../contexts/auth";

const useAuth = () => {  // isolando a logica relacionado a autenticação em um local centralizado
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;