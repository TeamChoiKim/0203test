import '@styles/App.css'
import { Routes, Route } from "react-router";
import Home from '@pages/Home.jsx'
import Login from '@pages/Login.jsx'
import SignUp from './SignUp';
import Nav from '@pages/nav.jsx'

function App() {
  const paths = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
  ]


  return (
    <>
    <Nav />
    <Routes>
      {paths?.map((v, i) => <Route key={i} path={v.path} element={v.element} />)}
    </Routes>
    </>
  )
}

export default App
