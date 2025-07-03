import { useEffect, useState } from "react";
import { useAppSelector } from "./useTypedRedux";

export const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [auth, setAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      setAuth(true);
    } else {
      setAuth(false);
    }
    setLoading(false);
  }, [user]);

  return { auth, loading };
};
