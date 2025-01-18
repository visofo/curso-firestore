import { terminal } from "terminal-kit";
import TerminalUtil from "../utils/TerminalUtil";
import { salvarUsuario } from "../basico/salvarUsuario";
import consultarUsuarioPorEmail from "../basico/consultarUsuarioPorEmail";
import alterarUsuario from "../basico/alterarUsuario";
import consultarUsuarios from "../basico/consultarUsuarios";
import excluirUsuario from "../basico/excluirUsuario";

export async function menuBasico() {
    TerminalUtil.titulo('Cadastro Básico (CRUD)')

    const resposta = await terminal.singleColumnMenu([
        '1. Adicionar Usuário',
        '2. Consultar Usuário por Email',
        '3. Alterar Usuário',
        '4. Consultar Usuários',
        '5. Excluir Usuários',
        'Voltar'
    ]).promise

    switch(resposta.selectedIndex) {
        case 0: await salvarUsuario(); break;
        case 1: await consultarUsuarioPorEmail(); break;
        case 2: await alterarUsuario(); break;
        case 3: await consultarUsuarios(); break;
        case 4: await excluirUsuario(); break;
        default: return
    }

    await menuBasico()
}