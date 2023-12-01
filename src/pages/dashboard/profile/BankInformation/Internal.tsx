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
import { ErrorType, errorNormalizer } from "components/ErrorHandler";

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
    logo?: string;
    accountNumber: string;
  }>({
    isOpen: false,
    id: undefined,
    logo: undefined,
    accountNumber: "",
  });

  const [createAccount, { isLoading: formLoading, isSuccess }] =
    useCreateBankAccountMutation();

  const [editAccount] = useEditBankAccountMutation();

  const [deleteAccount, { isLoading: deleteLoading }] =
    useDeleteBankAccountMutation();

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormBankAccountRequest>({
    mode: "onChange",
    defaultValues: {
      iban: "",
      cardNumber: "",
      bankId: "",
    },
    resolver,
  });

  const submitHandler = (data) => {
    editOption.isEdit ? editAccount(data) : createAccount(data);
  };

  const deleteAccountHandler = async (id: string) => {
    await deleteAccount(id)
      .then((res) => {
        toast.success("این حساب از لیست حساب های بانکی شما حذف گردید.");
        setDeleteOptions({
          isOpen: false,
          id: undefined,
          logo: undefined,
          accountNumber: "",
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const resetForm = () => {
    reset({
      iban: "",
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
          <AlertInfo
            hasIcon
            key="account-info"
            text="در صورتی که شماره شبا حساب خود را ندارید، وارد کردن شماره کارت کافی است."
          />

          {isOpenForm && (
            <Form onSubmit={handleSubmit(submitHandler)}>
              <Row>
                <Col xs={10}>
                  <Row className="px-2">
                    <Col xs={12} xl={6}>
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
                    <Col xs={12} xl={6}>
                      <Controller
                        name="iban"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                          <FormGroup className={profile["accounts-field"]}>
                            <Label>شماره شبا:</Label>
                            <div className={profile["iban-input-control"]}>
                              <span id={`sheba_00`}>IR</span>
                              <Input
                                value={value}
                                ref={ref}
                                onChange={onChange}
                                name={name}
                                type="text"
                                id={`inputSheba_00`}
                                placeholder=""
                              />
                            </div>
                          </FormGroup>
                        )}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={2} className="align-self-center">
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
                    <Col xs={10}>
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
                    <Col sm={2} className="align-self-center">
                      <Button
                        type="button"
                        color="icon-danger"
                        onClick={() => {
                          const logo = searchIranianBanks(
                            account?.cardNumber
                          ).logo;
                          setDeleteOptions({
                            isOpen: true,
                            id: account?.id,
                            logo,
                            accountNumber: account?.cardNumber,
                          });
                        }}
                      >
                        <CiTrash />
                      </Button>
                      <Button
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
                      </Button>
                    </Col>
                  </Row>
                );
            })
          )}
          <Row>
            <Col xs={11}>
              <ButtonGroup
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  disabled={isOpenForm}
                  type="button"
                  color="link"
                  onClick={() => setIsOpenForm(true)}
                >
                  {formLoading ? <Spinner /> : "اضافه کردن حساب جدید"}
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Dialog
        isOpen={deleteOptions.isOpen}
        onClose={() =>
          setDeleteOptions({
            isOpen: false,
            id: undefined,
            accountNumber: "",
            logo: undefined,
          })
        }
        hasCloseButton={true}
        key="delete-dialog"
        title={
          <div className="text-secondary fs-6">
            حذف حساب بانکی
            {" ( "}
            <span dir="ltr">
              {formatShowAccount(deleteOptions.accountNumber)}
            </span>
            {deleteOptions?.logo ? (
              <span
                className="mx-3"
                dangerouslySetInnerHTML={{ __html: deleteOptions.logo }}
              />
            ) : (
              <PiCreditCardLight />
            )}
            {")"}
          </div>
        }
      >
        <Row className="mt-3 mb-5">
          <h5 className="text-center">آیا از حذف این حساب اطمینان دارید؟</h5>
        </Row>
        <Row>
          <div className="d-flex flex-row justify-content-evenly">
            <Button
              className="py-2 px-3"
              outline
              color="success"
              onClick={() =>
                setDeleteOptions({
                  isOpen: false,
                  id: undefined,
                  accountNumber: "",
                  logo: undefined,
                })
              }
            >
              <FaExclamation />
              نه منصرف شدم
            </Button>
            <Button
              className="py-2 px-4"
              color="danger"
              disabled={deleteLoading}
              onClick={() =>
                deleteOptions.id && deleteAccountHandler(deleteOptions.id)
              }
            >
              {deleteLoading ? (
                <Spinner />
              ) : (
                <>
                  <CiTrash className="mx-1" />
                  آره حذف بشه
                </>
              )}
            </Button>
          </div>
        </Row>
      </Dialog>
    </>
  );
}
