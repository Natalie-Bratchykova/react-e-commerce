import React, { useContext } from "react";
import FormComponent from "../components/FormComponent";
import { REGISTRATION_ROUTE, SHOP_ROUTE } from "../utils/const";
import { Context } from "../main";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const { user } = useContext(Context);
  // const navigateTo = useNavigate();
  // let data;
  const login = async (email, password) => {
   return await user.login(email, password);
  };
  

  return (
    <div>
      <FormComponent
        buttonText={"Login"}
        formText={`Don't have account yet?`}
        formLink={REGISTRATION_ROUTE}
        formTextAction={"Create account"}
        buttonFunction={login} isRegistration={false}
      />
    </div>
  );
}

export default Login;
