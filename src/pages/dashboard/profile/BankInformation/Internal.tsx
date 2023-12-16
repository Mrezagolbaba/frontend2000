import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { CiTrash } from "react-icons/ci";
import { FaExclamation } from "react-icons/fa";
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
import { LuCheck, LuPencil } from "react-icons/lu";
import { useAppSelector } from "store/hooks";

import profile from "assets/scss/dashboard/profile.module.scss";
import AccountNumberInput from "components/Input/AccountNumber";
import Dialog from "components/Dialog";
import { useEffect, useState } from "react";
import { formatShowAccount, searchIranianBanks } from "helpers/filesManagement";
import { PiCreditCardLight } from "react-icons/pi";
import toast from "react-hot-toast";
import { BankAccountsResponse, FormBankAccountRequest } from "types/profile";
import {
  useCreateBankAccountMutation,
  useDeleteBankAccountMutation,
  useEditBankAccountMutation,
} from "store/api/profile-management";
import { MdClose } from "react-icons/md";
import DeleteModal from "./DeleteModal";

const resolver = yupResolver(
  Yup.object().shape({
    iban: Yup.string(),
    cardNumber: Yup.string().required(),
    bankId: Yup.string().required(),
  })
);

type Props = {
  accounts: BankAccountsResponse[];
  isLoading: boolean;
};

export default function Internal({ accounts, isLoading }: Props) {
  const { firstName, lastName } = useAppSelector((state) => state.user);

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [editOption, setEditOption] = useState<{
    isEdit: boolean;
    bankId: string;
  }>({
    isEdit: false,
    bankId: "",
  });
  const [deleteOptions, setDeleteOptions] = useState<{
    isOpen: boolean;
    id?: string;
    accountNumber?: string;
  }>({
    isOpen: false,
    id: undefined,
    accountNumber: "",
  });

  const [createAccount, { isLoading: formLoading, isSuccess }] =
    useCreateBankAccountMutation();

  const [editAccount] = useEditBankAccountMutation();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormBankAccountRequest>({
    mode: "onChange",
    defaultValues: {
      cardNumber: "",
      bankId: "",
    },
    resolver,
  });

  const submitHandler = (data) => {
    editOption.isEdit ? editAccount(data) : createAccount(data);
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
                              value={value}
                              onChange={onChange}
                              setBankId={(val) => {
                                console.log("bankId", val);

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
                          setEditOption({
                            isEdit: false,
                            bankId: "",
                          });
                        }}
                      >
                        <MdClose />
                      </Button>
                      <Button type="submit" color="icon-success">
                        <LuCheck />
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
            accounts.map((account) => {
              if (editOption.isEdit && editOption.bankId === account.bankId)
                return null;
              else
                return (
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
                            accountNumber: account?.cardNumber,
                          });
                        }}
                      >
                        <CiTrash />
                      </Button>
                      {/* <Button
                        type="button"
                        color="icon-secondary"
                        disabled
                        onClick={() => {
                          setIsOpenForm(true);
                          reset({
                            bankId: account.bankId,
                            cardNumber: account.cardNumber,
                            iban: account.iban,
                          });
                          setEditOption({
                            isEdit: true,
                            bankId: account?.bankId,
                          });
                        }}
                      >
                        <LuPencil />
                      </Button> */}
                    </Col>
                  </Row>
                );
            })
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
        setDeleteOptions={setDeleteOptions}
        deleteOptions={deleteOptions}
      />
    </>
  );
}
