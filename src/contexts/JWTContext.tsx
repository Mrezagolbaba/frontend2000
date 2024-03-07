// import { selectAuth, setLogin, setLogout } from "store/reducers/jwtAuth";
import {
  ForgotPasswordRequest,
  JWTContextType,
  LoginRequest,
  RegisterRequest,
} from "types/auth";
import {
  useForgotPasswordMutation,
  useLoginMutation,
  useRegisterMutation,
} from "store/api/auth";
import { REF_TOKEN_OBJ_NAME, REF_TOKEN_OBJ_TIME } from "config";
import { axiosInstance } from "store/api";
import { createContext, useEffect } from "react";
import { selectAuth, setLogin } from "store/reducers/jwtAuth";
import { setRefToken } from "helpers";
import { useAppDispatch, useAppSelector } from "store/hooks";

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
    window.localStorage.removeItem(REF_TOKEN_OBJ_NAME);
    window.localStorage.removeItem(REF_TOKEN_OBJ_TIME);
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const dispatch = useAppDispatch();
  //step1
  const [loginRequest] = useLoginMutation();
  const [registerRequest] = useRegisterMutation();
  const [forgotPasswordRequest] = useForgotPasswordMutation();
  // const [forgotPasswordPost] = useForgotPasswordMutation();

  const { isInitialized, isLoggedIn } = useAppSelector(selectAuth);

  useEffect(() => {
    const init = async () => {
      try {
        // const token = await refreshTokenPromise();
        // dispatch(setLogin({ token }));
        // dispatch(
        //   setLogin({
        //     token:
        //       "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY3MzA1MTQ2MSwiaWF0IjoxNjczMDUxNDYxfQ.nee3mWuVCZibtt5F7N1qJWybNpQzhHmH0YNHZCsZVDU",
        //   }),
        // );
      } catch (e) {
        // localStorage.removeItem(REF_TOKEN_OBJ_NAME);
        // dispatch(setLogout({}));
      }
    };
    init();
  }, []);

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

  // const logout = () => {
  //   setSession(null);
  //   dispatch(setLogout({}));
  // };

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
        // logout,
        // forgotPassword,
      }}
    >
      {children}
    </JWTContext.Provider>
  );
};

export default JWTContext;
