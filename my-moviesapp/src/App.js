import "./App.css";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Signup from "./Components/Signup";
import Moviedetail from "./Components/Moviedetail";


function App() {
  
  return (
    <div className="App">
      {/* <Authusecontext.Provider value={{setUsrpassword,usrpassword}}> */}
        <BrowserRouter basename="/ReactJSTask">
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/dashboardmovie" element={<Dashboard />}>
              <Route path='/dashboardmovie/:id' element={<Moviedetail />} />
            </Route>
            {/* <Route path="/dashboardmovie/:id" element={<Moviedetail />}></Route> */}
          </Routes>
        </BrowserRouter>
      {/* </Authusecontext.Provider> */}

      {/* <Login />

      <Signup /> */}
    </div>
  );
}

export default App;
