'use client'

import { ChakraProvider, CSSReset, Box, Flex, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {  FunctionComponent } from 'react'
import { useForm } from "react-hook-form";
import { Outlet, Link, useNavigate  } from 'react-router-dom';
import { z } from "zod";

function formatarDataParaString(data:any) {
  const dataObj = new Date(data);

  const ano = dataObj.getFullYear();
  const mes = String(dataObj.getMonth() + 1).padStart(2, '0'); // Mês é base 0, então adicionamos 1 e ajustamos o formato
  const dia = String(dataObj.getDate()).padStart(2, '0');
  const horas = String(dataObj.getHours()).padStart(2, '0');
  const minutos = String(dataObj.getMinutes()).padStart(2, '0');
  const segundos = String(dataObj.getSeconds()).padStart(2, '0');

  const dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}.000Z`;

  return dataFormatada;
}


interface Cadastrado {
  email :string;
  nome :string;
  senha :string;
  onSubmit:()=>void ;
  handleSubmit:()=>void
  
}
const CadastroSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(3).max(20),
  nome: z.string().min(3).max(20),
});

type CadastroSchemaType = z.infer<typeof CadastroSchema>;


const Cadastro: FunctionComponent <Cadastrado>= ()=>{
  const navigate = useNavigate();

  const {register,handleSubmit,formState: { errors },} = useForm<CadastroSchemaType>({
    resolver: zodResolver(CadastroSchema),
  });


  const onSubmit = (data: object|any) =>{
    console.log(data.email)
    console.log(data.nome)
    console.log(data.senha)
    const dataAtual = new Date();
    const dataFormatada = formatarDataParaString(dataAtual);
    const apiUrl = `http://localhost:3001/usuarios/`;
    const dadosEnviar = {
      createdAt:dataFormatada,
      email: data.email,
      nome: data.nome,
      senha: data.senha
    };
    axios
      .post(apiUrl,dadosEnviar, {
        headers: {
          'Content-Type': 'application/json', // Indica que você está enviando JSON
          // Adicione outros cabeçalhos, se necessário
        },
      })
      .then((response) => {
        // O conteúdo da resposta estará disponível em response.data
        console.log('Resposta da API:', response.data);
        navigate(`/`);
      })
      .catch((error) => {
        navigate(`/cadastro`)
        console.error("Erro na requisição:", error);
      });
  }

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        bg="black"
      >        
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Flex direction="column" p={8} rounded={8} bg="white">
          <FormControl mb={4} isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="email" placeholder="Digite seu email"{...register('email')} />
            {errors.email && <span>{errors.email.message}</span>}

          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Nome</FormLabel>
            <Input type="text" placeholder="Digite seu nome" {...register('nome')}/>
            {errors.nome && <span>{errors.nome.message}</span>}

          </FormControl>

          <FormControl mb={4} isRequired>
            <FormLabel>Senha</FormLabel>
            <Input type="password" placeholder="Digite sua senha"{...register('senha')} />
            {errors.senha && <span>{errors.senha.message}</span>}

          </FormControl>

          <Button
            colorScheme="teal"
            mt={4}
            bg="black"
            color="white"
            _hover={{ bg: "green.300", color: "black" }}
            type='submit'

          >
            Cadastrar
          </Button>
          <Link to="/">Voltar</Link>
          <Outlet />
        </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default Cadastro;
