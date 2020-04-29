# koa-contrib-pathstringstartswith

a koa middleware, call an user defined middleware if ctx.path path string starts with a give prefix

This is a replacement for `koa-mount`.

## How it works

It accept two params, `path prefix`, `middleware`.
If the app's ctx.path starts with `path prefix`, then
call the `middleware`.

It do so by a simple string compare.
Chart below shows its behavior.

ctx.path | prefix | call middleware (Y/N)
-        | -      | -
/        |  /api   | N
/api     |  /api   | Y
/api/    |  /api   | Y
/api     | /api/   | N
/api/    | /api/   | Y
/api/v1  | /api/   | Y
/api/v1  | /api/v  | Y
/api/v2  | /api/v2 | Y
/api/v2.0 | /api/v2 | Y
/api/v21  | /api/v2 | Y
/images   | /image   | Y
/images/flower   | /image/   | Y

## Usage

If you just want a simple starts with compare, use it.
Otherwise use `koa-contrib-pathstartswith` instead.

Install via npm or yarn.

```
# for npm
npm i --save koa-contrib-startswith
# for yarn
yarn add koa-contrib-startswith
```

Use as a Koa middleware in your app.

```
// import it
const startsWith = require('koa-contrib-startswith')

// if ctx.path starts with `api/v1`, then call myMiddleware1
app.use(startsWith('/api/v1', myMiddleware1))

// if ctx.path starts with `api/v2`, then call myMiddleware2
app.use(startsWith('/api/v2', myMiddleware2))
```

## Compare to `koa-mount`

- This koa middleware just call your user-defined middlewares according
the `ctx.path`'s prefix, it does not re-write `ctx.path`, so the path
your middleware get is as is.
- This middleware do not mount Koa application.
- It's simple and easy to use.

## LICENSE

[The MIT License](LICENSE).
