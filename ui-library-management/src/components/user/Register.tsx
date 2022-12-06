import {
  IconButton,
  InputAdornment,
  TextField,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import banner from "../.././assets/banner.png";
import api from "../../api";
import { useNavigate } from "react-router";
import { IUserRegister } from "../../interfaces/IUser.interface";
import { UserContext } from "../../context/UserContext";
import { AdminContext } from "../../context/AdminContext";

interface State extends IUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showRePassword: boolean;
}

const AdminLogin = () => {
  const { userInfo, setUserInfo, reload, setReload } = useContext(UserContext);
  const { isLogged, setIsLogged } = useContext(AdminContext);
  const [err, setErr] = useState<string>("");

  const navigate = useNavigate();

  const [user, setUser] = useState<State>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showRePassword: false,
  });

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };

  const handleClickShowRePassword = () => {
    setUser({
      ...user,
      showRePassword: !user.showRePassword,
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
    reset,
    formState,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<IUserRegister>();

  const onSubmit: SubmitHandler<IUserRegister> = async (data) => {
    await api
      .post("users/register", data)
      .then((res) => {
        delete res.data.createdAt;
        delete res.data.updatedAt;
        delete res.data.createdBy;
        delete res.data.updatedBy;
        setReload(!reload);
        setUserInfo(res.data);
        setErr("Sign up Successfully");
        // navigate("/Dashboard");
      })
      .catch((err) => {
        setErr(err.response.data.msg);
      });
  };

  useEffect(() => {
    // if (isSubmitted) {

    // }
    if (isSubmitSuccessful) {
      reset({ ...user, password: "", confirmPassword: "" });
      setTimeout(() => setErr(""), 2000);
    }
  }, [reload]);

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
      <section className="md:max-w-[50%] lg:max-w-[40%] xl:max-w-[30%] 2xl:max-w-[25%] max-w-[80%] m-auto mt-8 flex flex-col items-center border border-[#dee2e6] p-12 rounded-md">
        <h1 className="uppercase font-semibold text-2xl">
          User Register Detail
        </h1>
        <form className="mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* <label htmlFor="username">
              Username <></>
            </label> */}
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^.{6,}$/,
                  message: "Minimium length is 6",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="username"
                  sx={{ width: "100%" }}
                  label="Username"
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
              defaultValue=""
              rules={{
                required: "This field is required",
                pattern: {
                  value:
                    /^(?=.*?[#?!@$%^&*-])(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
                  message:
                    "Password minimium length must be 8, contains at least 1 capitalize letter, 1 number and special characters",
                },
              }}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  id="password"
                  label="Password"
                  sx={{ width: "100%" }}
                  type={user.showPassword ? "text" : "password"}
                  inputRef={ref}
                  onChange={(e) => {
                    onChange(e);
                    // handleChange("password");
                    setUser({ ...user, ["password"]: value as string });
                  }}
                  value={value}
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
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
                validate: () => {
                  return (
                    user.password === user.confirmPassword ||
                    "Password is not match"
                  );
                },
              }}
              render={({
                field: { onChange, value, ref },
                fieldState: { error },
              }) => (
                <TextField
                  id="repass"
                  label="Confirm Password"
                  sx={{ width: "100%" }}
                  type={user.showRePassword ? "text" : "password"}
                  value={value}
                  inputRef={ref}
                  onChange={(e) => {
                    onChange(e);
                    // handleChange("repass");
                    setUser({ ...user, confirmPassword: value as string });
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle cpass visibility"
                          onClick={handleClickShowRePassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {user.showRePassword ? (
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
          </div>
          <div className="mt-6">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "This field is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Please enter a valid email address",
                },
              }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  id="email"
                  label="Email Address"
                  sx={{ width: "100%" }}
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
            {err && (
              <Alert
                severity={err == "Sign up Successfully" ? "success" : "error"}
              >
                <AlertTitle>
                  {err == "Sign up Successfully" ? "Success" : "Error"}
                </AlertTitle>
                <strong>{err}</strong>
              </Alert>
            )}
          </div>
          <div className="mt-6 flex justify-center">
            <Button variant="outlined" type="submit">
              Sign up
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AdminLogin;
