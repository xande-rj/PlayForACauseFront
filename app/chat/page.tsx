"use client";

import {
  ChakraProvider,
  CSSReset,
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Input,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client"; // Importe o tipo Socket do socket.io-client
import Link from "next/link";
import { useUrlParams } from "./url/getUrl";
export interface Message {
  id: string;
  name: string;
  text: string;
}


export interface User {
  id: string;
  nome: string;
}

export default function Chat() {
  const { nome }:any = useUrlParams();


  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);
  useEffect(() => {
    const newSocket = io("http://localhost:3333", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("Conectado ao servidor Socket.IO");
      newSocket.emit("joinChat", { nome });
    });

    newSocket.on("chatMessage", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("userJoined", (user) => {
      console.log(`${nome} entrou na sala`);
      setUsers((prevUsers) => [...prevUsers, user]);
    });

    newSocket.on("disconnect", (reason) => {
      console.log("Desconectado do servidor Socket.IO", reason);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Erro de conexão com o servidor Socket.IO", error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [nome]);

  const handleSendMessage = () => {
    if (socket && inputMessage.trim() !== "") {
      socket.emit("chatMessage", { name: nome, text: inputMessage });
      setInputMessage("");
    }
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <Flex height="100vh">
        <VStack width="25%" bg="gray.200" p={4} align="stretch">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Usuários na Sala
          </Text>
          {users.map((user, index) => (
            <Text key={index}>
              {user.nome}
              </Text>
          ))}
          <Link href="/">
            <Button colorScheme="green" size="lg">
              Voltar
            </Button>
          </Link>
        </VStack>

        <Box flex="1" p={4} bg="white">
          <Box mb={4}>
            <Text fontWeight="bold">{nome}</Text>
            <Text>
              {messages.map((message, index) => (
                <div key={index}>
                  <strong>{message.name}:</strong> {message.text}
                </div>
              ))}
            </Text>
          </Box>
          <HStack mt={4}>
            <Input
              placeholder="Digite sua mensagem..."
              flex="1"
              mr={2}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <Button colorScheme="teal" onClick={handleSendMessage}>
              Enviar
            </Button>
          </HStack>
        </Box>
      </Flex>
    </ChakraProvider>
  );
}
