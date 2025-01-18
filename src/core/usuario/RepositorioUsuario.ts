import Usuario from './Usuario'

export default interface RepositorioUsuario {
    salvar(usuario: Usuario): Promise<void>
    excluir(usuario: Usuario): Promise<void>
    consultar(): Promise<Usuario[]>
    consultarPorEmail(email: string): Promise<Usuario | null>
    consultarPorNome(nome: string): Promise<Usuario[]>
    consultarPorAnoMesCadastro(ano: number, mes: number): Promise<Usuario[]>
    consultarPorTag(tag: string): Promise<Usuario[]>
    consultarPorTexto(texto: string): Promise<Usuario[]>
}
