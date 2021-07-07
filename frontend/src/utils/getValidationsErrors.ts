import { ValidationError } from "yup";

// Inteface que é dinâmica para qualquer formulario, podendo ter quantos campos que quiser
// [key : string] -> significa que pode ser qualquer chave(name, password, email), desde q seja string
interface Error {
  [key: string]: string;
}
export default function getValidationErrors(err: ValidationError): Error {
  const ValidationsError: Error = {};
  // percorre todos os erros no inner(é um vetor)
  err.inner.forEach((error) => {
    if (error.path === undefined)
      return {};
     ValidationsError[error.path] = error.message;    
  });

  return ValidationsError;
}
