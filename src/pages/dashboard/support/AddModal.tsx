import { yupResolver } from "@hookform/resolvers/yup";
import Dialog from "components/Dialog";
import DropdownInput from "components/Input/Dropdown";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Col,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  ModalBody,
  Row,
  Spinner,
} from "reactstrap";
import { useCreateTicketMutation } from "store/api/ticket";
import { TicketSchema } from "./validationTicket";
import { useEffect } from "react";
import toast from "react-hot-toast";

const categoryData = [
  { value: "USER_PROFILE_AND_VERIFICATION", content: "اطلاعات هویتی و احراز" },
  { value: "TICKET_DEPOSIT_WITHDRAW", content: "واریز و برداشت" },
  { value: "TICKET_TECHNICAL_ISSUES", content: "مشکلات فنی" },
  { value: "TICKET_TO_ADMIN", content: "مدیریت" },
  { value: "TICKETـCRITICSـAND_SUGGESSTIONS", content: "انتقادات و پیشنهادات" },
];
interface TicketForm {
  category: string;
  subject: string;
  description: string;
}

const TicketModal = ({ isModalOpen, onCancel, onOk }) => {
  const [createTicket, { isLoading, isSuccess }] = useCreateTicketMutation();
  const resolver = yupResolver(TicketSchema);

  // const [img, setImg] = useState<any>(null);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TicketForm>({
    mode: "onChange",
    defaultValues: {
      category: "USER_PROFILE_AND_VERIFICATION",
      subject: "",
      description: "",
    },
    resolver,
  });
  useEffect(() => {
    if (isSuccess) {
      toast.success("تیکت شما جهت بررسی به پشتیبانی ارسال شد.");
      onCancel?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <Dialog
      isOpen={isModalOpen}
      onClose={onCancel}
      title="ارسال تیکت"
      size="lg"
      hasCloseButton
    >
      <ModalBody>
        <form onSubmit={handleSubmit(createTicket)}>
          <Row>
            <Col xs={12}>
              <Controller
                name="category"
                control={control}
                render={({ field: { name, value } }) => (
                  <FormGroup className="row">
                    <Label className="col-3" htmlFor="category">
                      دسته بندی:
                    </Label>
                    <Col xs={9}>
                      <DropdownInput
                        disabled={isLoading}
                        id={name}
                        value={value}
                        onChange={(val) => setValue(name, val)}
                        options={categoryData}
                      />
                      {errors.category && (
                        <FormFeedback>{errors.category.message}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs="12">
              <Controller
                name="subject"
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <FormGroup className="row">
                    <Label className="col-3" htmlFor="subject">
                      موضوع:
                    </Label>
                    <Col xs={9}>
                      <Input
                        disabled={isLoading}
                        id={name}
                        value={value}
                        onChange={onChange}
                        invalid={Boolean(errors.subject)}
                      />
                      {errors.subject && (
                        <FormFeedback>{errors.subject.message}</FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs="12">
              <Controller
                name="description"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup className="row">
                    <Label className="col-3" htmlFor="content">
                      متن:
                    </Label>
                    <Col xs={9}>
                      <Input
                        disabled={isLoading}
                        type="textarea"
                        name={name}
                        placeholder="متن خود را بنویسید"
                        value={value}
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        style={{ minHeight: "150px" }}
                        invalid={Boolean(errors.description)}
                      />
                      {errors.description && (
                        <FormFeedback>
                          {errors.description.message}
                        </FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col xs={12} className="mt-3">
              <Row>
                <Col xs={3} />
                <Col xs={9}>
                  <Button
                    color="primary"
                    outline
                    type="submit"
                    disabled={isLoading}
                    className=" px-5"
                  >
                    {isLoading ? <Spinner /> : "ارسال"}
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Dialog>
  );
};
export default TicketModal;
