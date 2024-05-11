import {
  ForgotPasswordRequest,
  JWTContextType,
  LoginRequest,
  OTPRequest,
  RegisterRequest,
} from "types/auth";
import {
  selectAuth,
  setLogin,
  setLogout,
  setVerifyLogin,
} from "store/reducers/jwtAuth";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useOtpMutation,
  useRegisterMutation,
} from "store/api/auth";
import Loader from "components/Loader";
import { ReactElement, createContext, useEffect, useState } from "react";
import { axiosInstance, refreshTokenPromise } from "store/api";
import { clearUser, setUser } from "store/reducers/features/user/userSlice";
import { removeRefToken, setRefToken } from "helpers";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useLazyGetMeQuery } from "store/api/user";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const setSession = (
  serviceToken?: {
    access_token: string;
    refresh_token: string;
    refresh_token_expired_at: string;
  } | null,
) => {
  if (serviceToken) {
    setRefToken(
      serviceToken?.refresh_token,
      serviceToken.refresh_token_expired_at,
    );
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${serviceToken.access_token}`;
  } else {
    removeRefToken();
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: ReactElement }) => {
  // ==============|| Hooks ||================= //
  const dispatch = useAppDispatch();
  const [loginRequest] = useLoginMutation();
  const [otpRequest] = useOtpMutation();
  const [registerRequest] = useRegisterMutation();
  const [forgotPasswordRequest] = useForgotPasswordMutation();
  const [logoutRequest] = useLogoutMutation();
  const [getMeReq, { data, isSuccess }] = useLazyGetMeQuery();
  const { isLoggedIn } = useAppSelector(selectAuth);
  const [isInitialized, setIsInitialized] = useState(
    localStorage.getItem("isInitialized") === "true" ? true : false,
  );

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    const init = async () => {
      try {
        const { token, expiredAt } = await refreshTokenPromise();
        localStorage.setItem("isInitialized", "true");
        setIsInitialized(true);
        dispatch(setLogin({ token, expiredAt }));
        dispatch(setVerifyLogin());
        getMeReq();
      } catch (e) {
        setSession(null);
        localStorage.setItem("isInitialized", "false");
        setIsInitialized(false);
        dispatch(setLogout());
        dispatch(clearUser());
      }
    };
    init();

    return () => localStorage.setItem("isInitialized", "false");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

  // ==============|| Handlers ||================= //
  const login = async (data: LoginRequest) =>
    loginRequest(data)
      .unwrap()
      .then((res: any) => {
        setSession({
          access_token: res.accessToken,
          refresh_token: res.refreshToken,
          refresh_token_expired_at: res.refreshTokenExpiresAt,
        });
        dispatch(
          setLogin({
            token: res.accessToken,
            expiredAt: res.accessTokenExpiresAt,
          }),
        );
        return res;
      });

  const otp = async (data: OTPRequest) => otpRequest(data).unwrap();

  const register = async (data: RegisterRequest) =>
    registerRequest(data)
      .unwrap()
      .then((res: any) => {
        setSession({
          access_token: res.accessToken,
          refresh_token: res.refreshToken,
          refresh_token_expired_at: res.refreshTokenExpiresAt,
        });
        dispatch(
          setLogin({
            token: res.accessToken,
            expiredAt: res.accessTokenExpiresAt,
          }),
        );
        return res;
      });

  const forgotPassword = async (data: ForgotPasswordRequest) =>
    forgotPasswordRequest(data)
      .unwrap()
      .then((res: any) => {
        setSession({
          access_token: res.accessToken,
          refresh_token: res.refreshToken,
          refresh_token_expired_at: res.refreshTokenExpiresAt,
        });
        dispatch(
          setLogin({
            token: res.accessToken,
            expiredAt: res.accessTokenExpiresAt,
          }),
        );
        return res;
      });

  const logout = () =>
    logoutRequest()
      .unwrap()
      .then(() => {
        setSession(null);
        localStorage.setItem("isInitialized", "false");
        setIsInitialized(false);
        dispatch(setLogout());
        dispatch(clearUser());
      });

  // ==============|| Render ||================= //
  if (isInitialized && !isLoggedIn) {
    return <Loader />;
  } else
    return (
      <JWTContext.Provider
        value={{
          isInitialized,
          isLoggedIn,
          login,
          register,
          forgotPassword,
          logout,
          otp,
        }}
      >
        {children}
      </JWTContext.Provider>
    );
};

export default JWTContext;
