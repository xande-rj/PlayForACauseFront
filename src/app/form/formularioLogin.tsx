"use client";

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
  Alert,
  useToast,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FunctionComponent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, Outlet, Link } from "react-router-dom";
import axios from "axios";
import { LoginFormSchema } from "./loginSchema";

interface Login {
  email: string;
  password: string;
  onSubmit: () => void;
  handleSubmit: () => void;
}

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(20),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

const App: FunctionComponent<Login> = () => {
  const navigate = useNavigate();
const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: any) => {
    const apiUrl = `http://localhost:3001/usuarios/${data.email}/${data.password}`;
    axios
      .get(apiUrl)
      .then((response) => {
        // O conteúdo da resposta estará disponível em response.data
        const jsonData = response.data;
        navigate(`/chat/${jsonData.nome}`);
      })
      .catch((error) => {
          toast({
            title: "Erro no Login Usuario ou Senha Incorreto ",
            status: "error",
            duration: 5000, // A duração em milissegundos
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
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" p={100} rounded={20} bg="white">
            <FormControl mb={4} isRequired>
              <FormLabel fontSize="2xl">Email</FormLabel>
              <Input
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
              />
              {errors.email && <span>{errors.email.message}</span>}
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
                Ainda nao e cadastrado?
                <Link to="/cadastro"> Clique aqui</Link>
                <Outlet />
              </FormHelperText>
            </FormControl>
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default App;
