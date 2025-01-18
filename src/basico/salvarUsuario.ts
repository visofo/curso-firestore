import TerminalUtil from "../app/utils/TerminalUtil"
import Usuario from "../core/usuario/Usuario"
import Colecao from "../firebase/db/Colecao"

export async function salvarUsuario(usuario?: Usuario): Promise<void> {
    TerminalUtil.titulo("Salvando usuário")
    
    const nome = await TerminalUtil.campoRequerido("Nome")
    const email = await TerminalUtil.campoRequerido("Email")
    await new Colecao().salvar(
        {nome, email}, 'usuarios')

    TerminalUtil.sucesso("Usuário salvo com sucesso!")
    await TerminalUtil.esperarEnter()
    // const repositorioUsuario = new RepositorioUsuarioImpl()
    // await repositorioUsuario.salvar(usuario)
}