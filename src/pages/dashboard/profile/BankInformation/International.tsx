import * as Yup from "yup";
import { AlertInfo, AlertWarning } from "components/AlertWidget";
import { yupResolver } from "@hookform/resolvers/yup";
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
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import { useEffect, useState } from "react";

import { BankAccountsResponse } from "types/profile";
import { MdClose } from "react-icons/md";
import { LuCheck } from "react-icons/lu";
import { useCreateBankAccountMutation } from "store/api/profile-management";
import DeleteModal from "./DeleteModal";
import IBANNumber from "components/Input/IBANNumber";
import { persianToEnglishNumbers } from "helpers";

import profile from "assets/scss/dashboard/profile.module.scss";
import { useAppSelector } from "store/hooks";

type Props = {
  accounts: BankAccountsResponse[];
  isLoading: boolean;
};
export default function International({ accounts, isLoading }: Props) {
  const { firstNameEn, lastNameEn, internationalServicesVerified } =
    useAppSelector((state) => state.user);
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
    iban?: string;
  }>({
    isOpen: false,
    id: undefined,
    logo: undefined,
    iban: "",
  });

  const [createAccount, { isLoading: formLoading, isSuccess }] =
    useCreateBankAccountMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      ownerFullName: Yup.string().required(
        "وارد کردن نام صاحب حساب الزامی است.",
      ),
      iban: Yup.string().required("شماره IBAN اشتباه است."),
      bankId: Yup.string().required(),
    }),
  );

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      ownerFullName: "",
      iban: "",
      bankId: "45e690aa-7d39-44fb-a62d-543805a166af",
    },
    resolver,
  });

  const resetForm = () => {
    reset({
      ownerFullName: "",
      iban: "",
      bankId: "45e690aa-7d39-44fb-a62d-543805a166af",
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

  const submitHandler = (data) => {
    const ibanNumber = persianToEnglishNumbers(data.iban);

    createAccount({ ...data, iban: "TR" + ibanNumber });
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>اطلاعات بانکی بین&zwnj;المللی</CardTitle>
        </CardHeader>
        <CardBody id="international-accounts">
          <AlertWarning
            hasIcon
            key="warning-international-account"
            text="در صورتی که کارت اقامت کشوری که در آن ساکن هستید را در کیف پول بخش واریز فیات دیجیتال مورد نظر خود ارسال نکنید، فقط قابلیت برداشت فیات دیجیتال از آرسونیکس را خواهید داشت."
          />
          {internationalServicesVerified && (
            <AlertWarning
              hasIcon
              key="warning-international-account"
              text={`واریز به حساب‌های آرسونیکس فقط باید از حساب ${firstNameEn.toUpperCase()} ${lastNameEn.toUpperCase()} انجام شود، در غیر اینصورت پس از گذشت ۷۲ ساعت کاری با کسر کارمزد بانکی مبلغ عودت داده می‌شود.`}
            />
          )}
          <AlertInfo
            hasIcon
            key="info-international-account"
            text="برداشت فیات دیجیتال در آرسونیکس به حساب‌های مختلف محدودیتی ندارد."
          />

          {!accounts || isLoading ? (
            <>
              <Row>
                <Col xs={12} sm={10}>
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
            accounts.map((account) =>
              editOption.isEdit && editOption.bankId === account.bankId ? (
                ""
              ) : (
                <Row>
                  <Col xs={12} sm={10}>
                    <Row className="px-2">
                      <Col xs={12} xl={7}>
                        <FormGroup className={profile["accounts-field"]}>
                          <Label>شماره IBAN:</Label>
                          <div className={profile["iban-input-control"]}>
                            <IBANNumber
                              name={account.iban}
                              value={
                                account.iban.includes("TR")
                                  ? account.iban.replace("TR", "")
                                  : account.iban
                              }
                              disabled={true}
                            />
                          </div>
                        </FormGroup>
                      </Col>
                      <Col xs={12} xl={5}>
                        <FormGroup className={profile["accounts-field"]}>
                          <Label> صاحب حساب:</Label>
                          <Input
                            value={account?.ownerFullName}
                            name={account?.ownerFullName}
                            type="text"
                            id={account?.ownerFullName}
                            disabled
                            dir="ltr"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} sm={2} className="align-self-center">
                    <Button
                      type="button"
                      color="icon-danger"
                      className="w-100"
                      onClick={() => {
                        // const logo = searchIranianBanks(
                        //   account?.cardNumber
                        // ).logo;

                        setDeleteOptions({
                          isOpen: true,
                          id: account?.id,
                          // logo,
                          iban: account?.iban,
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
                          ownerFullName: account.ownerFullName,
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
              ),
            )
          )}
          {isOpenForm && (
            <Form
              className="bank-account"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Row>
                <Col xs={12} sm={10}>
                  <Row>
                    <Col xs={12} xl={7}>
                      <Controller
                        name="iban"
                        control={control}
                        render={({ field: { name, value } }) => (
                          <FormGroup className={profile["accounts-field"]}>
                            <Label> شماره IBAN:</Label>
                            <IBANNumber
                              name={name}
                              value={value}
                              onChange={(value) => setValue(name, value)}
                              setBankId={(id) => {
                                setValue("bankId", id);
                              }}
                              disabled={formLoading}
                              error={errors.iban}
                            />
                          </FormGroup>
                        )}
                      />
                    </Col>
                    <Col xs={12} xl={5}>
                      <Controller
                        name="ownerFullName"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                          <FormGroup className={profile["accounts-field"]}>
                            <Label> صاحب حساب:</Label>
                            <div>
                              <Input
                                disabled={formLoading}
                                value={value}
                                ref={ref}
                                onChange={({ target }) => {
                                  const val = target.value.toUpperCase();
                                  onChange(val);
                                }}
                                name={name}
                                type="text"
                                className="form-control d-rtl"
                                id={`input23_001`}
                                invalid={Boolean(errors.ownerFullName)}
                              />
                              {errors.ownerFullName && (
                                <FormFeedback className="d-block">
                                  {errors.ownerFullName.message}
                                </FormFeedback>
                              )}
                            </div>
                          </FormGroup>
                        )}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col
                  xs={12}
                  sm={2}
                  className="d-flex align-self-center justify-content-center"
                >
                  <Button
                    type="button"
                    color="icon-danger"
                    disabled={accounts.length <= 0}
                    onClick={() => {
                      setIsOpenForm(false);
                    }}
                  >
                    <MdClose />
                  </Button>
                  <Button type="submit" color="icon-success">
                    {formLoading ? <Spinner size="sm" /> : <LuCheck />}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
          <Row>
            <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="link"
                className="btn-simple"
                disabled={isOpenForm}
                style={{ flex: "none" }}
                onClick={() => setIsOpenForm(true)}
              >
                اضافه کردن حساب جدید
              </Button>
            </ButtonGroup>
          </Row>
        </CardBody>
      </Card>
      <DeleteModal
        type="TRY"
        setDeleteOptions={setDeleteOptions}
        deleteOptions={deleteOptions}
      />
    </>
  );
}
