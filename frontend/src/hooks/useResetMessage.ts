import { useEffect, useRef } from "react";
import { useAppDispatch } from "./useTypedRedux";
import { resetMessage as resetMessagePhoto } from "../slices/photoSlice";
import { resetMessage as resetMessageUser } from "../slices/userSlice";

export function useResetMessage(resetType: "photo" | "user") {
  const dispatch = useAppDispatch();
  const messageTimeout = useRef<number | null>(null);

  const resetMessage = (callback?: () => void) => {
    if (messageTimeout.current) {
      clearTimeout(messageTimeout.current);
      messageTimeout.current = null;
    }

    messageTimeout.current = window.setTimeout(() => {
      dispatch(
        resetType === "photo" ? resetMessagePhoto() : resetMessageUser()
      );
      callback?.();
      messageTimeout.current = null;
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (messageTimeout.current) {
        clearTimeout(messageTimeout.current);
        dispatch(
          resetType === "photo" ? resetMessagePhoto() : resetMessageUser()
        );
      }
    };
  }, [dispatch, resetType]);

  return {
    resetMessage,
  };
}
