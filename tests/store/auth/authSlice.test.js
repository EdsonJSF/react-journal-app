import {
  authSlice,
  checkingCredentials,
  login,
  logout,
  status,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
  testUser,
} from "../../fixtures/authFixtures";

describe("Test on authSlice", () => {
  test("should return the initial state", () => {
    expect(authSlice.name).toBe("auth");

    const state = authSlice.reducer(initialState, {});

    expect(state).toEqual(initialState);
  });

  test("should do the authentication", () => {
    const state = authSlice.reducer(initialState, login(testUser));

    expect(state).toEqual(authenticatedState);
  });

  test("should do the logout without arguments", () => {
    const state = authSlice.reducer(authenticatedState, logout());

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: undefined,
    });
  });

  test("should do the logout with arguments", () => {
    const errorMessage = "An error";

    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage,
    });
  });

  test(`should change the status`, () => {
    const state = authSlice.reducer(initialState, checkingCredentials());

    expect(state.status).toBe(status[0]);
  });
});
