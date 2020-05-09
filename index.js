/**
 * call a middleware if path prefix string matched
 * @param {string} prefix a prefix string to match
 * @param {function(object, function)} downStream a koa middleware, if prefix matched, the middleware
 * will be called
 * 
 * @returns {function} Koa middleware
 */
function _pathStringStartsWith(prefix, downStream) {
    if (typeof prefix !== 'string') {
        throw TypeError('prefix must be string')
    }

    if (typeof downStream !== 'function') {
        throw TypeError('downStream (next) must be middleware function')
    }

    const middleware = async (ctx, upstream) => {
        const matched = ctx.path && ctx.path.startsWith(prefix)
        if (matched) {
            await downStream(ctx, () => {})
        }
        return upstream()
    }
    middleware.name = 'koa-contrib-pathstringstartswith'
    return middleware
}

module.exports = _pathStringStartsWith
