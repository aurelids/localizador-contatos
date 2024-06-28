import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});
// contexto vazio AuthContext utilizando createContext. 
// Isso define um contexto que pode ser usado para fornecer e consumir dados relacionados à autenticação em toda a aplicação.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(); // armazenendo informações do usuario autenticado

  useEffect(() => {
    const userToken = localStorage.getItem("user_token"); // verifica se existem tokens autenticados
    const usersStorage = localStorage.getItem("users_bd"); // veririca se existem dados de usuario armazenados

    if (userToken && usersStorage) {    // se ambos existirem...
      const hasUser = JSON.parse(usersStorage)?.filter(    //converte o JSON e verifica se é o mesmo email armazenado no user_token
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser[0]); // define esse usuario encontrado como setUser
    }
  }, []);

  const signin = (email, password) => {   // funcao verifica se o pw e o email existe e depois compara com os do local storage.
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        const token = Math.random().toString(36).substring(2);      // gera o token de autenticacao se o login der certo
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser({ email, password });
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (email, password, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude) => { // registrando novo usuario
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));
     // Recupera os usuários armazenados no localStorage e converte para um array de objetos JavaScript
    const hasUser = usersStorage?.filter((user) => user.email === email);
     // Filtra os usuários para verificar se já existe um usuário com o mesmo email
    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      // Se já houver usuários, cria um novo array com os usuários existentes mais o novo usuário
      newUser = [...usersStorage, { email, password, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude }];
    } else {
      newUser = [{ email, password, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude }];
    }
    // Armazena o novo array de usuários no localStorage, convertendo-o para string JSON
    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const updateUser = (email, password, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const updatedUsers = usersStorage.map((user) =>
      user.email === email ? { email, password, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude } : user
    );

    localStorage.setItem("users_bd", JSON.stringify(updatedUsers));

    setUser({ email, password, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude });
    return null;
  };

  const getUserData = () => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_bd");

    if (userToken && usersStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );

      return hasUser ? hasUser[0] : null;
    }
    return null;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, updateUser, signout, getUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};