import {useEffect, useState} from "react";

import Cookies from "js-cookie";
import {usePostData} from "../../../common/hooks/api/usePost";
import {
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../../../validation/auth";
import {Link as RouterLink} from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    // Make API call to authenticate user and get JWT token
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostData("/auth/register", data);

      // Set token to cookies to expire in 30 days
      Cookies.set("token", res.data.token, {expires: 30});

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(errors);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
          <TextField
            inputProps={{...register("username")}}
            error={!!errors.username}
            helperText={errors.username?.message}
            margin="normal"
            required
            fullWidth
            type="text"
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            inputProps={{...register("email")}}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            inputProps={{...register("password")}}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            fullWidth
            type="password"
            id="password"
            label="Password"
            name="password"
          />
          <TextField
            inputProps={{...register("confirmPassword")}}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            margin="normal"
            fullWidth
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Register
          </Button>
          <Box sx={{textAlign: "center"}}>
            <Link component={RouterLink} to="/login" variant="body2">
              {"Already have an account? Sign In"}
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
