const { getSessionUserData, updateSessionUserData } = require('@src/app/utils/session-data')
const {
    storageDispositivo,
} = require('../../dispositivos/dispositivos.storage')
const { esp32Emit } = require('../../socket/socket.emit')
const { storageValvulaSolenoide } = require('./valvula-solenoide.storage')

const getReleData = async (req, res) => {
    const { userId } = getSessionUserData(req)
    const { deviceId } = req?.body || {}

    const dispositivosData = await storageDispositivo.find(userId, deviceId)

    return res.send(dispositivosData)
}

const updateReleStatus = async (req, res) => {
    const { userId } = getSessionUserData(req)
    const { status, deviceId } = req.body

    const dispositivosData = await storageDispositivo.find(userId, deviceId)

    const [dispositivos] = dispositivosData?.dispositivos || []

    const { macId } = dispositivos || {}

    const valvulaSolenoideData = await storageValvulaSolenoide.upsert(
        macId,
        status,
    )

    const { estado } = valvulaSolenoideData || {}
    const estadoEsp32 = await esp32Emit.mudarEstadoValvulaSolenoide(macId, estado)
    const userDataWithDevices = await updateSessionUserData(req)

    return res.send({ ...userDataWithDevices, estadoEsp32 })
}

const insertValvulaSolenoide = async (req, res) => {
    const { userId } = getSessionUserData(req)
    const { status, deviceId } = req.body

    const dispositivosData = await storageDispositivo.find(userId, deviceId)

    const [dispositivos] = dispositivosData?.dispositivos || []

    const { macId } = dispositivos || {}

    let insertData = {}

    if (macId) {
        insertData = await storageValvulaSolenoide.insert(macId, status)
    }

    return res.send(insertData)
}

module.exports = {
    getReleData,
    updateReleStatus,
    insertValvulaSolenoide,
}
