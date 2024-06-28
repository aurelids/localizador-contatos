import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const UserListContainer = styled.div`
  flex: 0 0 30%;
  margin-right: 20px;
`;

export const UserList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const UserItem = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;

  p {
    margin: 5px 0;
    font-size: 14px;
  }

  strong {
    font-weight: bold;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const EditButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

export const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

export const LocateButton = styled.button`
  background-color: #FFA500;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

export const AddUserButton = styled.button`
  background-color: #008CBA;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

export const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: 10px;
`;

export const SearchContainer = styled.div`
  width: 30%; /* Ajuste para ter a mesma largura que a UserListContainer */
  margin-bottom: 10px;
  margin-right: auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;
