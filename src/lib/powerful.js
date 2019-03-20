function PowerArray(target, extensions) {
    Object.keys(extensions).map(key => {
        Object.defineProperty(target, key, { value: extensions[key] })
    })
    return target
}

module.exports = PowerArray
