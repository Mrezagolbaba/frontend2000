import { BsApple, BsGooglePlay } from 'react-icons/bs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import OtpInput from "react-otp-input";
import auth from "assets/scss/auth/auth.module.scss";
import QRCode from "react-qr-code";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setAuthenticatorData } from 'store/reducers/features/settings/settingSlice';
import toast from 'react-hot-toast';
import { useVeryfyOtpAuthenticatorMutation } from 'store/api/settings';
import OtpVerification from './otpVerification';
import s from './styles.module.scss'

const Authenticator = (initialMethod) => {
    const dispatch = useAppDispatch()
    const [disableAuthenticator] = useVeryfyOtpAuthenticatorMutation()
    const authenticator = useAppSelector(state => state.setting.authenticator)
    const [showInput, setShowInput] = useState(false)
    const [phoneOtpCode, setPhoneOtpCode] = useState('')
    const [emailOtpCode, setEmailOtpCode] = useState('')
    const { handleSubmit, setValue, control, getValues } = useForm<{ [key: string]: any }>({
        mode: "onChange",
        defaultValues: {
            code: "",
        },
    });
    const [step, setStep] = useState(1)
    const handleOTP = async () => {
        const data = {
            token: getValues('code')
        }
        dispatch(setAuthenticatorData(data)).then((res) => {
            if (res.payload) {
                toast.success('کد اعتبار سنجی با موفقیت فعال شد')
            }
        })
    };
    const handleDisableAuthenticator = async () => {
        const data = {
            phoneOtpCode: phoneOtpCode,
            emailOtpCode: emailOtpCode
        }

        await disableAuthenticator(data).then((res) => {
            if (res) {
                toast.success('کد اعتبار سنجی با موفقیت غیر فعال شد')
            }
        })
    }
    const Step1 = () => {
        return (
            <div className={s["steps"]} style={{ width: '100%' }}>
                <h5>مرحله یک </h5>
                <hr />
                <div className='d-flex flex-row align-items-center' style={{ width: '100%' }}>
                    برنامه را از طریق
                    <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US" target="_blank" type="button" className={s["btn-google"]}>
                        <BsGooglePlay />{" "}
                        گوگل پلی{" "}
                    </a>
                    یا
                    <a href="https://apps.apple.com/tr/app/google-authenticator/id388497605" target="_blank" type="button" className={s["btn-apple"]}>
                        <BsApple />{" "}
                        اپل استور{" "}
                    </a>
                    دانلود نمایید.
                </div>
            </div>
        )
    }
    const Step2 = () => {
        return (
            <div className={s["steps"]} style={{ width: '100%' }}>
                <h5>مرحله دوم </h5>
                <hr />
                سپس این کد{" "}
                <br />
                <QRCode fgColor='#111BFF' viewBox={`0 0 256 256`} size={100} value={authenticator.keyUrl} color='#111BFF' className='w-10 ' />{" "}
                <br />
                <span style={{ textAlign: 'center' }}>
                    را از طریق برنامه Authenticator اسکن کنید یا کد {authenticator.secret} را
                    در برنامه وارد نمایید.
                </span>
            </div>
        )
    }
    const Step3 = () => {
        return (
            <div className={s["steps"]} style={{ width: '100%' }}>
                <h5>مرحله سوم </h5>
                <hr />
                حالا برای فعال شدن قابلیت استفاده از Google Authenticator کد
                6 رقمی نمایش داده شده در برنامه را در فیلد زیر وارد کرده و
                دکمه تایید را بزنید.
                <div className='mt-4'>
                    <Controller
                        name="code"
                        control={control}
                        render={({ field: { value } }) => (
                            <OtpInput
                                containerStyle={auth["otp-container"]}
                                value={value}
                                onChange={(code) => {
                                    setValue("code", code);
                                }}
                                inputStyle={auth["otp-input"]}
                                numInputs={6}
                                renderSeparator={undefined}
                                placeholder="-"
                                shouldAutoFocus={true}
                                renderInput={(props) => <input {...props} />}
                            />
                        )}
                    />
                </div>
            </div>
        )
    }
    const Step4 = () => {
        return <OtpVerification securitySelection='PHONE' section="authenticator" handleGetCode={
            (code) => {
                if (code.length === 6) setPhoneOtpCode(code)
            }} />
    }
    const Step5 = () => {
        return <OtpVerification securitySelection='EMAIL' section="authenticator" handleGetCode={
            (code) => {
                if (code.length === 6) setEmailOtpCode(code)
            }} />
    }



    const handleOnChhanStep = (e, step: number) => {
        e.preventDefault()
        e.stopPropagation()
        if (step > 5) {
            return
        } else if (step < 1) {
            return
        } else {
            setStep(step)
        }

    }
    return (
        <>
            <div className='d-flex justify-content-center items-center'>
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    {step === 4 && <Step4 />}
                    <hr />
                    {step === 4 && <Step5 />}
                </div>
                {step === 5 && (
                    <div className="alert alert-success mb-5 mt-5">تایید هویت دو مرحله ای   authenticator با موفقیت فعال شد، در صورت تغییر ، مجددا مراحل را باید طی کنید. </div>
                )}
                {showInput && <Step3 />}
            </div>

            {step !== 5 && <div className='d-flex justify-content-evenly mt-4 mb-4' style={{ width: '100%' }}>
                <button disabled={step == 1} className="btn btn-outline-primary"
                    onClick={(e) => {
                        handleOnChhanStep(e, step - 1)
                    }}
                >قبلی </button>
                <button className="btn btn-outline-primary" onClick={(e) => {
                    if (step < 5) handleOnChhanStep(e, step + 1)

                    if (step == 4) {
                        initialMethod === 'authenticator' ? handleDisableAuthenticator() :
                            handleOTP()
                    }
                }}>
                    {step == 4 ? 'تایید' : 'بعدی'}
                </button>

            </div>}
        </>
    )
}
export default Authenticator;