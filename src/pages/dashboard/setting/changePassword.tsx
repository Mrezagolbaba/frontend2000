import toast from "react-hot-toast";
import { useUpdatePasswordMutation } from "store/api/user";
import { useState } from "react";


const ChangePassword = () => {
    const [updatePassword, { isLoading, isError }] = useUpdatePasswordMutation();
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const hanleChangePassword = async () => {
        if (data.newPassword.length < 6) {
            toast.error("رمز عبور باید حداقل 6 کاراکتر باشد");
            return;
        }

        if (data.newPassword !== data.confirmPassword) {
            toast.error("رمز عبور و تکرار آن یکسان نیستند");
        }
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


    return (
        <form >
            <h5 className="mb-4 text-center">تغییر رمز عبور</h5>
            <div className="row mb-2">
                <label className="col-xl-3 col-lg-5 col-form-label">رمزعبور قبلی:</label>
                <div className="col-xl-6 col-lg-7">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="رمز را وارد کنید"
                        onChange={(e) => {
                            setData({ ...data, oldPassword: e.target.value });
                        }}
                    />

                </div>
            </div>
            <div className="row mb-2">
                <label className="col-xl-3 col-lg-5 col-form-label">رمزعبور:</label>
                <div className="col-xl-6 col-lg-7">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="رمز را وارد کنید"
                        onChange={(e) => {
                            setData({ ...data, newPassword: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <label className="col-xl-3 col-lg-5 col-form-label">تکرار رمزعبور:</label>
                <div className="col-xl-6 col-lg-7">
                    <input
                        type="password"
                        className="form-control"
                        placeholder="تکرار رمز عبور"
                        onChange={(e) => {
                            setData({ ...data, confirmPassword: e.target.value });
                        }}
                    />
                </div>
            </div>
            <div className="text-center">
                <button type="submit" className="btn btn-outline-primary" onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    hanleChangePassword();
                }}>
                    ذخیره
                </button>
            </div>
        </form>
    );
};
export default ChangePassword;