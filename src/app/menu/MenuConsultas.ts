import { terminal } from "terminal-kit"
import TerminalUtil from "../utils/TerminalUtil"
import consultarUsuariosPorNome from "../consultas/consultarUsuariosPorNome"
import consultarUsuariosPorData from "../consultas/consultarUsuariosPorData"
import consultarUsuariosPorTag from "../consultas/consultarUsuariosPorTag"
import consultarUsuariosPorTexto from "../consultas/consultarUsuariosPorTexto"

export async function menuConsultas() {
    TerminalUtil.titulo('Consultas')

    const resposta = await terminal.singleColumnMenu([
        '1. Consultar Usuário por Nome',
        '2. Consultar Usuário por Data',
        '3. Consultar Usuário por Tag',
        '4. Consultar Usuário por Texto',
        'Voltar'
    ]).promise

    switch(resposta.selectedIndex) {
        case 0: await consultarUsuariosPorNome(); break;
        case 1: await consultarUsuariosPorData(); break;
        case 2: await consultarUsuariosPorTag(); break;
        case 3: await consultarUsuariosPorTexto(); break;
        default: return
    }

    await menuConsultas()
}