import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 100%;
  max-height: 200vh; /* Limita a altura máxima do container à altura da tela */
  margin-top: 10px; /* Margem superior menor para aproximar do título */
  padding: 20px 10px; /* Adiciona um pequeno padding nas laterais e aumenta o vertical */
`;

export const Content = styled.div`
  gap: 10px; /* Reduzi o espaçamento entre os elementos */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  box-shadow: 0 1px 2px #0003;
  background-color: white;
  max-width: 300px; /* Reduzi o tamanho máximo do container */
  padding: 15px; /* Reduzi o padding interno */
  border-radius: 5px;
`;

export const Label = styled.label`
  font-size: 18px;
  font-weight: 600;
  color: #676767;
  margin-bottom: 10px; /* Aumentei a margem inferior para separar do conteúdo */
  text-align: center; /* Centralizei o texto */
  margin-top: 10px; /* Margem superior menor para aproximar do conteúdo */
`;

export const LabelSignin = styled.label`
  font-size: 16px;
  color: #676767;
  margin-top: 10px; /* Adicionei margem superior para separar do conteúdo */
`;

export const labelError = styled.label`
  font-size: 14px;
  color: red;
  margin-top: 10px; /* Adicionei margem superior para separar do conteúdo */
`;

export const Strong = styled.strong`
  cursor: pointer;

  a {
    text-decoration: none;
    color: #676767;
  }
`;
