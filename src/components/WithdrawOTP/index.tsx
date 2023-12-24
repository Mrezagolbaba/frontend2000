import OtpInput from "react-otp-input";
import { useEffect, useState } from "react";
import { LabeLText } from "helpers";
import otp from "./otp.module.scss";
import { Button } from "reactstrap";
import auth from "assets/scss/auth/auth.module.scss";

interface Props {
    securitySelection: string
    section?: string
    handleGetCode: (code: string) => void
    handleResend: () => void

}
const WithdrawOTP = ({ securitySelection, section, handleGetCode, handleResend }: Props) => {
    const [timeInSeconds, setTimeInSeconds] = useState(120);
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
    return (
        <div className={otp["otp-container"]}>
            <hr />
            <h6> برای تایید برداشت کد ارسال شده به {LabeLText[securitySelection]} را وارد کنید </h6>
            <div className="mb-3">
                {timeInSeconds > 0 ? (
                    <span className="auth-counter text-start d-ltr">
                        {formatTime()}
                    </span>
                ) : (
                    <Button
                        color="link"
                        className={auth.link}
                        onClick={handleResendClick}

                    >
                        ارسال مجدد کد
                    </Button>
                )}
            </div>


            <OtpInput
                containerStyle={otp["input-container"]}
                value={otpCode}
                onChange={(code) => {
                    setOtpCode(code);
                    if (code.length === 6){
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
        </div>
    )
}
export default WithdrawOTP;