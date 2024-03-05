import Dialog from "components/Dialog";
import { formatShowAccount } from "helpers/filesManagement";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Row, Spinner } from "reactstrap";
import { useDeleteBankAccountMutation } from "store/api/profile-management";
import BanksWrapper from "components/BanksWrapper";

import profile from "assets/scss/dashboard/profile.module.scss";

type Props = {
  deleteOptions: any;
  type: "TRY" | "IRR";
  setDeleteOptions: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      id?: string | undefined;
      accountNumber?: string | undefined;
      iban?: string | undefined;
    }>
  >;
};

export default function DeleteModal({
  deleteOptions,
  setDeleteOptions,
  type,
}: Props) {
  const [deleteAccount, { isLoading, isSuccess }] =
    useDeleteBankAccountMutation();

  const deleteAccountHandler = async (id: string) => {
    await deleteAccount(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("این حساب از لیست حساب های بانکی شما حذف گردید.");
      setDeleteOptions({
        isOpen: false,
        id: undefined,
        accountNumber: "",
        iban: "",
      });
    }
  }, [isSuccess, setDeleteOptions]);

  return (
    <Dialog
      isOpen={deleteOptions.isOpen}
      onClose={() =>
        setDeleteOptions({
          isOpen: false,
          id: undefined,
          accountNumber: "",
          iban: "",
        })
      }
      hasCloseButton={true}
      key="delete-dialog"
      title="حذف حساب بانکی"
    >
      <Row className="mt-3 mb-5">
        <div className={profile["delete-account-title"]}>
          <BanksWrapper
            value={
              type === "IRR"
                ? deleteOptions?.accountNumber
                : deleteOptions?.iban
            }
            type={type}
            iconClassName={profile["account-icon"]}
          >
            <div className={profile["account-icon"]} dir="ltr">
              {type === "IRR" && (
                <span>{formatShowAccount(deleteOptions.accountNumber)}</span>
              )}
              <span>{deleteOptions?.iban}</span>
            </div>
          </BanksWrapper>
        </div>
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
                iban: "",
              })
            }
          >
            لغو عملیات
          </Button>
          <Button
            className="py-2 px-4"
            color="danger"
            disabled={isLoading}
            onClick={() =>
              deleteOptions.id && deleteAccountHandler(deleteOptions.id)
            }
          >
            {isLoading ? <Spinner /> : <>تایید عملیات</>}
          </Button>
        </div>
      </Row>
    </Dialog>
  );
}
