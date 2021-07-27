import React  from "react";
import { Link } from "react-router-dom";
import {FiEdit, FiLogOut} from 'react-icons/fi'
import {
  Container,
  Content,
  Background,
  AnimationFormContainer,
} from "./styles";
import Button from "../../components/Buttons";


import firebase from 'firebase/app';
import 'firebase/auth';

import {useAuth} from '../../context/AuthContext';
// import api from "../../services/api";

interface UserDTO{
  name: string,
  id: string,
  email: string,
  created_at: string,
  update_at: string,
}

const Dashboard: React.FC = () => {
  const {user, signOut} = useAuth();
  // const history = useHistory();
  const user_datas: UserDTO = user as UserDTO;
  
  const HandleSignOut = async() => {
    // localStorage.removeItem("@GoBarber:token");
    // localStorage.removeItem("@GoBarber:user");
    signOut();

     
    firebase.auth().signOut().then(() => {
      console.log("Sign-out successful.");
      window.location.href = "/";
    }).catch((error) => {
      // An error happened.
    });
  }

return (
  <Container>
    <Content>
      {/** Div para ANIMAÇÃO, APENAS ISSO */}
      <AnimationFormContainer>
      {/* <img src={spiderman} className="spiderman" alt= "spider" /> */}
      <h1>{`Olá ${user_datas.name}`}</h1>

      <Link to="/edit">
            <FiEdit />
            Editar Usuário
      </Link>
      <Button onClick={HandleSignOut}>
          <FiLogOut />
          Logout
      </Button>

      </AnimationFormContainer>
    </Content>
    <Background />
  </Container>
);
};

export default Dashboard;
