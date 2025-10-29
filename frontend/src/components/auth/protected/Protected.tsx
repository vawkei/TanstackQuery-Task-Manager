import type { FC, ReactNode } from "react";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<{ children: ReactNode }> = (props) => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
  const { isLoggedIn } = useTypedSelector((state) => state.auth);
  console.log(isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={"/auth-form"} replace />;
  } else {
    return props.children;
  }
};


export const ShowWhenLoggedIn: FC<{ children: ReactNode }> = (props) => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  if (isLoggedIn) {
    return props.children;
  }else{
    return null
  }
};
export const ShowWhenLoggedOut:FC<{children:ReactNode}> = (props) => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { isLoggedIn } = useTypedSelector((state) => state.auth);

  if (!isLoggedIn) {
    return props.children;
  }else{
    return null
  }
};
