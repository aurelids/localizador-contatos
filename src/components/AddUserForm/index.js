// AddUserForm.js
import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import * as C from "./styles"; // Importe os estilos corretamente
import useAuth from "../../hooks/useAuth"; // Importe useAuth corretamente

const AddUserForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [telefone, setTelefone] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");

  const [error, setError] = useState("");

  const { signup } = useAuth(); // Use o hook useAuth para obter a função signup

  const handleSignup = () => {
    // Lógica de validação e cadastro similar ao componente Signup
    if (!email || !senha || !cpf || !cep || !telefone || !rua || !numero || !cidade) {
      setError("Preencha todos os campos");
      return;
    }

    const res = signup(email, senha, cpf, cep, telefone, rua, numero, cidade);

    if (res) {
      setError(res);
      return;
    }

    alert("Usuário cadastrado com sucesso!");
    onClose(); // Feche o formulário após o cadastro
  };

  return (
    <C.AddUserFormContainer>
      <C.Label>Adicionar Usuário</C.Label>
      <Input
        type="email"
        placeholder="Digite seu E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Adicione os demais campos de entrada */}
      <Button text="Inscrever-se" onClick={handleSignup} />
      <C.LabelError>{error}</C.LabelError>
    </C.AddUserFormContainer>
  );
};

export default AddUserForm;
