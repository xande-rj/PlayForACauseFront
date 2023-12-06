"use client";
import React from 'react';

import {
  ChakraProvider,
  CSSReset,
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";

import { useRouter } from 'next/router';


const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;
const Home = () => {
  const toast = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({ resolver: zodResolver(LoginSchema) });

  const onSubmit = (data: any) => {
    const apiUrl = `https://playforacauseapi-production.up.railway.app/usuarios/${data.email}/${data.password}`;
    axios
      .get(apiUrl)
      .then((response) => {
        const jsonData = response.data;
        // Redirecionamento para outra página com os dados
        window.location.href=`/chat/?nome=${jsonData.nome}`;
      })
      .catch((error) => {
        toast({
          title: "Erro no Login: Usuário ou Senha Incorretos",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        height="100vh"
        bg="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" p={100} rounded={20} bg="white">
            <FormControl mb={4} isRequired>
              <FormLabel fontSize="2xl">Email</FormLabel>{" "}
              <Input
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
              />{" "}
              {errors.email && <span>{errors.email.message}</span>}{" "}
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel fontSize="2xl">Senha</FormLabel>
              <Input
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </FormControl>
            <Button
              colorScheme="blue"
              mt={4}
              _hover={{ backgroundColor: "green" }}
              type="submit"
            >
              Enviar
            </Button>
            <FormControl>
              <FormHelperText>
                Ainda não é cadastrado?
                <Link href="/Cadastro">
                  Clique aqui
                </Link>
              </FormHelperText>
            </FormControl>
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default Home;
