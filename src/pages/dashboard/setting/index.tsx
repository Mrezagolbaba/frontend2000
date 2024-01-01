import { useState, useEffect } from "react";
import { Checkbox, Switch } from "antd";
import { Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Input, Label, Modal, Row } from "reactstrap";
import s from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuthenticatorData, getNotifSettings, updateNotifSettings } from "store/reducers/features/settings/settingSlice";
import ChangePassword from "./changePassword";
import { useRequestDisableAuthenticatorMutation, useRequestSwitchOtpMethodMutation, useVerifySwitchOtpMethodMutation } from "store/api/settings";
import toast from "react-hot-toast";
import { setAuthenticatorData } from 'store/reducers/features/settings/settingSlice';
import { useGetMe } from "services/auth/user";
import { setUser } from "store/reducers/features/user/userSlice";

import { CheckboxChangeEvent } from "antd/es/checkbox";
import WithdrawOTP from "components/WithdrawOTP";
import StepTwoModal from "./authenticator/modalStepTwo";
import StepTreeModal from "./authenticator/modalStepThree";
import StepOneModal from "./authenticator/modalStepOne";
import PhoneModal from "./phoneVerificationModal";
import EmailModal from "./emaiVerificationlModal";
interface NotificationSetting {
  key: string;
  userId: string;
  value: boolean;
  id: string;
  createdAt: string;
  updatedAt: string;
}
const Setting = () => {
  const dispatch = useAppDispatch();
  const getMe: any = useGetMe();
  const user = useAppSelector((state) => state.user);
  const notificationSetting = useAppSelector((state) => state.setting.notificationSettings);
  const [securitySelection, setSecuritySelection] = useState('');
  const [requestSwitchOtpMethod] = useRequestSwitchOtpMethodMutation();
  const [verifySwitchOtpMethod, { isSuccess }] = useVerifySwitchOtpMethodMutation();
  const [requestDisableAuthenticator] = useRequestDisableAuthenticatorMutation();
  const [showInput, setShowInput] = useState(false);
  const [notificationStatesCopy, setNotificationStatesCopy] = useState([]);
  const [isInitial, setIsInitial] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [showPhoneOTP, setShowPhoneOTP] = useState(false);
  const [showStepOne, setShowStepOne] = useState(false);
  const [showStepTwo, setShowStepTwo] = useState(false);
  const [showStepTree, setShowStepTree] = useState(false);
  const { handleSubmit, control, setValue, getValues } = useForm(
    {
      mode: "onChange",
      defaultValues: {
        code: "",
      },
    }
  )
  const [notificationStates, setNotificationStates] = useState({
    emailState: false,
    smsState: false,
  });
  const handleRadioChange = async (event) => {
    setSecuritySelection(event.target.value);
    if (user?.otpMethod === 'AUTHENTICATOR') {
      // await requestDisableAuthenticator({ targetMethod: event.target.value })
    }
    setIsInitial(false)
    setShowInput(true)
    if (event.target.value === "AUTHENTICATOR") {
      setShowEmailOtp(true)

      await requestSwitchOtpMethod({ targetMethod: event.target.value });
    } else {
      try {
        setShowInput(true)
        setShowOtp(true)
        await requestSwitchOtpMethod({ targetMethod: event.target.value });
      } catch (error) {
        console.error('Error requesting switch OTP method:', error);
      }
    }
  };
  const handleOTP = async (data: { code: string }) => {
    try {
      verifySwitchOtpMethod({ code: data.code }).then((res) => {
        // @ts-ignore
        if (res.data) {
          setShowInput(false)
          setShowStepOne(true)
          getMe.mutateAsync(null).then((res) => {
            res && dispatch(setUser(res));
          });
        } else {
          // @ts-ignore
          toast.error(res?.error?.data.message, { position: 'bottom-left' })
        }
      });
    } catch (error) {
      toast.error('خطایی رخ داده است')

    };
  }

  useEffect(() => {
    setSecuritySelection(user?.otpMethod);
    setIsInitial(true);
  }, [user?.otpMethod]);

  const transformApiData = (apiData) => {
    return apiData.reduce((acc, item) => {
      return {
        ...acc,
        [item.key]: item.value,
      };
    }, {
    });
  };

  useEffect(() => {
    if (notificationSetting.length === 0) return;
    const x = transformApiData(notificationSetting)
    setNotificationStates(transformApiData(notificationSetting));
    const newArray = Object.entries(x).map(([key, value]) => ({
      key,
      value,
    }));

    // Update the notificationStatesCopy with the new array
    setNotificationStatesCopy(newArray as any);
  }, [notificationSetting]);

  useEffect(() => {
    dispatch(getNotifSettings())
    if (user?.otpMethod !== 'AUTHENTICATOR') {
      dispatch(getAuthenticatorData())
    }
  }, []);
  const handleOTPAuthenticator = async (data: { code: string }) => {
    const dataToken = {
      token: data.code,
    }
    try {
      await dispatch(setAuthenticatorData(dataToken)).then((res) => {
        if (res.payload) {
          toast.success('کد اعتبار سنجی با موفقیت فعال شد')
        }
      })
    }
    catch (error) {
      toast.error('خطایی رخ داده است')
    }
  };
  const fetchData = async () => {
    await dispatch(getNotifSettings())
  };
  const handleChange = async (id: string, checked: CheckboxChangeEvent) => {
    setNotificationStates((prevState) => {
      const newState = {
        ...prevState,
        [id]: checked,
      };
      return newState;
    });

    await dispatch(updateNotifSettings(id));
    await fetchData();

    // Use the state updater callback to get the updated state
    setNotificationStates((prevState) => {
      const newArray = Object.entries(prevState).map(([key, value]) => ({
        key,
        value,
      }));

      // Update the notificationStatesCopy with the new array
      setNotificationStatesCopy(newArray as any);
      return prevState;
    });
  };
  const handleSendOtp = async (data: { code: string }) => {
    setShowOtp(false)
    // (res:{data:{otpMethod: string,switchStatus: string}})
    verifySwitchOtpMethod({ code: data.code }).then((
      res: any
    ) => {
      if (res.data.switchStatus === 'ACTIVATING') {
        setSecuritySelection(
          securitySelection === 'PHONE' ? 'EMAIL' : 'PHONE'
        )
        setShowOtp(true)
        setOtpCode('')

      } else if (res.data.switchStatus === 'SUCCESSFUL') {
        setShowStepOne(false)
        setOtpCode('')
        toast.success('نحوه تایید هویت دو مرحله ای با موفقیت تغییر کرد', { position: 'bottom-left' })
      }
    });


  }
  const handleReSendOtp = async () => {
    console.log('handleReSendOtp')
  }
  const rows = [
    { email: 'FIAT_DEPOSIT_EMAIL', sms: 'FIAT_DEPOSIT_SMS', label: 'واریز تومان و فیات' },
    { email: 'FIAT_WITHDRAW_EMAIL', sms: 'FIAT_WITHDRAW_SMS', label: 'برداشت تومان و فیات' },
    { email: 'CRYPTO_DEPOSIT_EMAIL', sms: 'CRYPTO_DEPOSIT_SMS', label: 'واریز ارز دیجیتال' },
    { email: 'CRYPTO_WITHDRAW_EMAIL', sms: 'CRYPTO_WITHDRAW_SMS', label: 'برداشت ارز دیجیتال' },
    { email: 'LOGIN_EMAIL', sms: 'LOGIN_SMS', label: 'ورود به حساب کاربری' },
    { email: 'UPDATES_EMAIL', sms: 'UPDATES_SMS', label: 'جشنواره‌ها و بروزرسانی‌ها' },
  ];
  return (
    <section className="page settings">
      <Row>
        <Col xl={6} lg={6}>
          <Card>
            <CardHeader>
              <CardTitle>تنظیمات امنیتی</CardTitle>
            </CardHeader>
            <CardBody>
              <form action="" className="security-form ">
                <h6 className=" mb-4 mt-4">
                  نحوه تایید هویت دو مرحله ای جهت ورود به حساب کاربری و
                  درخواست برداشت
                </h6>
                <Row className="mb-4">
                  <Col xl={3} lg={3} md={2} sm={2}>
                    <FormGroup className={s["filedOption"]}>
                      <Label >
                        ایمیل
                      </Label>
                      {' '}
                      <Input
                        name="ایمیل"
                        type="radio"
                        value="EMAIL"
                        checked={securitySelection === "EMAIL"}
                        onChange={handleRadioChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col xl={3} lg={3} md={2} sm={2}>
                    <FormGroup className={s["filedOption"]}>
                      <Label >
                        پیامک
                      </Label>
                      {' '}
                      <Input
                        name="پیامک"
                        type="radio"
                        value="PHONE"
                        checked={securitySelection === "PHONE"}
                        onChange={handleRadioChange}
                      />
                    </FormGroup>
                  </Col>
                  {/* <Col xl={6} lg={6} md={2} sm={2}>
                    <FormGroup className={s["filedOption"]}>
                      <Label >
                        Google Authenticator
                      </Label>
                      {' '}
                      <Input
                        name="googleAuthenticator"
                        type="radio"
                        value="AUTHENTICATOR"
                        checked={securitySelection === "AUTHENTICATOR"}
                        onChange={handleRadioChange}
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                {/* {securitySelection === "AUTHENTICATOR" && !isInitial && <Authenticator initialMethod={user.otpMethod} />} */}
                {/* {securitySelection === "PHONE" && !isInitial && user.otpMethod === 'PHONE' && <PhoneVerification />}
                {securitySelection === "EMAIL" && !isInitial && user.otpMethod === 'EMAIL' && <EmailVerification />} */}
                <ChangePassword />
              </form>
            </CardBody>
          </Card>
        </Col>

        <Col xl={6} lg={6}>
          <Card>
            <CardHeader>
              <CardTitle>اطلاع رسانی</CardTitle>
            </CardHeader>
            <CardBody>
              <div className="table-responsive">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">پیام ها</th>
                      <th scope="col">ایمیل</th>
                      <th scope="col">پیامک</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row) => {
                      return (
                        <tr key={row.email}>
                          <td>
                            <span className="text-50">{row.label}</span>
                          </td>
                          {notificationStatesCopy.map((i: any) => {
                            if (row.email === i.key) {
                              const switchId = row.email === i.key && i.key;
                              return (
                                <td key={switchId} className="text-left">
                                  <div className="notice__toggle">
                                    <Checkbox
                                      id={switchId}
                                      key={switchId}
                                      onChange={(checked) => {
                                        handleChange(i.key, checked);
                                      }}
                                      checked={i.value}
                                    />
                                  </div>
                                </td>
                              );
                            } else if (row.sms === i.key) {
                              const switchId = row.sms === i.key && i.key;
                              return (
                                <td key={switchId} className="text-left">
                                  <div className="notice__toggle">
                                    <Checkbox
                                      id={switchId}
                                      key={switchId}
                                      onChange={(checked) => {
                                        handleChange(i.key, checked);
                                      }}
                                      checked={i.value}
                                    />
                                  </div>
                                </td>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}

                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={showOtp} toggle={() => setShowOtp(false)} >
        <WithdrawOTP
          title={securitySelection === 'PHONE' ? 'تایید ایمیل' : 'تایید شماره تلفن همراه'}
          onClose={() => setShowOtp(false)}
          securitySelection={user.otpMethod}
          handleResend={handleReSendOtp}
          handleGetCode={({ code }) => {
            setOtpCode(code);
            code.length === 6 && handleSendOtp({ code })
          }}
        />
      </Modal>
      <StepOneModal
        onClose={() => setShowStepOne(false)}
        handleResend={handleReSendOtp}
        user={user}
        handleGetCode={handleOTP}
        showOtp={showStepOne}
        setShowOtp={setShowStepOne}
        setOtpCode={setOtpCode}
        otpCode={otpCode} />
      <StepTwoModal open={showStepTwo} onClose={() => setShowStepOne(false)}
        onNextLevel={() => {
          setShowStepTwo(false)
          setShowStepTree(true)
        }} />
      <StepTreeModal open={showStepTree} onClose={() => setShowStepTree(false)} handleGetCode={handleOTPAuthenticator} />
      <PhoneModal
        onClose={() => setShowPhoneOTP(false)}
        handleResend={handleReSendOtp}
        user={user}
        handleGetCode={handleOTP}
        showOtp={showPhoneOTP}
        setShowOtp={setShowStepOne}
        setOtpCode={setOtpCode}
        otpCode={otpCode} />
      <EmailModal
        onClose={() =>
          setShowEmailOtp(false)}
        handleResend={handleReSendOtp}
        user={user}
        handleGetCode={handleOTP}
        showOtp={showEmailOtp}
        setShowOtp={setShowStepOne}
        setOtpCode={setOtpCode}
        otpCode={otpCode} />
    </section>
  );
};
export default Setting;
