import React, { createContext, useState } from "react";

const Authusecontext = createContext();

function ContextAuth({child}) {
    
  const [usrpassword,setUsrpassword] = useState([]);

  return(
    <>
      <Authusecontext.Provider value={{setUsrpassword,usrpassword}}>
        {child}
      </Authusecontext.Provider>
    </>
  );
}

export default ContextAuth;
