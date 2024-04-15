import {
  ForgotPasswordRequest,
  JWTContextType,
  LoginRequest,
  OTPRequest,
  RegisterRequest,
} from "types/auth";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useOtpMutation,
  useRegisterMutation,
} from "store/api/auth";
import { ReactElement, createContext, useEffect } from "react";
import { axiosInstance, refreshTokenPromise } from "store/api";
import { removeRefToken, setRefToken } from "helpers";
import {
  selectAuth,
  setLogin,
  setVerifyLogin,
  setLogout,
} from "store/reducers/jwtAuth";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { useLazyGetMeQuery } from "store/api/user";
import { clearUser, setUser } from "store/reducers/features/user/userSlice";

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
  const dispatch = useAppDispatch();
  //step1
  const [loginRequest] = useLoginMutation();
  const [otpRequest] = useOtpMutation();
  const [registerRequest] = useRegisterMutation();
  const [forgotPasswordRequest] = useForgotPasswordMutation();
  const [logoutRequest] = useLogoutMutation();
  const [getMeReq, { data, isSuccess }] = useLazyGetMeQuery();

  const { isInitialized, isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    const init = async () => {
      try {
        const { token, expiredAt } = await refreshTokenPromise();
        dispatch(setLogin({ token, expiredAt }));
        dispatch(setVerifyLogin());
        getMeReq();
      } catch (e) {
        setSession(null);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isSuccess]);

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
        dispatch(setLogout());
        dispatch(clearUser());
      });

  // if (!isInitialized) {
  //   return <Loader />;
  // }

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
