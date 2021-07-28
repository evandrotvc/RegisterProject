import styled, { keyframes } from "styled-components";
import { shade } from "polished";
import signInBackgroundImg from "../../assets/image3.jpeg";

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
const AppearFromLeft = keyframes`
    from {
        opacity: 0;
        -webkit-transform: translateX(-50%); /** WebKit para funcionar no chrome */
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
  animation: ${AppearFromLeft} 1s; /**Animação do container */
  form {
    margin: 30px 0;
    width: 340px;
    text-align: center;

    h1 {
      margin-bottom: 24px;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 12px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, "#f4ede8")};
      }
    }

    input{
      height: 40%;
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


  .button_oauth{
    display: flex;
    cursor: pointer;
    button{
      
      width: 40%;
      height: 70%;
      margin-left: 4px;
    }
  }
`;

export const Background = styled.div`
  flex: 1; /** Faz com que ocupe todo espaço - 700px */
  background: url(${signInBackgroundImg}) no-repeat center;
  background-size: cover; /** Faz com que a imagem ocupe todo espaço disponível pra ela */
`;
