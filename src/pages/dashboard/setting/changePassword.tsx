import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "store/api/user";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassSchema } from "pages/auth/validationForms";
import { IChangePassword } from "types/settings";


const ChangePassword = () => {
    const [updatePassword, { isLoading, isError }] = useUpdatePasswordMutation();
    const resolver = yupResolver(changePassSchema);
    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<IChangePassword>({
        mode: "onChange",
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            rePassword: "",
        },
        resolver: resolver,
    });

    const onSubmit = async (data: IChangePassword, e: any) => {
        e.preventDefault();
        e.stopPropagation()
        let formData = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
        }
        await updatePassword(formData).then(res => {
            if (res) {
                toast.success("رمز عبور با موفقیت تغییر کرد");
            }
        }).catch(err => {
            console.log(err);
        })
    }
    const handleErrors = (errors: any) =>
        Object.entries(errors).map(([fieldName, error]: any) =>
            toast.error(error?.message, {
                position: "bottom-left",
            }),
        );

    return (
        <form>
            <h5 className="mb-4 text-center">تغییر رمز عبور</h5>
            <div className="row mb-2">
                <label className="col-xl-3 col-lg-5 col-form-label">رمزعبور قبلی:</label>
                <div className="col-xl-6 col-lg-7">
                    <Controller
                        name="oldPassword"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                            <input
                                type="password"
                                className="form-control"
                                placeholder=" رمز عبور قبلی را وارد کنید  "
                                value={value}
                                onChange={onChange}
                                ref={ref}
                                name={name}
                            />
                        )}
                    />

                </div>
            </div>
            <div className="row mb-2">
                <label className="col-xl-3 col-lg-5 col-form-label">رمزعبور:</label>
                <div className="col-xl-6 col-lg-7">
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                            <input
                                type="password"
                                className="form-control"
                                placeholder=" رمز عبور جدید را وارد کنید  "
                                value={value}
                                onChange={onChange}
                                ref={ref}
                                name={name}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-xl-3 col-lg-5 col-form-label">تکرار رمزعبور:</label>
                <div className="col-xl-6 col-lg-7">
                    <Controller
                        name="rePassword"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                            <input
                                type="password"
                                className="form-control"
                                placeholder=" تکرار رمز عبور جدید را وارد کنید  "
                                value={value}
                                onChange={onChange}
                                ref={ref}
                                name={name}
                            />
                        )}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width:'50%'}}>

                    {errors.newPassword && (
                        <h6 className="col-xl-12 col-lg-12" style={{ fontSize: '10px', color: 'red' }}>
                            {errors.newPassword.message}
                        </h6>
                    )}
                    {errors.rePassword && (
                        <h6 className="col-xl-12 col-lg-12" style={{ fontSize: '10px', color: 'red' }}>
                            {errors.rePassword.message}
                        </h6>
                    )}
                </div>

            </div>
            <div className="text-center mt-4">
                <button type="submit" className="btn btn-outline-primary" onClick={
                    (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleSubmit(onSubmit, handleErrors)
                    }
                }>
                    ذخیره
                </button>
            </div>
        </form>
    );
};
export default ChangePassword;