import { Modal } from "reactstrap";
import { BsApple, BsGooglePlay } from 'react-icons/bs'
import s from './styles.module.scss'


const StepTwoModal = ({ open, onClose, onNextLevel }) => {
    return (
        <Modal
            title="Enable 2FA"
            isOpen={open}
            toggle={onClose}

        >
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="onlineDepositLabel">دانلود اپلیکیشن</h5>
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
                        <h6 style={{ color: "#03041b66", fontSize: "13px" }}>
                            برنامه را از طریق استورهای معتبر دانلود کنید و مراحل را ادامه
                            دهید.
                        </h6>
                        <div className="text-center mb-4 mt-4 flex-row align-items-center d-flex w-100 justify-content-evenly">
                            <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US" target="_blank"  className={s["btn-google"]}>
                                <BsGooglePlay />{" "}
                                دانلود از Google Play{" "}
                            </a>
                            <a href="https://apps.apple.com/tr/app/google-authenticator/id388497605" target="_blank"  className={s["btn-apple"]}>
                                <BsApple />{" "}
                                دانلود از App Store{" "}
                            </a>
                        </div>
                        <div className="alert alert-warning">
                            <span className="alert-icon">
                                <svg
                                    viewBox="-0.5 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    width="24"
                                >
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g
                                        id="SVGRepo_tracerCarrier"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M18.2202 21.25H5.78015C5.14217 21.2775 4.50834 21.1347 3.94373 20.8364C3.37911 20.5381 2.90402 20.095 2.56714 19.5526C2.23026 19.0101 2.04372 18.3877 2.02667 17.7494C2.00963 17.111 2.1627 16.4797 2.47015 15.92L8.69013 5.10999C9.03495 4.54078 9.52077 4.07013 10.1006 3.74347C10.6804 3.41681 11.3346 3.24518 12.0001 3.24518C12.6656 3.24518 13.3199 3.41681 13.8997 3.74347C14.4795 4.07013 14.9654 4.54078 15.3102 5.10999L21.5302 15.92C21.8376 16.4797 21.9907 17.111 21.9736 17.7494C21.9566 18.3877 21.7701 19.0101 21.4332 19.5526C21.0963 20.095 20.6211 20.5381 20.0565 20.8364C19.4919 21.1347 18.8581 21.2775 18.2202 21.25V21.25Z"
                                            stroke="rgb(255, 149, 0)"
                                            stroke-width="1.5"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        ></path>
                                        <path
                                            d="M10.8809 17.15C10.8809 17.0021 10.9102 16.8556 10.9671 16.7191C11.024 16.5825 11.1074 16.4586 11.2125 16.3545C11.3175 16.2504 11.4422 16.1681 11.5792 16.1124C11.7163 16.0567 11.8629 16.0287 12.0109 16.03C12.2291 16.034 12.4413 16.1021 12.621 16.226C12.8006 16.3499 12.9398 16.5241 13.0211 16.7266C13.1023 16.9292 13.122 17.1512 13.0778 17.3649C13.0335 17.5786 12.9272 17.7745 12.7722 17.9282C12.6172 18.0818 12.4203 18.1863 12.2062 18.2287C11.9921 18.2711 11.7703 18.2494 11.5685 18.1663C11.3666 18.0833 11.1938 17.9426 11.0715 17.7618C10.9492 17.5811 10.8829 17.3683 10.8809 17.15ZM11.2409 14.42L11.1009 9.20001C11.0876 9.07453 11.1008 8.94766 11.1398 8.82764C11.1787 8.70761 11.2424 8.5971 11.3268 8.5033C11.4112 8.40949 11.5144 8.33449 11.6296 8.28314C11.7449 8.2318 11.8697 8.20526 11.9959 8.20526C12.1221 8.20526 12.2469 8.2318 12.3621 8.28314C12.4774 8.33449 12.5805 8.40949 12.6649 8.5033C12.7493 8.5971 12.8131 8.70761 12.852 8.82764C12.8909 8.94766 12.9042 9.07453 12.8909 9.20001L12.7609 14.42C12.7609 14.6215 12.6808 14.8149 12.5383 14.9574C12.3957 15.0999 12.2024 15.18 12.0009 15.18C11.7993 15.18 11.606 15.0999 11.4635 14.9574C11.321 14.8149 11.2409 14.6215 11.2409 14.42Z"
                                            fill="rgb(255, 149, 0)"
                                        ></path>
                                    </g>
                                </svg>
                            </span>
                            <span className="alert-text"
                            >برای جلوگیری از ریسک فیشینگ و دسترسی غیرمجاز به حساب کاربری
                                خود برنامه&zwnj;های امنیتی را از منابع ناشناس نصب نکنید.
                            </span>
                        </div>
                        <button
                            onClick={onNextLevel}
                            className="btn btn-outline-primary px-5 py-2 mt-4"
                            style={{ width: "100%" }}
                        >
                            <span className="auth-counter text-start d-ltr">مرحله بعد</span>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
export default StepTwoModal;