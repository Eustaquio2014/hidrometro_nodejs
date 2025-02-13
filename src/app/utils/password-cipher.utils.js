const bcrypt = require('bcryptjs')

const saltRounds = 10

// new ApiError(err.message);
module.exports.encryptPassword = async (password) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                reject(err)
            }
            resolve(hash)
        })
    })

    return hashedPassword
}

module.exports.isPasswordDecrypter = async (password, hash) => {
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, result) => {
            if (err) {
                reject(err)
            }

            resolve(result)
        })
    })

    return hashedPassword
}
