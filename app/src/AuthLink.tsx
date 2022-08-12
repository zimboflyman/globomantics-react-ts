import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "./context/AuthProvider";
import { gql, useMutation } from "@apollo/client";

const signOutMutation = gql`
  mutation signOutUser {
    signOut {
      user {
        id
        email
      }
    }
  }
`;

interface Props {
  children: React.ReactNode;
}
//simplified type check
// export const AuthLink = ({ children }: { children: React.ReactNode }) => {
export const AuthLink = ({ children }: Props) => {
  const [signOutUser] = useMutation(signOutMutation);
  const contextValues = useAuthContext();
  const history = useHistory();

  const { isAuthenticated, setAuthInfo } = contextValues;

  const handleSignOut = async () => {
    await signOutUser();
    setAuthInfo({ userData: null });
    history.push("/auth/sign-in");
  };

  return isAuthenticated ? (
    <Link onClick={handleSignOut} to="#">
      Sign Out
    </Link>
  ) : (
    <Link to="/auth/sign-in">{children}</Link>
  );
};
