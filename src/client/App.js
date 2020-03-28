import '@babel/polyfill'
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import loadable from '@loadable/component'
import './main.css'
import {
  BrowserRouter,
  StaticRouter,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// REDUX DEV-TOOLS EXTENSION PLUGIN
import { composeWithDevTools } from 'redux-devtools-extension'
import reducers from '../client/store/reducers/index'
import { aLoadData } from './letters/A'

const A = loadable(() => import('./letters/A'))
const B = loadable(() => import('./letters/B'))
const C = loadable(() => import(/* webpackPreload: true */ './letters/C'))
const D = loadable(() => import(/* webpackPrefetch: true */ './letters/D'))
const E = loadable(() => import('./letters/E'), { ssr: false })
const X = loadable(props => import(`./letters/${props.letter}`))
const Sub = loadable(props => import(`./letters/${props.letter}/file`))
const RootSub = loadable(props => import(`./${props.letter}/file`))

// Load the 'G' component twice: once in SSR and once fully client-side
const GClient = loadable(() => import('./letters/G'), {
  ssr: false,
  fallback: <span className="loading-state">ssr: false - Loading...</span>,
})
const GServer = loadable(() => import('./letters/G'), {
  ssr: true,
  fallback: <span className="loading-state">ssr: true - Loading...</span>,
})

// We keep some references to prevent uglify remove
A.C = C
A.D = D

const Moment = loadable.lib(() => import('moment'))

// const App = () => (
//   <div>
//     <A />
//     <br />
//     <B />
//     <br />
//     <X letter="A" />
//     <br />
//     <X letter="F" />
//     <br />
//     <E />
//     <br />
//     <GClient prefix="ssr: false" />
//     <br />
//     <GServer prefix="ssr: true" />
//     <br />
//     <Sub letter="Z" />
//     <br />
//     <RootSub letter="Y" />
//     <br />
//     <Moment>{moment => moment().format('HH:mm')}</Moment>
//   </div>
// )

let App
export const routes = [
  {
    path: '/a',
    component: A,
    loadData: aLoadData,
  },
  {
    path: '/b',
    component: B,
  },
]

if (typeof window !== 'undefined') {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunk)),
  )
  App = props => (
    <Provider store={store}>
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
    </Provider>
  )
} else {
  App = props => (
    <Provider store={props.store}>
      <StaticRouter context={{}} location={props.location}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>
  )
}

export default App
