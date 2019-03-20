module.exports = {

    string(obj) {
        return 'string' === typeof obj
    },

    array(obj) {
        return Array.isArray(obj)
    },

    function(obj) {
        return 'function' === typeof obj
    },

    object(obj) {
        return 'object' === typeof obj
    }
}
