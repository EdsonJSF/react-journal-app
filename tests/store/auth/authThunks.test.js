import { checkingCredentials } from "../../../src/store/auth";
import { checkAuthenticationThunk } from "../../../src/store/auth/authThunks";

jest.mock("../../../src/firebase/provider.js");

describe("Test on authThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("should call checkCredentials", async () => {
    await checkAuthenticationThunk()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });
});
