const { ResponseDTO } = require('@src/app/dto/response.dto')
const { UsuarioSessionDTO } = require('@src/app/dto/usuario.dto')
const { isPasswordDecrypter } = require('@src/app/utils/password-cipher.utils')
const { Prisma } = require('@src/config/db/prisma')

module.exports = {
    async Login(req, res) {
        const { email, senha } = req.body

        const [dadosDoBanco] = await Prisma.usuario
            .findMany({
                take: 1,
                where: {
                    email,
                },
                include: {
                    dispositivos: {
                        include: {
                            ValvulaSolenoide: true,
                            SensorPresenca: true,
                        },
                    },
                },
            })
            .then((result) => result)

        const senhaValida = await isPasswordDecrypter(
            senha,
        dadosDoBanco?.senha || '',
        )

        if (!dadosDoBanco || !senhaValida) {
            return res.send(
                new ResponseDTO({
                    status: false,
                    message: 'Credenciais inválidas',
                }),
            )
        }

        req.session.userSessionData = new UsuarioSessionDTO(dadosDoBanco)

        return res.send(new ResponseDTO({
            status: true,
            message: `${dadosDoBanco.nome} ${dadosDoBanco.sobrenome}`,
            redirect: true,
            error: null,
        }))
    },

}
