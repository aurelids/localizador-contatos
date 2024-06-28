// pages/AddUser/index.js
import React, { useState } from "react";
import Input from "../../components/Input";
import * as C from "./styles";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth(); // Assumindo que isAuthenticated é obtido do seu hook de autenticação

  const handleSignup = () => {
    if (!email || !emailConf || !senha || !nome || !cpf || !cep || !telefone || !rua || !numero || !cidade) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;
    }

    const res = signup(email, senha, nome, cpf, cep, telefone, rua, numero, cidade);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");

    // Verifica se o usuário está autenticado antes de navegar para a página inicial
    if (isAuthenticated) {
      navigate("/");
    } else {
      // Lógica adicional caso o usuário não esteja autenticado após o cadastro
      // Exemplo: redirecionar para a tela de login
      navigate("/login");
    }
  };

  return (
    <C.Container>
      <C.Label>ADICIONAR NOVO CONTATO</C.Label>
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
          type="name"
          placeholder="Digite o nome"
          value={nome}
          onChange={(e) => [setNome(e.target.value), setError("")]}
        />
        <Input
          type="cpf"
          placeholder="Digite seu CPF  (Apenas Números)"
          value={cpf}
          onChange={(e) => [setCpf(e.target.value), setError("")]}
        />
        <Input
          type="cep"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={(e) => [setCep(e.target.value), setError("")]}
        />
        <Input
          type="telefone"
          placeholder="Digite seu Telefone"
          value={telefone}
          onChange={(e) => [setTelefone(e.target.value), setError("")]}
        />
        <Input
          type="string"
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
          type="string"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => [setCidade(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <C.CustomButton onClick={handleSignup}>Adicionar</C.CustomButton>
        <C.CustomButton onClick={() => navigate("/")}>Voltar</C.CustomButton>
      </C.Content>
    </C.Container>
  );
};

export default AddUser;
