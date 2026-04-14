import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode
} from "react";

/* User Type */

type User = {
  name: string;
  email: string;
};

/* Context Type */

type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

/* Create Context */

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined
  );

/* Provider Props */

type Props = {
  children: ReactNode;
};

/* Provider */

export const AuthProvider = ({
  children
}: Props) => {

  const [user, setUser] =
    useState<User | null>(null);

  /* Load stored user */

  useEffect(() => {

    if (typeof window !== "undefined") {

      const savedUser =
        localStorage.getItem("curexUser");

      if (savedUser) {

        setUser(JSON.parse(savedUser));

      }

    }

  }, []);

  /* Login */

  const login = (userData: User) => {

    localStorage.setItem(
      "curexUser",
      JSON.stringify(userData)
    );

    setUser(userData);

  };

  /* Logout */

  const logout = () => {

    localStorage.removeItem("curexUser");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{
        user,
        login,
        logout
      }}
    >

      {children}

    </AuthContext.Provider>

  );

};

/* Hook */

export const useAuth = () => {

  const context =
    useContext(AuthContext);

  if (!context) {

    throw new Error(
      "useAuth must be used inside AuthProvider"
    );

  }

  return context;

};