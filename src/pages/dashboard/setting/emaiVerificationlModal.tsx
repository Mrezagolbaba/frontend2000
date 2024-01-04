import { Modal } from "reactstrap";
import OtpInput from "react-otp-input";
import otp from "./authenticator/styles.module.scss"
import { PhoneNumberMask, maskingString } from "helpers";
import { useEffect, useState } from "react";
interface Props {
    showOtp: boolean
    setShowOtp: (show: boolean) => void
    handleGetCode: ({ code }: { code: string }) => void
    otpCode: string
    setOtpCode: (code: string) => void
    user: any
    handleResend: () => void
    onClose: () => void

}
const EmailModal = ({
    showOtp,
    setShowOtp,
    handleGetCode,
    otpCode,
    setOtpCode,
    user,
    handleResend,
    onClose
}: Props) => {
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
        <Modal isOpen={showOtp} toggle={() => setShowOtp(false)} >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="onlineDepositLabel">
                       تایید ایمیل 
                    </h5>
                    <button
                        onClick={onClose}
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="modal-body">
                    <div className="tab-content">
                        <div className=" d-flex justify-content-center" style={{ color: " #03041b66", fontSize: "13px" }}>
                            یک کد ۶ رقمی به آدرس
                           {maskingString(user.email, 1, 14)}
                            ارسال شد لطفا کد را اینجا وارد کنید
                        </div>

                        <div className="row mt-4">
                            <div className="col-lg-12">
                                <div className="d-flex justify-content-between align-items-center ">
                                    <label > </label>
                                    <a onClick={handleResendClick} style={{ color: '#335ffc' }}>
                                        <span className="full-withraw mt-1" style={{ fontSize: '12px' }}>ارسال مجدد به ایمیل</span>
                                    </a>
                                </div>

                                <OtpInput
                                    containerStyle={otp["input-container"]}
                                    value={otpCode}
                                    onChange={(code) => {
                                        setOtpCode(code);
                                        code.length === 6 && handleGetCode({ code })
                                    }}
                                    inputStyle={otp["otp-input"]}
                                    numInputs={6}
                                    renderSeparator={undefined}
                                    placeholder={undefined}
                                    shouldAutoFocus={true}
                                    renderInput={(props) => <input {...props} />}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-outline-primary px-5 py-2 mt-4"
                        style={{ width: "100%" }}
                    >
                        <span className="auth-counter text-start d-ltr">{formatTime()}</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}
export default EmailModal