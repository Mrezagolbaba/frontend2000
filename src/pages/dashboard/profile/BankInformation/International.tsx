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
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useEffect, useState } from "react";

import profile from "assets/scss/dashboard/profile.module.scss";
import { BankAccountsResponse } from "types/profile";
import { MdClose } from "react-icons/md";
import { LuCheck, LuPencil } from "react-icons/lu";
import { useCreateBankAccountMutation } from "store/api/profile-management";
import DeleteModal from "./DeleteModal";
import IBANNumber from "components/Input/IBANNumber";
import { persianToEnglishNumbers } from "helpers";

type Props = {
  accounts: BankAccountsResponse[];
  isLoading: boolean;
};
export default function International({ accounts, isLoading }: Props) {
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
  // const { data: bakList } = useBanksQuery({
  //   filters: "currencyCode||$eq||TRY",
  // });
  const [createAccount, { isLoading: formLoading, isSuccess }] =
    useCreateBankAccountMutation();

  const resolver = yupResolver(
    Yup.object().shape({
      ownerFullName: Yup.string(),
      iban: Yup.string().required(),
      bankId: Yup.string().required(),
    })
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
    createAccount({ ...data, iban: persianToEnglishNumbers(data.iban) });
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>اطلاعات بانکی بین&zwnj;المللی</CardTitle>
        </CardHeader>
        <CardBody>
          <AlertWarning
            hasIcon
            key="warning-international-account"
            text="در صورتی که کارت اقامت کشوری که در آن ساکن هستید را از قسمت احراز هویت ارسال نکنید، فقط قابلیت برداشت فیات دیجیتال از آرسونیکس را خواهید داشت."
          />
          <AlertInfo
            hasIcon
            key="info-international-account"
            text="اطلاعاتی مانند SWIFT Code یا Sort Code هنگام برداشت ارز مورد نظر به طور جداگانه از شما دریافت می‌شود."
          />
          {isOpenForm && (
            <Form
              className="bank-account"
              onSubmit={handleSubmit(submitHandler)}
            >
              <Row>
                <Col xs={10}>
                  <Row>
                    <Col xs={12} xl={6}>
                      <Controller
                        name="ownerFullName"
                        control={control}
                        render={({ field: { name, value, onChange, ref } }) => (
                          <FormGroup className={profile["accounts-field"]}>
                            <Label> صاحب حساب:</Label>
                            <Input
                              value={value}
                              ref={ref}
                              onChange={onChange}
                              name={name}
                              type="text"
                              className="form-control d-rtl"
                              id={`input23_001`}
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
                            <Label> شماره IBAN:</Label>
                            <IBANNumber
                              name={name}
                              value={value}
                              onChange={onChange}
                            />
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
                      //   resetForm();
                      //   setEditOption({
                      //     isEdit: false,
                      //     bankId: "",
                      //   });
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
            accounts.map((account) =>
              editOption.isEdit && editOption.bankId === account.bankId ? (
                ""
              ) : (
                <Row>
                  <Col xs={10}>
                    <Row className="px-2">
                      <Col xs={12} xl={6}>
                        <FormGroup className={profile["accounts-field"]}>
                          <Label> صاحب حساب:</Label>
                          <Input
                            value={account?.ownerFullName}
                            name={account?.ownerFullName}
                            type="text"
                            id={account?.ownerFullName}
                            disabled
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12} xl={6}>
                        <FormGroup className={profile["accounts-field"]}>
                          <Label>شماره IBAN:</Label>
                          <div className={profile["iban-input-control"]}>
                            <Input
                              type="text"
                              value={account.iban}
                              name={account.iban}
                              id={account.iban}
                              disabled
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
                        // const logo = searchIranianBanks(
                        //   account?.cardNumber
                        // ).logo;
                        console.log(account);

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
                    <Button
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
                    </Button>
                  </Col>
                </Row>
              )
            )
          )}

          <Row>
            <ButtonGroup style={{ display: "flex", justifyContent: "center" }}>
              <Button
                color="link"
                className="btn-simple"
                disabled={isOpenForm}
                style={{ flex: "none" }}
              >
                اضافه کردن حساب جدید
              </Button>
            </ButtonGroup>
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