import React, { useCallback, useRef } from "react";
import { FiArrowLeft, FiMail, FiUser, FiLock } from "react-icons/fi";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import api from "../../services/api";
import {
  Container,
  Content,
  Background,
  AnimationFormContainer,
} from "./styles";
import Button from "../../components/Buttons";
import Input from "../../components/Inputs";
import getValidationErrors from "../../utils/getValidationsErrors";
import { useToast } from "../../context/ToastContext";

interface FormData {
  name: string;
  email: string;
  password: string;
}
const SignUp: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const FormRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite email válido"),
          password: Yup.string().min(6, "Senha com pelo menos 6 dígitos"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post("users", data);
        history.push("/");
        addToast({
          type: "sucess",
          title: "Cadastro realizado com Sucesso.",
          description: "Você pode logar agora no GoBarber.",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          FormRef.current?.setErrors(errors);
          // return descomente para retirar os Toast quando é apenas erro de validação
        }
        addToast({
          type: "error",
          title: "Erro no Cadastro.",
          description:
            "Ocorreu um erro ao fazer o seu Cadastro.Por favor tente novamente.",
        });
      }
    },
    [addToast, history]
  );
  return (
    <Container>
      <Background />
      <Content>
        <AnimationFormContainer>
          <img src={logo} alt="GoBarber" />
          <Form
            initialData={{ name: "" }}
            ref={FormRef}
            onSubmit={handleSubmit}
          >
            <h1>Faça seu login</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="Email" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="senha"
            />
            <Button type="submit">Cadastrar</Button>
          </Form>
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationFormContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
