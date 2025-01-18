import { terminal } from 'terminal-kit'

export default class TerminalUtil {
    static titulo(titulo: string) {
        terminal.clear()
        terminal.magenta(`${titulo}\n`)
        terminal.magenta(`${'-'.repeat(titulo.length)}\n`)
    }

    static async campoRequerido(texto: string, valorPadrao: string = ''): Promise<string> {
        terminal.yellow(`\n${texto}: `)
        const valor = await terminal.inputField({
            default: valorPadrao,
        }).promise

        if (valor) return valor
        return TerminalUtil.campoRequerido(texto)
    }

    static async opcoes(texto: string, opcoes: string[]): Promise<[number, string]> {
        terminal.yellow(`\n${texto}`)
        const resposta = await terminal.singleLineMenu(opcoes).promise
        return [resposta.selectedIndex, resposta.selectedText]
    }

    static async confirmacao(texto: string): Promise<boolean> {
        terminal.yellow(`\n${texto}`)
        const resposta = await terminal.singleLineMenu(['1. Sim', '2. Não']).promise
        return resposta.selectedIndex === 0
    }

    static mensagem(texto: string, novaLinha: boolean = true) {
        terminal.white(`${novaLinha ? '\n' : ''}${texto}`)
    }

    static info(texto: string, novaLinha: boolean = true) {
        terminal.cyan(`${novaLinha ? '\n' : ''}${texto}`)
    }

    static sucesso(texto: string, novaLinha: boolean = true) {
        terminal.green(`${novaLinha ? '\n' : ''}${texto}`)
    }

    static advertencia(texto: string, novaLinha: boolean = true) {
        terminal.yellow(`${novaLinha ? '\n' : ''}${texto}`)
    }

    static erro(texto: string, novaLinha: boolean = true) {
        terminal.red(`${novaLinha ? '\n' : ''}${texto}`)
    }

    static linhaEmBranco() {
        terminal.white('\n')
    }

    static async esperarEnter(): Promise<void> {
        terminal.white('\nPressione ENTER para continuar...')
        await terminal.inputField({ echo: false }).promise
    }
}
