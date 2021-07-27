import React, { useRef, useCallback, useEffect } from "react";
import { FiLogIn, FiMail, FiLock, FiGithub} from "react-icons/fi";
import { FaGoogle} from "react-icons/fa";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Cookies from 'js-cookie';
import {
  Container,
  Content,
  Background,
  AnimationFormContainer,
} from "./styles";
import Button from "../../components/Buttons";
import Input from "../../components/Inputs";
import getValidationErrors from "../../utils/getValidationsErrors";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import firebase from 'firebase/app';
import 'firebase/auth';
import api from "../../services/api";


require('dotenv').config();
interface CredentialsFormData {
  email?: string;
  pis?: string;
  cpf?: string;
  password: string;
}

interface UserDTO {
  id?: string,
  name: string | undefined,
  email: string | undefined,
  password?: string,
}
const SignIn: React.FC = () => {
  const FormRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  

  const handleSubmit = useCallback(
    async (data: CredentialsFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()            
            .email("Digite email válido"),

          cpf: Yup.string().when( {
            is: '',
            then: Yup.string().notRequired(),
            otherwise: Yup
              .string()
              .matches(/^\d{3}\d{3}\d{3}\d{2}$/ , 'Cpf deve ser somente números e sem pontuação').min(11)
          }),

          pis: Yup.string().when( {
            is: '',
            then: Yup.string().notRequired(),
            otherwise: Yup
              .string()
              .matches(/^\d{3}\d{3}\d{3}\d{2}$/ , 'PIS deve ser somente números e sem pontuação').min(11)
          }),
          password: Yup.string().required("Senha Obrigatória."),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data?.email,
          cpf: data?.cpf,
          pis: data?.pis,
          password: data.password,
        });

        history.push("/dashboard"); // redireciona para dashboard, caso logou com sucesso.
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          FormRef.current?.setErrors(errors);
          // return descomente para retirar os Toast quando é apenas erro de validação
        }
        addToast({
          type: "error",
          title: "Erro na autenticação",
          description:
            "Ocorreu um erro ao fazer o login, por favor verifique as credenciais.",
        });
      }
    },
    [signIn, addToast, history]
  );

  useEffect( () => {
    firebase.auth().onAuthStateChanged((userCredentials) =>{

      // pega todas os tokens do usuário logado.
      if(userCredentials){
        userCredentials.getIdTokenResult().then((tokenInfo) => {
          console.log(tokenInfo);
          localStorage.setItem("@GoBarber:token", tokenInfo.token);
          
          const user: UserDTO = {
            id: tokenInfo.claims.user_id,
            name: tokenInfo.claims.name,
            email: tokenInfo.claims.email,
          };
          Cookies.set('session_id', tokenInfo.token, {expires: 1});
          localStorage.setItem("@GoBarber:user", JSON.stringify(user));
          localStorage.setItem("@GoBarber:Firebase", JSON.stringify(tokenInfo));
          // history.push("/dashboard"); // redireciona para dashboard, caso logou com sucesso.
          api.post('/', tokenInfo.token);
          window.location.href = "/dashboard";
          })
        }
      })
    }
    ,[],)

    const HandleClickGithub = async () =>{
      // let auth = false;
      // let user: UserDTO
      firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((userCredentials) => {
        if(userCredentials){
          console.log(userCredentials);
          
        }
      })      
    }
    const HandleClickGmail = async () =>{
      // let auth = false;
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredentials) => {
        if(userCredentials){
          console.log(userCredentials);;
        }
      })      
    }
    
  return (
    <Container>
      <Content>
        {/** Div para ANIMAÇÃO, APENAS ISSO */}
        <AnimationFormContainer>
          <img src={logo} alt="GoBarber" />
          <Form ref={FormRef} onSubmit={handleSubmit}>
            <h1>Faça seu login</h1>

            <Input
              name="email"
              icon={FiMail}
              type="email"
              placeholder="Email"
            />

            <Input
              name="cpf"
              icon={FiMail}
              type="cpf"
              placeholder="CPF"
            />

            <Input
              name="pis"
              icon={FiMail}
              type="pis"
              placeholder="PIS"
            />
            
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"              
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha Senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>

          <div className="button_oauth">
            <Button onClick={HandleClickGithub}>
              <FiGithub />
              Sign In Github
            </Button>

            <Button onClick={HandleClickGmail}>
              <FaGoogle />
              Sign In Gmail
            </Button>
          </div>

        </AnimationFormContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
