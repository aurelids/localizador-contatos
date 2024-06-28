import React, { useState, useEffect } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import * as C from "./styles";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [emailConf, setEmailConf] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  // Função para validar CPF
  const validaCPF = (strCPF) => {
    let soma;
    let resto;
    soma = 0;
    if (strCPF === "00000000000") return false;

    for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(strCPF.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(strCPF.substring(10, 11))) return false;

    return true;
  };

  // Função para verificar se o CPF já está cadastrado
  const cpfExistsInLocalStorage = (cpf) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.cpf === cpf);
  };


  // Validação e tratamento de erros
  const handleSignup = () => {
    if (!email || !emailConf || !senha || !nome || !telefone || !cpf || !cep || !numero || !cidade || !rua) {
      setError("Preencha todos os campos");
      return; // Interrompe a execução da função se houver campos vazios
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais");
      return;  // Interrompe a execução da função se houver campos vazios
    } else if (!validaCPF(cpf)) {
      setError("CPF inválido");
      return;  // Interrompe a execução se o CPF não for válido
    } else if (cpfExistsInLocalStorage(cpf)) {
      setError("CPF já cadastrado");
      return;  // Interrompe a execução se o CPF já estiver cadastrado no localStorage
    }

    const res = signup(email, senha, nome, cpf, cep, telefone, rua, numero, cidade, latitude, longitude);
    // parametros de entrada para a função signup

    if (res) {
      setError(res);
      return;
    } //verificar se houve algum erro durante o processo de cadastro.

    alert("Usuário cadastrado com sucesso!"); // caso res nao tiver informação significa que deu certo
    navigate("/");

  };

  // Função para consultar Via Cep e preencher endereço e cidade
  const handleCepChange = (e) => {
    const cepValue = e.target.value.replace(/\D/g, ''); // Limpa o CEP de caracteres não numéricos
    setCep(cepValue); // Atualiza o estado do CEP imediatamente

    // Consulta Via Cep apenas se o CEP tiver 8 dígitos
    if (cepValue.length === 8) {
      fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
        .then(res => res.json()) // // Converte a resposta da requisição de texto para um objeto JSON.
        .then(data => {  // É o objeto JSON retornado pela API do ViaCEP contendo as informações do CEP.
          if (!data.erro) { // Verifica se o CEP é válido
            setRua(data.logradouro); // Preenche o endereço
            setCidade(data.localidade); // Preenche a cidade
            setError(""); // Limpa o erro se houver
          } else {
            setError("CEP não encontrado");
          }
        })
        .catch(error => {
          console.error('Erro ao buscar CEP:', error);
          setError("Erro ao buscar CEP");
        });
    }
  };

  // Efeito para chamar fetchCoordinates quando os campos relevantes mudarem
  useEffect(() => {
    const fetchCoordinates = () => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${numero}+${rua},+${cidade},+${cep}&key=AIzaSyD7HkFL2rkQ11MeNtyrRJZG2zpX-ddBjJs`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            setLatitude(lat);
            setLongitude(lng);
            // const userCoords = { latitude: lat, longitude: lng };
            // localStorage.setItem("userCoords", JSON.stringify(userCoords));
          } else {
            setError("Não foi possível obter a latitude e longitude");
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar coordenadas:", error);
          setError("Erro ao buscar coordenadas");
        });
    };

    if (rua && cep && numero && cidade) {
      fetchCoordinates();
    }
  }, [rua, cep, numero, cidade]); // Dependências do useEffect

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(""); }}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => { setEmailConf(e.target.value); setError(""); }}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => { setSenha(e.target.value); setError(""); }}
        />
        <Input
          type="text"
          placeholder="Digite seu Nome"
          value={nome}
          onChange={(e) => { setNome(e.target.value); setError(""); }}
        />
        <Input
          type="text"
          placeholder="Digite seu Telefone"
          value={telefone}
          onChange={(e) => { setTelefone(e.target.value); setError(""); }}
        />
        <Input
          type="text"
          placeholder="Digite seu CPF (Apenas Números)"
          value={cpf}
          onChange={(e) => { setCpf(e.target.value.replace(/\D/g, '')); setError(""); }}
        />
        <Input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleCepChange}
        />
        <Input
          type="text"
          placeholder="Número do imóvel"
          value={numero}
          onChange={(e) => { setNumero(e.target.value); setError(""); }}
        />
        <Input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={(e) => { setCidade(e.target.value); setError(""); }}
        />
        <Input
          type="text"
          placeholder="Rua"
          value={rua}
          onChange={(e) => { setRua(e.target.value); setError(""); }}
        />
        <Input
          type="coordenades"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => { setLatitude(e.target.value); setError(""); }}
        />
        <Input
          type="coordenades"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => { setLongitude(e.target.value); setError(""); }}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  );
};

export default Signup;
