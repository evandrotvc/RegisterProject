import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import signUpBackgroundImg from "../../assets/sign-up-background.png";

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; /** CENTRALIZA TODOS OBJETOS , mt útil */

  width: 100%;
  max-width: 700px;
`;
// responsavel por aplicar anumação no container
const AppearFromRight = keyframes`
    from {
        opacity: 0;
        -webkit-transform: translateX(50%);
        
    }
    to{
        opacity: 1;
        -webkit-transform: translateX(0);
        
    }
`;
export const AnimationFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  place-content: center; /** CENTRALIZA TODOS OBJETOS , mt útil */
  animation: ${AppearFromRight} 1s; /**Animação do container */
  form {
    margin: 50px 0;
    width: 340px;
    text-align: center;

    .container {
        display: grid;
        grid-template-columns: 50% 50%;

        .containerA{
            margin-right: 10px;
        }
    }

    #step1{
        animation: ${AppearFromRight} 1s; /**Animação do container */
    }
    #step2{
        display: none;
        animation: ${AppearFromRight} 1s; /**Animação do container */
    }

    h1 {
      margin-bottom: 14px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }

    .icon{
        cursor: pointer;
        border: 1px solid blueviolet;
        border-radius: 50%;
        width: auto;
        background-color: blueviolet;
        margin-top: 5px;
        &:hover{
                opacity: 0.3;
        }
    }
  }

  > a {
    /** Estilização que afeta apenas aqueles "a" daquele nivel(Content dentro do caso), por exemplo esta estilização não afetará no "a" dentro do form   */
    color: #ff9000;
    display: block;
    text-decoration: none;
    transition: color 0.2s;

    display: flex;
    align-items: center; /** Alinha o texto do A com o ícone na mesma linha horizontal */

    svg {
      margin-right: 16px;
    }

    &:hover {
      color: ${shade(0.2, "#ff9000")};
    }
  }

  .remove{
    cursor: pointer;
    border: 1px solid black;
    margin-top: 10px;
    border-radius: 4px;
    color: #312e38;
    background-color: #ff9000;
    padding: 4px;
    transition: background-color 0.2s;
    &:hover {
            background: ${shade(0.2, '#ff9000')};
        }
  }
`;
export const Background = styled.div`
  flex: 1; /** Faz com que ocupe todo espaço - 700px */
  background: url(${signUpBackgroundImg}) no-repeat center;
  background-size: cover; /** Faz com que a imagem ocupe todo espaço disponível pra ela */
`;
