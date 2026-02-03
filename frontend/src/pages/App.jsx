import '@styles/App.css'
import { Routes, Route } from "react-router";
import Home from '@pages/Home.jsx'
import Login from '@pages/user/Login.jsx'
import SignUp from '@pages/user/SignUp.jsx';
import UserEdit from '@pages/user/UserEdit.jsx';
import UserView from '@pages/user/UserView.jsx';
import BoardView from '@pages/board/BoardView.jsx';
import BoardEdit from '@pages/board/BoardEdit.jsx';
import BoardAdd from '@pages/board/BoardAdd.jsx';
import Nav from '@pages/nav.jsx'

function App() {
  const paths = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/useredit", element: <UserEdit /> },
    { path: "/userview", element: <UserView /> },
    { path: "/boardview/:id", element: <BoardView /> },
    { path: "/boardedit/:id", element: <BoardEdit /> },
    { path: "/boardadd", element: <BoardAdd /> },
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
