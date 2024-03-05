import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "components/Dialog";
import DropdownInput from "components/Input/Dropdown";
import { ChangeEvent, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormGroup, Input, Label, Row } from "reactstrap";
import { useCreateTicketMutation } from "store/api/ticket";
import { TicketSchema } from "./validationTicket";
import { on } from "events";

const categoryData = [
    { value: "USER_PROFILE_AND_VERIFICATION", content: 'اطلاعات هویتی و احراز' },
    { value: "TICKET_DEPOSIT_WITHDRAW", content: 'واریز و برداشت' },
    { value: "TICKET_TECHNICAL_ISSUES", content: 'مشکلات فنی' },
    { value: "TICKET_TO_ADMIN", content: 'مدیریت' },
    { value: "TICKETـCRITICSـAND_SUGGESSTIONS", content: 'انتقادات و پیشنهادات' },
]
interface TicketForm {
    category: string;
    subject: string;
    description: string;
}

const TicketModal = ({
    isModalOpen,
    onCancel,
    onOk,
}) => {
    const [category, setCategory] = useState('USER_PROFILE_AND_VERIFICATION');
    const [createTicket, { data, error, isLoading, isSuccess }] = useCreateTicketMutation();
    const resolver = yupResolver(TicketSchema);
    const inputRef1 = useRef<HTMLInputElement>(null);

    const [imgUrl, setImgUrl] = useState<{ 1: string | null; 2: string | null }>({
        1: null,
        2: null,
    });
    const [file, setFile] = useState<{ 1: File | null; 2: File | null }>({
        1: null,
        2: null,
    });
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<TicketForm>({
        mode: "onChange",
        defaultValues: {
            category: "",
            subject: "",
            description: "",
        },
        resolver,
    });
    const onSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = {
            category: category,
            subject: "عنوان",
            description: "متن",
        }
        createTicket(data)
    }
    return (
        <Dialog
            isOpen={isModalOpen}
            onClose={onCancel}
            title="ارسال تیکت"
            size="lg"
        >
            <div className="modal-body">
                {/* <p className="modal-text">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است،
                </p> */}
                <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Label htmlFor="category">  دسته بندی:</Label>
                        <Controller
                            name="category"
                            control={control}
                            render={({ field: { name, value, onChange, ref } }) => (
                                <DropdownInput
                                    id={name}
                                    value={value}
                                    onChange={(val) => {
                                        onChange(val);
                                    }}
                                    options={categoryData}
                                />
                            )}

                        />
                        {errors.category && (
                            <span className="text-danger">{errors.category.message}</span>
                        )}
                    </Row>
                    <Row>
                        <Label htmlFor="subject">  موضوع:</Label>
                        <Controller
                            name="subject"
                            control={control}
                            render={({ field: { name, value, onChange, ref } }) => (
                                <Input
                                    id={name}
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                    }}
                                />
                            )}
                        />
                        {errors.subject && (
                            <span className="text-danger">{errors.subject.message}</span>
                        )}
                    </Row>
                    <Row>
                        <Label htmlFor="content">  متن:</Label>

                        <Controller
                            name="description"
                            control={control}
                            render={({ field: { name, value, onChange, ref } }) => (
                                <textarea
                                    name={name}
                                    className="form-control"
                                    placeholder="متن خود را بنویسید"
                                    value={value}
                                    onChange={(e) => {
                                        onChange(e.target.value);
                                    }}
                                    style={{ height: "150px" }}
                                />
                            )}
                        />
                        {errors.description && (
                            <span className="text-danger">{errors.description.message}</span>
                        )}
                    </Row>
                    <Row>

                        <div style={{ border: "1px solid #E5E5E5", borderRadius: "5px", padding: "20px", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <label>
                                <span className="icon">
                                    <svg
                                        width="16"
                                        height="18"
                                        viewBox="0 0 16 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M10.2803 1.30176H4.73699C3.02116 1.30176 1.54199 2.69259 1.54199 4.40926V13.3568C1.54199 15.1701 2.92366 16.5959 4.73699 16.5959H11.3937C13.1103 16.5959 14.502 15.0734 14.502 13.3568V5.69842L10.2803 1.30176Z"
                                            stroke="#03041B"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M10.0613 1.29199V3.71616C10.0613 4.89949 11.0188 5.85949 12.2021 5.86199C13.2988 5.86449 14.4213 5.86533 14.4971 5.86033"
                                            stroke="#03041B"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M7.7006 6.86719V12.3447"
                                            stroke="#03041B"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M5.33521 9.24302L7.70021 6.86719L10.066 9.24302"
                                            stroke="#03041B"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </span>
                                ارسال فایل
                            </label>
                            <input type="file" id="inputFile" style={{ display: "none" }}
                                ref={inputRef1}
                                onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                                    const fileTemp = target.files && target.files[0];
                                    setFile({ ...file, 1: fileTemp || null });
                                    if (fileTemp) {
                                        const url = URL.createObjectURL(fileTemp);
                                        setImgUrl({ ...imgUrl, 1: url });
                                    } else {
                                        setImgUrl({ ...imgUrl, 1: null });
                                    }
                                }} />
                        </div>
                    </Row>
                    <div className="row mt-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <button
                            type="submit"
                            className="btn btn-outline-primary"
                        >
                            ارسال
                        </button>
                    </div>
                </form>
            </div>
        </Dialog>
    );
}
export default TicketModal;