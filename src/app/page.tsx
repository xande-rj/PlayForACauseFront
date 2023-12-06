"use client" 
import React from 'react';
import App from './form/formularioLogin';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from './chat/page';
import Cadastro from './formularioCadastro/page';


export default function Page(){
    return(
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}/>
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/chat/:username"  element={<Chat/>}/>
        </Routes>
    </BrowserRouter>
        
    )
}