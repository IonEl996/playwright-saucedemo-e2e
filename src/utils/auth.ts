import { PO } from "../fixtures/pageObjects.ts";


interface LoginCredentials {
  username: string | null;
  password: string | null;
}

export const loginWithUser = async (
  po: PO,
  credentials: LoginCredentials,
): Promise<void> => {
  if (credentials.username !== null) {
    await po.loginPg.usernameInputField.click();
    await po.loginPg.usernameInputField.fill(credentials.username);
  }
  if (credentials.password !== null) {
    await po.loginPg.passwordInputField.click();
    await po.loginPg.passwordInputField.fill(credentials.password);
  }
  await po.loginPg.loginButton.click();
};
