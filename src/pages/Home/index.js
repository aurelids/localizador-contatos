import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import GoogleMapComponent from "../../components/GoogleMapComponent";

const Home = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [filteredUsers, setFilteredUsers] = useState([]); // Estado para os usuários filtrados

  useEffect(() => {
    const usersStorage = localStorage.getItem("users_bd");
    if (usersStorage) {
      const parsedUsers = JSON.parse(usersStorage);
      // Ordenar usuários por nome antes de definir
      const sortedUsers = parsedUsers.sort((a, b) => a.nome.localeCompare(b.nome));
      setUsersData(sortedUsers);
      setFilteredUsers(sortedUsers); // Inicialmente, os usuários filtrados são os mesmos que os dados de todos os usuários
    }
  }, []);

  // Função para filtrar usuários por CPF ou por NOME
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(usersData); // Se o termo de pesquisa estiver vazio, mostrar todos os usuários
    } else {
      const filtered = usersData.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.cpf.includes(searchTerm)
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, usersData]);

  const handleDeleteUser = (email) => {
    const updatedUsers = usersData.filter((user) => user.email !== email);
    localStorage.setItem("users_bd", JSON.stringify(updatedUsers));
    // Ordenar usuários por nome antes de definir
    const sortedUsers = updatedUsers.sort((a, b) => a.nome.localeCompare(b.nome));
    setUsersData(sortedUsers);
    setFilteredUsers(sortedUsers); // Atualizar os usuários filtrados após a exclusão
  };

  const handleAddUser = () => {
    navigate("/signup");
  };

  const handleEditUser = (user) => {
    navigate("/edit", { state: { user } });
  };

  const handleLocateUser = (user) => {
    setSelectedLocation({ lat: parseFloat(user.latitude), lng: parseFloat(user.longitude) });
  };

  return (
    <C.Container>
      <C.Title>Central de Usuários</C.Title>
      <C.SearchContainer>
        <C.SearchInput
          type="text"
          placeholder="Pesquisar por CPF ou Nome"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </C.SearchContainer>
      <C.Content>
        <C.UserListContainer>
          <C.UserList>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <C.UserItem key={index}>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Nome:</strong> {user.nome}</p>
                  <p><strong>CPF:</strong> {user.cpf}</p>
                  <p><strong>CEP:</strong> {user.cep}</p>
                  <p><strong>Telefone:</strong> {user.telefone}</p>
                  <p><strong>Rua:</strong> {user.rua}</p>
                  <p><strong>Número:</strong> {user.numero}</p>
                  <p><strong>Cidade:</strong> {user.cidade}</p>
                  <p><strong>Latitude:</strong> {user.latitude}</p>
                  <p><strong>Longitude:</strong> {user.longitude}</p>
                  <C.ActionButtons>
                    <C.EditButton onClick={() => handleEditUser(user)}>
                      Editar
                    </C.EditButton>
                    <C.DeleteButton onClick={() => handleDeleteUser(user.email)}>
                      Deletar
                    </C.DeleteButton>
                    <C.LocateButton onClick={() => handleLocateUser(user)}>
                      Localizar
                    </C.LocateButton>
                  </C.ActionButtons>
                </C.UserItem>
              ))
            ) : (
              <p>Nenhum usuário encontrado</p>
            )}
          </C.UserList>
          <C.AddUserButton onClick={handleAddUser}>Adicionar Usuário</C.AddUserButton>
          <C.LogoutButton onClick={() => [signout(), navigate("/")]} style={{ marginTop: "10px" }}>Sair</C.LogoutButton>
        </C.UserListContainer>
        <GoogleMapComponent selectedLocation={selectedLocation} />
      </C.Content>
    </C.Container>
  );
};

export default Home;
