import React from "react";

interface AuthContextValues {
  authInfo: AuthInfo;
  isAuthenticated: boolean;
  setAuthInfo: (authInfo: AuthInfo) => void;
  isAdmin: boolean;
}

export const AuthContext = React.createContext<undefined | AuthContextValues>(
  undefined
);

const Provider = AuthContext.Provider;

interface Props {
  children: React.ReactNode;
}

interface UserData {
  role: "USER" | "ADMIN";
}

interface AuthInfo {
  userData: UserData | null;
}

export function AuthProvider({ children }: Props) {
  const [authInfo, setAuthInfo] = React.useState<AuthInfo>({
    userData: null,
  });

  const isAuthenticated = authInfo.userData !== null;

  const isAdmin = authInfo.userData?.role === "ADMIN";

  function handleAuthInfo(authInfo: AuthInfo) {
    setAuthInfo(authInfo);
  }

  return (
    <Provider
      value={{
        authInfo,
        isAuthenticated,
        setAuthInfo: handleAuthInfo,
        isAdmin,
      }}
    >
      {children}
    </Provider>
  );
}

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    //handle
    throw new Error("useAuthContext should be used within an AuthProvider");
  }
  return context;
}
