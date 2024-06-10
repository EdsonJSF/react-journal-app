import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";
import { startGoogleSingInThunk } from "../../../src/store/auth/authThunks";
import { notAuthenticatedState } from "../../fixtures/authFixtures";

const mockStartGoogleSingIn = jest.fn();

jest.mock("../../../src/store/auth/authThunks", () => ({
  startGoogleSingInThunk: () => mockStartGoogleSingIn,
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
});
