import { Button, Input } from "@material-tailwind/react";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const ManagerLogin = () => {
  const { user, loginUser } = useContext(AuthContext);
  return (
    <div className="flex items-center justify-center h-screen">
      {!user && (
        <div className="flex-col gap-2 pt-10 pb-80 text-center">
          <form
            action=""
            onSubmit={loginUser}
            className="flex flex-col items-center"
          >
            <div className="w-72 mb-10">
              <Input
                label={"username"}
                variant={"static"}
                name={"username"}
                className={"mb-100"}
              />
            </div>
            <div className="w-72">
              <Input
                label={"password"}
                variant={"static"}
                name={"password"}
                type="password"
                className={"mt-100"}
              />
            </div>
            <Button className="mt-5 mr-52" type={"submit"}>
              Login
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};
export default ManagerLogin;
