import {useEffect} from "react";

import Cookies from "js-cookie";
import {usePostData} from "../../../common/hooks/api/usePost";
import {
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../../validation/auth";
import {Link as RouterLink} from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    // Make API call to authenticate user and get JWT token
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const res = await usePostData("/auth/login", data);

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
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
          <TextField
            inputProps={{...register("email")}}
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
            required
            fullWidth
            type="email"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            inputProps={{...register("password")}}
            error={!!errors.password}
            helperText={errors.password?.message}
            margin="normal"
            required
            fullWidth
            type="password"
            id="password"
            name="password"
            label="Password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
