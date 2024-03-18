export const templateResetPassword = (name: string, code: string, urlFront = 'MYPROJECT') => {
    return `
    <span style="font-family: Arial, Helvetica, sans-serif; max-width: 500px; margin: 0 auto;">
        <h1 style="text-align: center;">Resetar Senha</h1>
        <p style="text-align: center;">Olá ${name},</p>
        <p style="text-align: center;">Acesse o link abaixo para alterar sua senha:</p>
        <a href="${urlFront}/auth/reset-password/${code}" style="text-align:center;display: block;margin:0 auto;background: #ff7707;width: 120px;padding: 6px;border-radius: 5px;color: white;">
            Nova senha
        </a>
        <p style="text-align: center;">Caso não tenha solicitado a alteração de senha, desconsidere este e-mail.</p>
        <p style="text-align: center;">Atenciosamente, MYPROJECT</p>
    </span>
    `;
}