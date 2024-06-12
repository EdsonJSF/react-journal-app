import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSingInThunk } from "../../../src/store/auth/authThunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/authThunks", () => ({
  startGoogleSingInThunk: () => mockStartGoogleSingIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
  },
  preloadedState: {
    authReducer: notAuthenticatedState,
  },
});

describe("Test on loginPage", () => {
  beforeEach(() => jest.clearAllMocks());

  test("should show the component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("login").length).toBeGreaterThanOrEqual(1);
  });

  test("should call handleGoogleSingIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleSingInBtn = screen.getByLabelText("google-sing-in-btn");

    fireEvent.click(googleSingInBtn);

    expect(mockStartGoogleSingIn).toHaveBeenCalled();
  });

  test("should call startLoginWithEmailPassword", () => {
    const email = "test@test.test";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailFieldEl = screen.getByRole("textbox", { name: "Email" });
    fireEvent.change(emailFieldEl, { target: { name: "email", value: email } });

    const passwordFieldEl = screen.getByTestId("password");
    fireEvent.change(passwordFieldEl, {
      target: { name: "password", value: password },
    });

    const loginFormEl = screen.getByLabelText("login-form");
    fireEvent.submit(loginFormEl);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email,
      password,
    });
  });
});
