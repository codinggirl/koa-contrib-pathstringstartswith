const startsWith = require('./')

test('pkg import should ok', () => {
    expect(startsWith).toBeDefined()
})

test('pkg should be a fn', () => {
    expect(typeof startsWith).toEqual('function')
})

test('call pkg should return a middleware fn', () => {
    const middleware = startsWith('/', () => { })
    expect(middleware).toBeDefined()
    expect(typeof middleware).toEqual('function')
})

test('returned middleware should has a name', () => {
    const middleware = startsWith('/', () => { })
    expect(middleware.name).toBeDefined()
    expect(typeof middleware.name).toEqual('string')
    expect(middleware.name.length).toBeGreaterThan(0)
})

test('call by a empty path shoud not throw', () => {
    expect(() => startsWith('', () => { })).not.toThrow()
})

test('call by a undefined path shoud throw', () => {
    expect(() => startsWith(undefined, () => { })).toThrow()
})

test('call by a non-string path shoud throw', () => {
    expect(() => startsWith(undefined, () => { })).toThrow()
    expect(() => startsWith(1, () => { })).toThrow()
    expect(() => startsWith(NaN, () => { })).toThrow()
    expect(() => startsWith(null, () => { })).toThrow()
    expect(() => startsWith({}, () => { })).toThrow()
    expect(() => startsWith([], () => { })).toThrow()
    expect(() => startsWith(() => { }, () => { })).toThrow()
})

test('call by a non-fn middelware shoud throw', () => {
    expect(() => startsWith('', 1)).toThrow()
    expect(() => startsWith('', 1.0)).toThrow()
    expect(() => startsWith('', NaN)).toThrow()
    expect(() => startsWith('', Infinity)).toThrow()
    expect(() => startsWith('', null)).toThrow()
    expect(() => startsWith('', {})).toThrow()
    expect(() => startsWith('', [])).toThrow()
    expect(() => startsWith('', '1')).toThrow()
    expect(() => startsWith('', '/image')).toThrow()
    expect(() => startsWith('', undefined)).toThrow()
})

test('upstream & downstream should be called if matched', async () => {
    const upstream = jest.fn().mockImplementation(() => {
    })
    const downstream = jest.fn().mockImplementation(() => {
    })

    const middleware = startsWith('/api', downstream)
    
    const ctx = {
        path: '/api/v1'
    }

    await middleware(ctx, upstream)

    expect(downstream).toBeCalled()
    expect(upstream).toBeCalled()
})

test('if not matched, upstream should be called, downstream should not be called', async () => {
    const upstream = jest.fn().mockImplementation(() => {
    })
    const downstream = jest.fn().mockImplementation(() => {
    })

    const middleware = startsWith('/images', downstream)
    
    const ctx = {
        path: '/api/v1'
    }

    await middleware(ctx, upstream)

    expect(downstream).not.toBeCalled()
    expect(upstream).toBeCalled()
})

test('if no ctx.path supplied, upstream should be called, downstream should not be called', async () => {
    const upstream = jest.fn().mockImplementation(() => {
    })
    const downstream = jest.fn().mockImplementation(() => {
    })

    const middleware = startsWith('/images', downstream)
    
    const ctx = {
        url: '/api/v1'
    }

    await middleware(ctx, upstream)

    expect(downstream).not.toBeCalled()
    expect(upstream).toBeCalled()
})
