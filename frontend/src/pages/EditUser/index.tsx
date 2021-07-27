import React, { useCallback, useRef, useEffect } from "react";
import { FiArrowLeft, FiMail, FiUser, FiArrowRight, FiInfo } from "react-icons/fi";
import {FaAddressBook, FaBuilding , FaFile, FaGlobeAfrica} from 'react-icons/fa'
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
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  cpf?: string,
  pis?: string,
  endereco?: AddresDTO
}

interface UserDTO{
  name: string;
  email: string;
  cpf?: string,
  pis?: string,
}

interface AddresDTO{
    pais?: string,
    estado?: string,
    municipio?: string,
    cep?: string,
    rua?: string,
    numero?: string,
    complemento?: string,
}

interface ResponseDTO{
  user: UserDTO,
  address?: AddresDTO
}

interface RequestUser {
  info : any
}


const EditUser: React.FC = () => {
  const { addToast } = useToast();
  const history = useHistory();
  const FormRef = useRef<FormHandles>(null);
  const [Step , SetStep] = useState(0);
  const [data_user , Setdata_user] = useState<FormData>();  

  const handleSubmit = useCallback(
    async (data: FormData) => {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("Digite email válido"),
          cpf: Yup.number()
            .required("cpf obrigatório"),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        
        // call api
        await api.put("/users/edit", data, {withCredentials:true});
        history.push("/dashboard");
        addToast({
          type: "sucess",
          title: "Edição realizada com Sucesso.",
          description: ".",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          FormRef.current?.setErrors(errors);
          // return descomente para retirar os Toast quando é apenas erro de validação
        }
        addToast({
          type: "error",
          title: "Erro ao Editar usuário.",
          description:
            "Ocorreu um erro ao fazer a edição do usuário.Por favor tente novamente.",
        });
      }
    },
    [addToast, history]
  );


  useEffect(() => {
    async function LoadData(){
      let data_storage = localStorage.getItem("@GoBarber:user");

      if(data_storage){
        data_storage = JSON.parse(data_storage);
        let user : RequestUser = {
          info: data_storage
        }

        const response = await api.get(`/users/${user.info.email}`,{withCredentials:true})        

        const resp : ResponseDTO = response.data;
        debugger
        // quando não existe o usuário no banco, é pq entrou pelo oauth
        if(!resp){
          Setdata_user({
            name: user.info.name,
            email: user.info.email,
          });
          return;
        }

        Setdata_user({
          name: resp.user.name,
          email: resp.user.email,
          pis: resp.user.pis,
          cpf: resp.user.cpf,
          endereco: resp.address
        });
        
      }
    }

    LoadData();
  }, [])

  useEffect(() => {
    
  }, [data_user])

  const HandleNextStep = () =>{
    const step_aux = Step +1;
    SetStep(step_aux);
  }
  const HandleBackStep = () =>{
      if(Step >= 0){
        const step_aux = Step -1;
        SetStep(step_aux);
      }
    
  }
  const HandleRemoveUser = async () =>{
    const response = await api.delete(`/users/${data_user?.email}`, {withCredentials:true});
}
  return (
    <Container>
      <Background />
      <Content>
        <AnimationFormContainer>
          <img src={logo} alt="GoBarber" />
          <button onClick = {HandleRemoveUser} className = "remove">Remover usuário</button>
          <Form
            initialData={{ name: data_user?.name, 
              email:data_user?.email,
              pis: data_user?.pis,
              cpf: data_user?.cpf,
              pais: data_user?.endereco?.pais,
              cep: data_user?.endereco?.cep,
              municio: data_user?.endereco?.municipio,
              rua: data_user?.endereco?.rua,
              complemento: data_user?.endereco?.complemento,
              estado: data_user?.endereco?.estado,
              numero: data_user?.endereco?.numero,

             }}
            ref={FormRef}
            onSubmit={handleSubmit}
          >
            <h1>Perfil do usuário</h1>             
            <div id = "step1" style={{display: Step === 0 ? 'block' : 'none' }}>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="Email" />
                <Input name="cpf" icon={FiInfo} placeholder="CPF" />
                <Input name="pis" icon={FaFile} placeholder="PIS" />
                <FiArrowRight className= "icon" size= {20} color= {"white"} onClick= {HandleNextStep} style={{display: Step === 0 ? 'block' : 'none' }}  />
            </div>

            <div id  = "step2" style={{display: Step === 1 ? 'block' : 'none' }}>
                <Input name="pais" icon={FaGlobeAfrica} placeholder="País" />
                <Input name="municipio" icon={FaBuilding} placeholder="Município" />
                <Input name="complemento" icon={FaAddressBook} placeholder="Complemento" />
                <div className = "container">
                    <div className = "containerA">
                        <Input name="estado" icon={FiMail} placeholder="Estado" />
                        <Input name="cep" icon={FiMail} placeholder="CEP" />
                    </div>

                    <div className = "containerB">
                        <Input name="rua" icon={FiMail} placeholder="Rua" />
                        <Input name="numero" icon={FiMail} placeholder="Número" />
                    </div>
                </div>
                <FiArrowLeft className= "icon" size= {20} color= {"white"} onClick= {HandleBackStep} style={{display: Step === 1 ? 'block' : 'none' }}/>
                <Button type="submit">Atualizar</Button>
            </div>
          </Form>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar para Dashboard
          </Link>
        </AnimationFormContainer>
      </Content>
    </Container>
  );
};

export default EditUser;
