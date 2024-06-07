import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { LoginPage } from "../../../src/auth/pages/LoginPage";
import { authSlice } from "../../../src/store/auth";

const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
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

    expect(screen.getAllByAltText("login").length).toBeGreaterThanOrEqual(1);
  });
});
