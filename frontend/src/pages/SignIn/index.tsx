import React, { useRef, useCallback } from "react";
import { FiLogIn, FiMail, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
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

interface CredentialsFormData {
  email: string;
  password: string;
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
            .required("E-mail obrigatório")
            .email("Digite email válido"),
          password: Yup.string().required("Senha Obrigatória."),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
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
              name="password"
              icon={FiLock}
              type="password"
              placeholder="senha"
            />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha Senha</a>
          </Form>
          <Link to="/signup">
            <FiLogIn />
            Criar Conta
          </Link>
        </AnimationFormContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default SignIn;
