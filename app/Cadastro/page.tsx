'use client';

import React from 'react';
import { ChakraProvider, CSSReset, Box, Flex, FormControl, FormLabel, Input, Button, Link } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import z from 'zod';

function formatarDataParaString(dataObj: Date) {
 const ano = dataObj.getFullYear();
 const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
 const dia = String(dataObj.getDate()).padStart(2, '0');
 const horas = String(dataObj.getHours()).padStart(2, '0');
 const minutos = String(dataObj.getMinutes()).padStart(2, '0');
 const segundos = String(dataObj.getSeconds()).padStart(2, '0');

 const dataFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:${segundos}.000Z`;

 return dataFormatada;
}

const CadastroSchema = z.object({
 email: z.string().email(),
 senha: z.string().min(3).max(20),
 nome: z.string().min(3).max(20),
});

type CadastroSchemaType = z.infer<typeof CadastroSchema>;

const Cadastro: React.FC = () => {
  

 const { register, handleSubmit, formState: { errors } } = useForm<CadastroSchemaType>({
    resolver: zodResolver(CadastroSchema),
 });

 const onSubmit = (data: any) => {
    const dataAtual = new Date();
    const dataFormatada = formatarDataParaString(dataAtual);
    const apiUrl = `playforacauseapi-production.up.railway.app/usuarios`;
    const dadosEnviar = {
      createdAt: dataFormatada,
      email: data.email,
      nome: data.nome,
      senha: data.senha
    };
    axios
      .post(apiUrl, dadosEnviar, {
        headers: {
          'Content-Type': 'application/json', // Indica que você está enviando JSON
          // Adicione outros cabeçalhos, se necessário
        },
      })
      .then((response) => {
        // O conteúdo da resposta estará disponível em response.data
        console.log('Resposta da API:', response.data);
        window.location.href =`/`;
      })
      .catch((error) => {
        window.location.href =`/Cadastro`
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" p={8} rounded={8} bg="white">
            <FormControl mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Digite seu email" {...register('email')} />
              {errors.email && <span>{errors.email.message}</span>}
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Nome</FormLabel>
              <Input type="text" placeholder="Digite seu nome" {...register('nome')} />
              {errors.nome && <span>{errors.nome.message}</span>}
            </FormControl>

            <FormControl mb={4} isRequired>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="Digite sua senha" {...register('senha')} />
              {errors.senha && <span>{errors.senha.message}</span>}
            </FormControl>

            <Button type="submit" colorScheme="blue" width="full">
              Cadastrar
            </Button>

            <Link mt={4} alignSelf="center" href="/">
              Já possui uma conta? Faça login!
            </Link>
            
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
 );
};

export default Cadastro;