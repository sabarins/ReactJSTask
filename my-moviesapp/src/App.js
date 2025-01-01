import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import ContextAuth from "./Components/ContextAuth";
import { useState, createContext } from "react";
import Signup from "./Components/Signup";

export const Authusecontext = createContext();

function App() {

  const [usrpassword,setUsrpassword] = useState([]);
  
  return (
    <div className="App">
      <Authusecontext.Provider value={{setUsrpassword,usrpassword}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </Authusecontext.Provider>

      {/* <Login />

      <Signup /> */}
    </div>
  );
}

export default App;
