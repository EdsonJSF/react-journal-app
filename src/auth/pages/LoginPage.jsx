import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Button, Grid, Typography, TextField, Link } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from "../layout/AuthLayout";

import { useForm } from "../../hooks";
import {
  checkAuthenticationThunk,
  startGoogleSingInThunk,
} from "../../store/auth";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { email, password, handleInputChange } = useForm({
    email: "example@mailinator.com",
    password: "123456",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(checkAuthenticationThunk());
  };

  const hancleGoogleSingIn = () => {
    console.log("hancleGoogleSingIn");
    dispatch(startGoogleSingInThunk());
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Email"
              type="email"
              placeholder="example@web.com"
              fullWidth
              name="email"
              value={email}
              onChange={handleInputChange}
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
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={12} sm={6}>
              <Button type="submit" variant="contained" fullWidth>
                login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                type="button"
                variant="contained"
                fullWidth
                onClick={hancleGoogleSingIn}
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" justifyContent="end">
          <Link component={RouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
