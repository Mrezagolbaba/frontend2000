import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { LabeLText, PhoneNumberMask } from "helpers";
import otp from "./otp.module.scss";
import { Button } from "reactstrap";
import auth from "assets/scss/auth/auth.module.scss";
import { useAppSelector } from "store/hooks";
import { IoIosClose } from "react-icons/io";

interface Props {
    securitySelection: string
    section?: string
    handleGetCode: (code: string) => void
    handleResend: () => void
    handleSendOtp: () => void
    onClose: () => void
}
const WithdrawOTP = ({ securitySelection, section, handleGetCode, handleResend, handleSendOtp, onClose }: Props) => {
    const [timeInSeconds, setTimeInSeconds] = useState(120);
    const user = useAppSelector((state) => state.user);
    useEffect(() => {
        const timerInterval = setInterval(() => {
            if (timeInSeconds > 0) {
                setTimeInSeconds(timeInSeconds - 1);
            }
        }, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(timerInterval);
    }, [timeInSeconds]);
    const [otpCode, setOtpCode] = useState("");
    const formatTime = () => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    const handleResendClick = () => {
        setTimeInSeconds(120)
        handleResend()
        setOtpCode("")
    }
    function maskingString(str, start, end) {
        if (!str || start < 0 || start >= str.length || end < 0 || end > str.length || start >= end) {
            return str;
        }
        const maskLength = end - start;
        const maskedStr = str.substring(0, start) + "*".repeat(maskLength) + str.substring(end);
        return maskedStr;
    }

    return (
        <div className={otp["otp-container"]}>
            <div className={otp["otp-header"]} onClick={() => onClose}>
                <IoIosClose color="#c6d2d9" size={40} onClick={() => onClose()} />
            </div>
            <div className={otp["otp-content"]}>
                <div className={otp["otp-title"]}>
                    <h5 >تایید برداشت</h5>
                    {user.otpMethod === "PHONE" &&
                        <h6 className={otp["otp-title-text"]}>یک کد ۶ رقمی به شماره
                            <span>{" "} {PhoneNumberMask({ phoneNumber: user.phoneNumber})} {" "}</span>
                            ارسال شد لطفا کد را اینجا وارد کنید
                        </h6>}
                    {user.otpMethod === "EMAIL" &&
                        <h6 className={otp["otp-title-text"]}>یک کد ۶ رقمی به ایمیل
                            <span>{" "} {maskingString(user.email, 1, 14)}{" "}</span>
                            ارسال شد لطفا کد را اینجا وارد کنید
                        </h6>}
                    {user.otpMethod === 'AUTHENTICATOR' &&
                        <h6 className={otp["otp-title-text"]}>یک کد ۶ رقمی به اپلیکیشن احراز هویت ارسال شد لطفا کد را اینجا وارد کنید</h6>
                    }
                </div>
                <OtpInput
                    containerStyle={otp["input-container"]}
                    value={otpCode}
                    onChange={(code) => {
                        setOtpCode(code);
                        if (code.length === 6) {
                            handleGetCode(code)
                        }

                    }}
                    inputStyle={otp["otp-input"]}
                    numInputs={6}
                    renderSeparator={undefined}
                    placeholder={undefined}
                    shouldAutoFocus={true}
                    renderInput={(props) => <input {...props} />}
                />

                {timeInSeconds === 0 ?
                    <button className="btn btn-outline-primary mt-4 px-5 py-2" style={{ width: '80%' }}
                        onClick={handleResendClick}
                    >
                        ارسال مجدد کد
                    </button>
                    :
                    <button className="btn btn-outline-primary px-5 py-2 mt-4" style={{ width: '80%' }}>
                        <span className="auth-counter text-start d-ltr">
                            {formatTime()}
                        </span>
                    </button>
                }
            </div>

        </div>
    )
}
export default WithdrawOTP;