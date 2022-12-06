import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router";
import api from "../../api";
import { UserContext } from "../../context/UserContext";
import { IUserRegister } from "../../interfaces/IUser.interface";
import NotiStack from "../common/NotiStack";

interface IEditUser extends IUserRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showRePassword: boolean;
}

const Profile = () => {
  const { listUser, reload, setReload } = useContext(UserContext);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("userInfo") as string);
  const [checked, setChecked] = React.useState(false);
  const [userUpdate, setUserUpdate] = useState<IEditUser>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    showRePassword: false,
  });
  const [openNoti, setOpenNoti] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const {
    handleSubmit,
    control,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful, isSubmitted },
  } = useForm<IUserRegister>();

  useEffect(() => {
    setUserUpdate({
      name: user?.name,
      email: user?.email,
      password: user?.password || null,
      confirmPassword: user?.confirmPassword || null,
      showPassword: false,
      showRePassword: false,
    });
  }, [listUser]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...user, password: "", confirmPassword: "" });
    }
  },[reload]);

  // console.log(userUpdate);

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setUserUpdate({
      ...userUpdate,
      [name]: value,
    });
  };

  const handleCloseNoti = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenNoti(false);
  };

  const handleClickShowPassword = () => {
    setUserUpdate({
      ...userUpdate,
      showPassword: !userUpdate.showPassword,
    });
  };

  const handleClickShowRePassword = () => {
    setUserUpdate({
      ...userUpdate,
      showRePassword: !userUpdate.showRePassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IUserRegister> = (data) => {
    // if (checked && userUpdate.password !== userUpdate.confirmPassword) {
    //   setValue("Error: Confirm password is not match");
    //   setOpenNoti(true);
    //   return;
    // }
    // console.log(data);
    if (!checked && data.name != user.name) {
      api
        .patch(`users/${user.id}`, {
          ...data,
          password: null,
          updatedBy: user.id,
        })
        .then((response) => {
          setValue("Success: Update user successfully.");
          setOpenNoti(true);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setReload(!reload);
        })
        .catch((err) => {
          setValue("Error: " + err.response.data.msg);
          setOpenNoti(true);
        });
    } else if (!checked && data.name == user.name) {
      setValue("Success: No changes were made");
      setOpenNoti(true);
    } else if (checked) {
      api
        .patch(`users/${user.id}`, {
          ...data,
          updatedBy: user.id,
        })
        .then((response) => {
          setValue("Success: Update user successfully.");
          setOpenNoti(true);
          localStorage.setItem("userInfo", JSON.stringify(response.data));
          setReload(!reload);
        })
        .catch((err) => {
          setValue("Error: " + err.response.data.msg);
          setOpenNoti(true);
        });
    }
  };

  return (
    <div className="max-w-[80%] m-auto">
      <h1 className="text-3xl">User Details Management</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 max-w-[500px] m-auto"
      >
        <div>
          <Controller
            name="name"
            control={control}
            defaultValue={user.name}
            rules={{
              required: "This field is required",
              pattern: {
                value: /^.{6,}$/,
                message: "Minimium length is 6",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                id="username"
                fullWidth
                autoFocus
                label="Username"
                type="text"
                value={value}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              ></TextField>
            )}
          />
          {/* <TextField
            id="name"
            name="name"
            label="Name"
            required
            fullWidth
            onChange={handleChange}
            defaultValue={user.name}
          ></TextField> */}
        </div>
        <div className="mt-6">
          <Controller
            name="email"
            control={control}
            defaultValue={user.email}
            rules={{
              required: "This field is required",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                id="email"
                fullWidth
                label="Email Address"
                type="text"
                value={value}
                disabled
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              ></TextField>
            )}
          />
          {/* <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            onChange={handleChange}
            defaultValue={user.email}
            disabled
          ></TextField> */}
        </div>
        <div className="mt-6">
          <FormControlLabel
            control={<Switch checked={checked} onChange={handleCheckChange} />}
            label="Change Password?"
            id="changePass"
            name="changePass"
          />
        </div>

        {checked && (
          <div>
            <div className="mt-6">
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
                    name="password"
                    label="New Password"
                    type={userUpdate.showPassword ? "text" : "password"}
                    fullWidth
                    inputRef={ref}
                    onChange={(e) => {
                      onChange(e);
                      // handleChange("password");
                      setUserUpdate({
                        ...userUpdate,
                        ["password"]: value as string,
                      });
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
                            {userUpdate.showPassword ? (
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

              {/* <TextField
                id="password"
                name="password"
                label="New Password"
                type={userUpdate.showPassword ? "text" : "password"}
                fullWidth
                required
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {userUpdate.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField> */}
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
                      userUpdate.password === userUpdate.confirmPassword ||
                      "Password is not match"
                    );
                  },
                }}
                render={({
                  field: { onChange, value, ref },
                  fieldState: { error },
                }) => (
                  <TextField
                    id="confirmPassword"
                    label="Confirm Password"
                    sx={{ width: "100%" }}
                    type={userUpdate.showRePassword ? "text" : "password"}
                    value={value}
                    inputRef={ref}
                    onChange={(e) => {
                      onChange(e);
                      // handleChange("repass");
                      setUserUpdate({
                        ...userUpdate,
                        confirmPassword: value as string,
                      });
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
                            {userUpdate.showRePassword ? (
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
              {/* <TextField
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm New Password"
                type={userUpdate.showRePassword ? "text" : "password"}
                fullWidth
                required
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle cpass visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {userUpdate.showRePassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              ></TextField> */}
            </div>
          </div>
        )}

        <Button variant="contained" type="submit" sx={{ marginTop: "1.5rem" }}>
          Save
        </Button>
      </form>
      <NotiStack
        open={openNoti}
        value={value}
        onClose={handleCloseNoti}
      ></NotiStack>
    </div>
  );
};

export default Profile;
