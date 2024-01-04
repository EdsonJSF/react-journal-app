import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Typography, TextField, Link } from "@mui/material";

import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks";

const registerForm = {
  displayName: "Example Mailinator",
  email: "example@mailinator.com",
  password: "123456",
};

const registerFormValidations = {
  displayName: [(val) => val.length >= 1, "Invalid name"],
  email: [(val) => val.includes("@"), "Invalid email"],
  password: [(val) => val.length >= 6, "Password length most be 6 or greater"],
};

export const RegisterPage = () => {
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
    console.log(formState);
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit}>
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
              error={displayNameValid}
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
              error={emailValid}
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
              error={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
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
