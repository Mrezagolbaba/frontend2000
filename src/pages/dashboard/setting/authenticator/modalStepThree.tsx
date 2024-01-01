import { Modal } from "reactstrap"
import { useAppSelector } from "store/hooks"
import QRCode from "react-qr-code";
import { useState } from "react";
import OtpInput from "react-otp-input";
import otp from "./styles.module.scss";
interface Props {
    open: boolean
    onClose: () => void
    handleGetCode: ({ code }: { code: string }) => void

}
const StepTreeModal = ({ open, onClose, handleGetCode }:Props) => {
    const authenticator = useAppSelector(state => state.setting.authenticator)
    const [code, setOtpCode] = useState("")

    return (

        <Modal isOpen={open} toggle={onClose}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="onlineDepositLabel">تایید فعالسازی</h5>
                        <button onClick={onClose}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <div className="tab-content">
                            <div className="text-center mb-4 flex-column align-items-center">
                                <QRCode fgColor='#111BFF' viewBox={`0 0 256 256`} size={100} value={authenticator.keyUrl} color='#111BFF' className='w-10 ' />{" "}
                                <p className="mt-2">
                                    {authenticator.secret}
                                </p>

                            </div>
                            <h6
                                className="otp-title-text"
                                style={{ color: "#03041b66", fontSize: "13px" }}
                            >
                                بعد از اسکن یا وارد کردن کد بالا در برنامه کد ۶ رقمی ایجاد شده
                                را لطفا در اینجا وارد کنید
                            </h6>
                            <div className="row mt-4">
                                <div className="col-lg-12">
                                    <label >کد تایید فعالسازی:</label>
                                    <a href="#"></a>
                                        <OtpInput
                                            containerStyle={otp["input-container"]}
                                            value={code}
                                            onChange={(code) => {
                                                setOtpCode(code);
                                            }}
                                            inputStyle={otp["otp-input"]}
                                            numInputs={6}
                                            renderSeparator={undefined}
                                            placeholder={undefined}
                                            shouldAutoFocus={true}
                                            renderInput={(props) => <input {...props} />}
                                        />
                                    <button
                                        onClick={()=>{
                                            handleGetCode({code})
                                        
                                        }}
                                        className="btn btn-outline-primary px-5 py-2 mt-4"
                                        style={{ width: "100%" }}
                                    >
                                        <span className="auth-counter text-start d-ltr">تایید و فعالسازی</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </Modal>
    )
}
export default StepTreeModal