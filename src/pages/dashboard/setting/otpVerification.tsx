import OtpInput from "react-otp-input";
import auth from "assets/scss/auth/auth.module.scss";

import { useVerifySwitchOtpMethodMutation } from "store/api/settings";
import { useEffect, useState } from "react";
import { set } from "lodash";
const LabeLText = {
    EMAIL: "ایمیل",
    PHONE: "پیامک",
    AUTHENTICATOR: 'google Authenticator'
}
interface Props {
    securitySelection: string
    section?: string
    handleGetCode: (code: string) => void

}
const OtpVerification = ({ securitySelection, section, handleGetCode }: Props) => {
    const [otpCode,setOtpCode] = useState("");
    const [verifySwitchOtpMethod, { isSuccess }] = useVerifySwitchOtpMethodMutation();

    return (
        <div className="d-flex justify-content-center align-items-center container">
            <div className="py-5 px-3 d-flex-col justify-content-center align-items-center  " style={{ backgroundColor: '#f1f1f1', borderRadius: '10px' }}>
                <div className="d-flex justify-content-center align-items-center flex-row">
                    <h5 className="m-0">کد تایید {LabeLText[securitySelection]}</h5>
                </div>
                <hr />
                <h6> برای تایید تغییر تایید هویت دو مرحله ای کد ارسال شده به {LabeLText[securitySelection]} را وارد کنید </h6>
                
                        <OtpInput
                            containerStyle={auth["otp-container"]}
                            value={otpCode}
                            onChange={(code) => {
                                setOtpCode(code);
                                if(code.length===6)
                                handleGetCode(otpCode)
                            }}
                            inputStyle={auth["otp-input"]}
                            numInputs={6}
                            renderSeparator={undefined}
                            placeholder={undefined}
                            shouldAutoFocus={true}
                            renderInput={(props) => <input {...props} />}
                        />
            </div>
        </div>
    )
}
export default OtpVerification;