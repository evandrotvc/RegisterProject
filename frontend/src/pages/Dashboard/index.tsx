import React from "react";
import {Container} from './styles'
import spiderman from '../../assets/spider-man.png';

import {useAuth} from '../../context/AuthContext';

interface UserDTO{
  name: string,
  id: string,
  email: string,
  created_at: string,
  update_at: string,
}

const Dashboard: React.FC = () => {
  const {user} = useAuth();
  const user_datas: UserDTO = user as UserDTO;

  debugger;
  return (
    <>
    <Container>
      <h1>{`Hello ${user_datas.name}, you are logged`}</h1>
      <img src={spiderman} className="spiderman" alt= "spider" />
    </Container>
    </>
  );
};

export default Dashboard;
