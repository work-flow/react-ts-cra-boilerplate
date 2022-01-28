import React, { Suspense } from 'react'
import { Route, Switch, HashRouter } from 'react-router-dom';
import './App.css'
import routes from './router'

function App() {
  return (
    <HashRouter>
      <Suspense fallback={
        <div className="loading">
          loading...
        </div>
      }>
        <Switch>
          {
            routes && routes.map((route: any, index: number) => {
              const { path, component } = route
              return <Route 
                path={path} 
                component={component} 
                key={index}
              />
            })
          }
        </Switch>
      </Suspense>
    </HashRouter>
  )
}

export default App
