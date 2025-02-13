const { getSessionUserData, updateSessionUserData } = require('@src/app/utils/session-data')
const {
    storageDispositivo,
} = require('../../dispositivos/dispositivos.storage')
const { esp32Emit } = require('../../socket/socket.emit')
const { storageValvulaSolenoide } = require('../valvula-solenoide/valvula-solenoide.storage')
const { storageSensorPresenca } = require('./sensor-presenca.storage')

const getSensorPresencaData = async (req, res) => {
    const { userId } = getSessionUserData(req)
    const { deviceId } = req?.body || {}

    const dispositivosData = await storageDispositivo.find(userId, deviceId)

    return res.send(dispositivosData)
}

const updateSensorPresenca = async (req, res) => {
    const { userId } = getSessionUserData(req)
    const { status, deviceId } = req.body

    const dispositivosData = await storageDispositivo.find(userId, deviceId)

    const [dispositivos] = dispositivosData?.dispositivos || []

    const { macId } = dispositivos || {}

    const sensorPresencaData = await storageSensorPresenca.upsert(macId, status)

    const { estado } = sensorPresencaData || {}

    if (estado === true) {
        await storageValvulaSolenoide.upsert(
            macId,
            false,
        )
    }


    const estadoEsp32 = await esp32Emit.mudarEstados(macId, estado, false)

    console.log('estadoEsp32 ----> ', estadoEsp32)

    const userDataWithDevices = await updateSessionUserData(req)

    return res.send({ ...userDataWithDevices, estadoEsp32 })
}

const insertSensorPresenca = async (req, res) => {
    const { userId } = getSessionUserData(req)
    const { status, deviceId } = req.body

    const dispositivosData = await storageDispositivo.find(userId, deviceId)

    const [dispositivos] = dispositivosData?.dispositivos || []

    const { macId } = dispositivos || {}

    let sensorPresencaData = {}

    if (macId) {
        sensorPresencaData = await storageSensorPresenca.insert(
            userId,
            deviceId,
            status,
        )
    }

    return res.send(sensorPresencaData)
}

module.exports = {
    getSensorPresencaData,
    updateSensorPresenca,
    insertSensorPresenca,
}
