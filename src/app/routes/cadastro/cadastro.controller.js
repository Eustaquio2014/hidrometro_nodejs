const catchAsync = require('@src/app/middlewares/catchAsync')
const { Prisma } = require('@config/db/prisma')
const { ResponseDTO } = require('@src/app/dto/response.dto')
const { UsuarioRawDTO } = require('@src/app/dto/usuario.dto')
const { capitalizeFirstLetter } = require('@src/app/utils/string-capitalize.utils')
const { encryptPassword } = require('@src/app/utils/password-cipher.utils')

const renderizar = catchAsync(async (req, res) => res.render('cadastro', { message: 'helloow' }))

const cadastrar = catchAsync(async (req, res) => {
    console.log('aaaaaaaa')
    const {
        nome, email, senha, sobrenome, nomeDispositivo, macDispositivo,
    } = req.body

    await Prisma.usuario.create({
        data: {
            nome,
            sobrenome,
            email,
            senha: await encryptPassword(senha),
            dispositivos: {
                create: {
                    macId: macDispositivo,
                    nome: nomeDispositivo || undefined,
                },
            },
            privilegios: {
                create: {
                    tipo: 'Usuario',
                },
            },
        },
    })
        .then((result) => res.send(new ResponseDTO({ redirect: true, message: 'Sucesso! Sua conta foi criada.', data: UsuarioRawDTO(result) })))
        .catch((error) => {
            console.log('Erro de cadastro', error)

            return res.send(new ResponseDTO({ message: `${capitalizeFirstLetter(error.meta?.target[0])} já cadastrado` }))
        })
    // error.meta.target[0] //email
    // prismaError[error.code] //UniqueConstraintViolation
})

module.exports.cadastroController = {
    cadastrar,
    renderizar,
}
