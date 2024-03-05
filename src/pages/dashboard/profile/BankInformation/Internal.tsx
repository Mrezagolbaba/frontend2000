import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertWarning } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { LuCheck } from "react-icons/lu";
import { useAppSelector } from "store/hooks";
import AccountNumberInput from "components/Input/AccountNumber";
import { useEffect, useState } from "react";
import { BankAccountsResponse, FormBankAccountRequest } from "types/profile";
import { useCreateBankAccountMutation } from "store/api/profile-management";
import { MdClose } from "react-icons/md";
import DeleteModal from "./DeleteModal";
import { persianToEnglishNumbers } from "helpers";

import profile from "assets/scss/dashboard/profile.module.scss";

const resolver = yupResolver(
  Yup.object().shape({
    iban: Yup.string(),
    cardNumber: Yup.string().required().max(16, "فرمت شماره کارت اشتباه است."),
    bankId: Yup.string().required(),
  }),
);

type Props = {
  accounts: BankAccountsResponse[];
  isLoading: boolean;
};

export default function Internal({ accounts, isLoading }: Props) {
  const { firstName, lastName } = useAppSelector((state) => state.user);

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [deleteOptions, setDeleteOptions] = useState<{
    isOpen: boolean;
    id?: string;
    accountNumber?: string;
    iban?: string;
  }>({
    isOpen: false,
    id: undefined,
    accountNumber: "",
  });

  const [createAccount, { isLoading: formLoading, isSuccess }] =
    useCreateBankAccountMutation();

  const { handleSubmit, control, reset, setValue } =
    useForm<FormBankAccountRequest>({
      mode: "onChange",
      defaultValues: {
        cardNumber: "",
        bankId: "",
      },
      resolver,
    });

  const submitHandler = (data) => {
    createAccount({
      ...data,
      cardNumber: persianToEnglishNumbers(data.cardNumber),
    });
  };

  const resetForm = () => {
    reset({
      cardNumber: "",
      bankId: "",
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsOpenForm(false);
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  useEffect(() => {
    if (accounts.length <= 0) setIsOpenForm(true);
    else setIsOpenForm(false);
  }, [accounts]);

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle tag="h5">اطلاعات بانکی</CardTitle>
        </CardHeader>
        <CardBody>
          <AlertWarning
            hasIcon
            key="account-warning"
            text={`تنها حساب‌هایی که به نام ${firstName} ${lastName} باشند قابلیت اضافه شدن را دارند، در نظر داشته باشید واریز و برداشت فقط از طریق حساب هایی که معرفی می‌کنید امکان پذیر خواهد بود.`}
          />

          {isOpenForm && (
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Row className="justify-content-center">
                <Col xs={12} xl={6}>
                  <Row className="px-2">
                    <Col xs={9}>
                      <Controller
                        name="cardNumber"
                        control={control}
                        render={({ field: { name, value, onChange } }) => (
                          <FormGroup className={profile["accounts-field"]}>
                            <Label>شماره کارت:</Label>
                            <AccountNumberInput
                              disabled={formLoading}
                              value={value}
                              onChange={onChange}
                              setBankId={(val) => {
                                setValue("bankId", val);
                              }}
                              name={name}
                              id="00"
                            />
                          </FormGroup>
                        )}
                      />
                    </Col>
                    <Col xs={3} className="align-self-center">
                      <Button
                        type="button"
                        color="icon-danger"
                        disabled={accounts.length <= 0}
                        onClick={() => {
                          setIsOpenForm(false);
                          resetForm();
                        }}
                      >
                        <MdClose />
                      </Button>
                      <Button type="submit" color="icon-success">
                        {formLoading ? <Spinner size="sm" /> : <LuCheck />}
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          )}

          {!accounts || isLoading ? (
            <>
              <Row>
                <Col xs={10}>
                  <Row className="px-2 my-1">
                    <Col xs={12} xl={6} className="placeholder-glow">
                      <div className={profile["accounts-field"]}>
                        <label className="placeholder rounded" />
                        <Col className="placeholder rounded py-3" />
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      xl={6}
                      className="text-center placeholder-glow"
                    >
                      <div className={profile["accounts-field"]}>
                        <label className="placeholder rounded" />
                        <div className="placeholder rounded py-3" />
                      </div>
                    </Col>
                  </Row>
                  <Row className="px-2 my-1">
                    <Col xs={12} xl={6} className="placeholder-glow">
                      <div className={profile["accounts-field"]}>
                        <label className="placeholder rounded" />
                        <Col className="placeholder rounded py-3" />
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      xl={6}
                      className="text-center placeholder-glow"
                    >
                      <div className={profile["accounts-field"]}>
                        <label className="placeholder rounded" />
                        <div className="placeholder rounded py-3" />
                      </div>
                    </Col>
                  </Row>
                  <Row className="px-2 my-1">
                    <Col xs={12} xl={6} className="placeholder-glow">
                      <div className={profile["accounts-field"]}>
                        <label className="placeholder rounded" />
                        <Col className="placeholder rounded py-3" />
                      </div>
                    </Col>
                    <Col
                      xs={12}
                      xl={6}
                      className="text-center placeholder-glow"
                    >
                      <div className={profile["accounts-field"]}>
                        <label className="placeholder rounded" />
                        <div className="placeholder rounded py-3" />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </>
          ) : (
            accounts.length > 0 &&
            accounts.map((account) => (
              <Row>
                <Col xs={11}>
                  <Row className="px-2">
                    <Col xs={12} xl={6}>
                      <FormGroup className={profile["accounts-field"]}>
                        <Label>شماره کارت:</Label>
                        <AccountNumberInput
                          value={account?.cardNumber}
                          name={account?.cardNumber}
                          id={account?.id}
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col xs={12} xl={6}>
                      <FormGroup className={profile["accounts-field"]}>
                        <Label>شماره شبا:</Label>
                        <div className={profile["iban-input-control"]}>
                          <span id={`sheba_${account?.id}`}>IR</span>
                          <Input
                            value={account?.iban}
                            name={account?.iban}
                            type="text"
                            id={`input23_${account?.id}`}
                            placeholder=""
                            disabled={true}
                            className="latin-font"
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col sm={1} className="align-self-center">
                  <Button
                    type="button"
                    color="icon-danger"
                    onClick={() => {
                      setDeleteOptions({
                        isOpen: true,
                        id: account?.id,
                        iban: account?.iban,
                        accountNumber: account?.cardNumber,
                      });
                    }}
                  >
                    <CiTrash />
                  </Button>
                </Col>
              </Row>
            ))
          )}
          <Row>
            <Col xs={12}>
              <ButtonGroup
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  disabled={isOpenForm}
                  type="button"
                  color="link"
                  onClick={() => setIsOpenForm(true)}
                >
                  اضافه کردن حساب جدید
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <DeleteModal
        type="IRR"
        setDeleteOptions={setDeleteOptions}
        deleteOptions={deleteOptions}
      />
    </>
  );
}
