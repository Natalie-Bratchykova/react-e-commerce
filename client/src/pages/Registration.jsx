import React, { useContext } from "react";
import FormComponent from "../components/FormComponent";
import { LOGIN_ROUTE } from "../utils/const";
import { Context } from "../main";

function Registration(props) {
  const { user } = useContext(Context);
  const registerFunction = async (email, password, role) => {
    return await user.registration(email, password, role);
  };
  
  return (
    <FormComponent
      buttonText={"Registration"}
      formText={"Have account?"}
      formLink={LOGIN_ROUTE}
      formTextAction={"Login"}
      buttonFunction={registerFunction}
    />
  );
}

export default Registration;
