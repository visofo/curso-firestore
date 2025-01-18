import { terminal } from "terminal-kit";
import TerminalUtil from "../utils/TerminalUtil";
import { menuBasico } from "./MenuBasico";
import { menuConsultas } from "./MenuConsultas";

export async function menuPrincipal() {
    TerminalUtil.titulo('Curso de Firestore')

    const resposta = await terminal.singleColumnMenu([
        '1. Cadastro Básico',
        '2. Consultas',
        'Sair'
    ]).promise

    switch(resposta.selectedIndex) {
        case 0: await menuBasico(); break;
        case 1: await menuConsultas(); break;
        default: process.exit()
    }

    menuPrincipal()
}