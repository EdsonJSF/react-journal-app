import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Grid,
  Typography,
  TextField,
  Link,
} from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";
import {
  startCreatingUserWithEmailPassword,
  status as authStatus,
} from "../../store/auth";

const registerForm = {
  displayName: "",
  email: "",
  password: "",
};

const registerFormValidations = {
  displayName: [(val) => val.length >= 1, "Invalid name"],
  email: [(val) => val.includes("@"), "Invalid email"],
  password: [(val) => val.length >= 6, "Password length most be 6 or greater"],
};

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.authReducer);
  const isCheckingAuthentication = useMemo(
    () => status === authStatus[0],
    [status]
  );

  const {
    displayName,
    email,
    password,
    displayNameValid,
    emailValid,
    passwordValid,
    isFormValid,
    formState,
    handleInputChange,
  } = useForm(registerForm, registerFormValidations);

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid || isCheckingAuthentication) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={handleSubmit}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Full name"
              type="text"
              placeholder="Jhon Doe"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={handleInputChange}
              error={displayNameValid && formSubmited}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@web.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
              error={emailValid && formSubmited}
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="password"
              fullWidth
              name="password"
              value={password}
              onChange={handleInputChange}
              error={passwordValid && formSubmited}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item display={errorMessage ? "" : "none"} xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                disabled={isCheckingAuthentication}
                type="submit"
                variant="contained"
                fullWidth
              >
                register
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>You have an account ?</Typography>
          <Link component={RouterLink} color="inherit" to="/auth/login">
            Login
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
