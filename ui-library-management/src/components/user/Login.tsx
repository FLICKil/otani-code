import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import banner from "../.././assets/banner.png";
import api from "../../api";
import { useNavigate } from "react-router";
import { IUserLogin } from "../../interfaces/IUser.interface";
import { UserContext } from "../../context/UserContext";

interface State extends IUserLogin {
  email: string;
  password: string;
  showPassword: boolean;
}

const AdminLogin = () => {
  const { userInfo, setUserInfo , isLogged, setIsLogged } = useContext(UserContext);

  const [err, setErr] = useState<string>("");

  const navigate = useNavigate();

  const [user, setUser] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IUserLogin>();

  const onSubmit: SubmitHandler<IUserLogin> = async (data) => {
    await api
      .post("users/login", data)
      .then((res) => {

        delete res.data.createdAt;
        delete res.data.updatedAt;
        delete res.data.createdBy;
        delete res.data.updatedBy;
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("isLogged", "true");
        // localStorage.setItem("isAdmin", "true");
        setIsLogged(true);
        // setIsAdmin(!isAdmin);
        setUserInfo(res.data);
        // console.log(adminInfo);
        // console.log(localStorage.getItem("adminInfo.name"),localStorage.getItem("isAdmin"),localStorage.getItem("isLogged"));
        navigate("/Dashboard");
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  };

  return (
    <>
      <section className="flex justify-center relative max-w-[80%] m-auto">
        <div className="h-[300px]">
          <img src={banner} alt="banner" className="h-full object-cover" />
        </div>
        <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white/50 text-[2rem] font-black p-8">
          <p>Welcome to the Library</p>
        </div>
      </section>
      <section className="max-w-fit m-auto mt-8 flex flex-col items-center border border-[#dee2e6] p-12 rounded-md">
        <h1 className="uppercase font-semibold text-2xl">User Login Detail</h1>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* <label htmlFor="username">
              Username <></>
            </label> */}
            <Controller
              name="email"
              control={control}
              defaultValue={user.email}
              rules={{
                required: "This field is required",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className="w-full"
                  id="email"
                  label="Email"
                  type="text"
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                ></TextField>
              )}
            />
          </div>
          <div className="mt-6">
            {/* <label htmlFor="password">Password</label> */}
            <Controller
              name="password"
              control={control}
              defaultValue={user.password}
              rules={{
                required: "This field is required",
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  className="w-full"
                  id="password"
                  label="Password"
                  type={user.showPassword ? "text" : "password"}
                  value={value}
                  onChange={onChange}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {user.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              )}
            />

            {/* <input type="password" id="password" {...register("password", {required: "This field is required", pattern : {value : /^.{6,}$/, message : "Minimium length is 6"}})}/>
            {errors.password?.message  && <p>{errors.password?.message as string}</p>} */}
          </div>
          <div className="mt-6">
            {err && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                <strong>{err}</strong>
              </Alert>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outlined" type="submit">
              Sign in
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
