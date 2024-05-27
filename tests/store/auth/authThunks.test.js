import { singInWithGoogle } from "../../../src/firebase/provider";
import { checkingCredentials, login, logout } from "../../../src/store/auth";
import {
  checkAuthenticationThunk,
  startGoogleSingInThunk,
} from "../../../src/store/auth/authThunks";
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
});
