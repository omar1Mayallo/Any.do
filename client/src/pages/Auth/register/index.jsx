import {
  Container,
  Avatar,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {registerSchema} from "../../../validation/auth";
import {Link as RouterLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {register as registerService} from "../../../services/auth/authServices";

function Register() {
  const dispatch = useDispatch();
  const {isMutation} = useSelector((state) => state.auth);

  // RegisterValidation
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  // handleRegisterSubmit
  const onSubmit = (data) => {
    dispatch(registerService(data));
  };

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
        {/* Form_Header */}
        <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        {/* Form_Body */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{mt: 1}}
        >
          {/* Form_Input_Username */}
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
          {/* Form_Input_Email */}
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
          {/* Form_Input_Password */}
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
          {/* Form_Input_ConfirmPassword */}
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
          {/* Submit_Form_Button */}
          <Button
            type="submit"
            loading={isMutation.loading}
            disabled={isMutation.loading}
            startIcon={
              isMutation.loading && (
                <CircularProgress size={15} color="inherit" />
              )
            }
            variant="contained"
            sx={{mt: 3, mb: 2}}
            fullWidth
          >
            <span>Register</span>
          </Button>

          {/* SignIn_Link */}
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
