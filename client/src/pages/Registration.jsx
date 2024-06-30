import React, { useContext } from "react";
import FormComponent from "../components/FormComponent";
import { LOGIN_ROUTE } from "../utils/const";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

function Registration(props) {
  const { user } = useContext(Context);
  const registerFunction = async (email, password, roles) => {
    console.log("roles from registration");
    console.log(roles);
    return await user.registration(email, password, roles);
  };

  return (
    <FormComponent
      buttonText={"Registration"}
      formText={"Have account?"}
      formLink={LOGIN_ROUTE}
      formTextAction={"Login"}
      buttonFunction={registerFunction}
      isRegistration={true}
    />
  );
}

export default observer(Registration);
