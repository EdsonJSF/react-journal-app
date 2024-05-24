import { status } from "../../src/store/auth/authSlice";

export const initialState = {
  status: status[2],
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const testUser = {
  uid: "123ABC",
  email: "test@test.test",
  displayName: "test user",
  photoURL: "https://test.jpg",
};

export const authenticatedState = {
  ...testUser,
  status: status[1],
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: status[2],
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};
