import {
  loginWithEmailPassword,
  logoutFirebase,
  registerUserWithEmailPassword,
  singInWithGoogle,
} from "../../../src/firebase/provider";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkAuthenticationThunk,
  startCreatingUserWithEmailPassword,
  startGoogleSingInThunk,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../src/store/auth/authThunks";
import { clearNotes } from "../../../src/store/journal/journalSlice";
import { testUser } from "../../fixtures/authFixtures";

jest.mock("../../../src/firebase/provider.js");

describe("Test on authThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should call checkCredentials", async () => {
    await checkAuthenticationThunk()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSingInThunk should call heckingCredentials and login", async () => {
    const loginData = { ok: true, ...testUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingInThunk()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSingInThunk should call heckingCredentials and loginout", async () => {
    const loginData = { ok: false, errorMessage: "An error" };
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSingInThunk()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("should call startCreatingUserWithEmailPassword", async () => {
    const { displayName, email } = testUser;
    const formData = { displayName, email, password: "123465" };
    const loginData = { ...testUser, ok: true };

    await registerUserWithEmailPassword.mockResolvedValue(loginData);
    await startCreatingUserWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("should call startLoginWithEmailPassword", async () => {
    const formData = { email: testUser.email, password: "123456" };
    const loginData = { ...testUser, ok: true };

    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("should call startLogout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(logout({ errorMessage: null }));
    expect(dispatch).toHaveBeenCalledWith(clearNotes());
  });
});
