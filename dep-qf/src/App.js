import './App.scss';
import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const Layout = React.lazy(() => import('./Layout'))

// Pages
const Login = React.lazy(() => import('./component/login/Login'))

function App() {
  return (
    <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route exact path="/" name="Login Page" element={<Login />} />
            <Route path="*" name="Home" element={<Layout />} />
          </Routes>
        </Suspense>
      </HashRouter>
  );
}

export default App;
