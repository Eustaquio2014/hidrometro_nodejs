module.exports.capitalizeFirstLetter = (string) => {
    if (!string) {
        return ''
    }

    return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.capitalizeEachFirstLetter = (string) => {
    if (!string) {
        return ''
    }
    const splitStr = string.toLowerCase().split(' ')

    for (let i = 0; i < splitStr.length; i += 1) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }

    // Directly return the joined string
    return splitStr.join(' ')
}
