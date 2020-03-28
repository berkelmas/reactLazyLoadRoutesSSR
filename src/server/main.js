import '@babel/polyfill'
import path from 'path'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ChunkExtractor } from '@loadable/server'
import { matchRoutes } from 'react-router-config'
import { routes } from '../client/App'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from '../client/store/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'

const app = express()

app.use(express.static(path.join(__dirname, '../../public')))

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const { default: webpackConfig } = require('../../webpack.config.babel')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpack = require('webpack')
  /* eslint-enable global-require, import/no-extraneous-dependencies */

  const compiler = webpack(webpackConfig)

  app.use(
    webpackDevMiddleware(compiler, {
      logLevel: 'silent',
      publicPath: '/dist/web',
      writeToDisk(filePath) {
        return /dist\/node\//.test(filePath) || /loadable-stats/.test(filePath)
      },
    }),
  )
}

const nodeStats = path.resolve(
  __dirname,
  '../../public/dist/node/loadable-stats.json',
)

const webStats = path.resolve(
  __dirname,
  '../../public/dist/web/loadable-stats.json',
)

app.get('*', (req, res) => {
  const routesMatched = matchRoutes(routes, req.path)
  const store = createStore(reducers, applyMiddleware(thunk))

  const promises = routesMatched.map(({ route }) => {
    return route.loadData ? route.loadData(store.dispatch) : null
  })
  console.log(promises)

  Promise.all(promises).then(() => {
    const nodeExtractor = new ChunkExtractor({ statsFile: nodeStats })
    const { default: App } = nodeExtractor.requireEntrypoint()

    const webExtractor = new ChunkExtractor({ statsFile: webStats })
    const jsx = webExtractor.collectChunks(
      <App store={store} location={req.path} />,
    )

    const html = renderToString(jsx)

    res.set('content-type', 'text/html')
    res.send(`
        <!DOCTYPE html>
        <html>
          <head>
          ${webExtractor.getLinkTags()}
          ${webExtractor.getStyleTags()}
          </head>
          <body>
            <div id="main">${html}</div>
            ${webExtractor.getScriptTags()}
          </body>
        </html>
      `)
  })
})

// eslint-disable-next-line no-console
app.listen(9000, () => console.log('Server started http://localhost:9000'))
