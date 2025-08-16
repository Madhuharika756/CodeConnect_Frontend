import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Body from "./components/Body"
import Profile from "./components/Profile"
import ConnectedUsers from "./components/ConnectedUsers"
import RequestReceived from "./components/RequestsReceived"
import SignUp from "./components/SignUp"

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body/>}>
              <Route path="/feed" element={<Feed/>}/>
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/connections" element={<ConnectedUsers/>}/>
              <Route path="/requests"  element={<RequestReceived/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
