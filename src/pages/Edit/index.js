import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signed, updateUser } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.user) {
      const userData = location.state.user;
      setEmail(userData.email);
      setNome(userData.nome);
      setCpf(userData.cpf);
      setCep(userData.cep);
      setTelefone(userData.telefone);
      setRua(userData.rua);
      setNumero(userData.numero);
      setCidade(userData.cidade);
      setLatitude(userData.latitude); // Adicionar latitude se disponível
      setLongitude(userData.longitude); // Adicionar longitude se disponível
    }
  }, [location.state]);

  const handleUpdate = () => {
    if (!email || !senha || !nome || !cpf || !cep || !telefone || !rua || !numero || !cidade || !latitude || !longitude) {
      setError("Preencha todos os campos");
      return;
    }

    const res = updateUser(email, senha, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário atualizado com sucesso!");
    navigate("/home");
  };

  if (!signed) {
    navigate("/");
  }

  return (
    <C.Container>
      <C.Label>EDITAR USUÁRIO</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite o E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite a Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite seu CPF (Apenas Números)"
          value={cpf}
          onChange={(e) => [setCpf(e.target.value.replace(/\D/g, '')), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => [setCep(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Digite seu Telefone"
          value={telefone}
          onChange={(e) => [setTelefone(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Rua"
          value={rua}
          onChange={(e) => [setRua(e.target.value), setError("")]}
        />
        <Input
          type="number"
          placeholder="Número do imóvel"
          value={numero}
          onChange={(e) => [setNumero(e.target.value), setError("")]}
        />
        <Input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => [setCidade(e.target.value), setError("")]}
        />
        <Input
          type="coordenadas"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => [setLatitude(e.target.value), setError("")]}
        />
        <Input
          type="coordenadas"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => [setLongitude(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Atualizar" onClick={handleUpdate} />
      </C.Content>
    </C.Container>
  );
};

export default Edit;
