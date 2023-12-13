import Dialog from "components/Dialog";
import { ErrorType, errorNormalizer } from "components/ErrorHandler";
import { formatShowAccount } from "helpers/filesManagement";
import { Dispatch, SetStateAction, useEffect } from "react";
import toast from "react-hot-toast";
import { CiTrash } from "react-icons/ci";
import { FaExclamation } from "react-icons/fa";
import { PiCreditCardLight } from "react-icons/pi";
import { Button, Row, Spinner } from "reactstrap";
import { useDeleteBankAccountMutation } from "store/api/profile-management";

type Props = {
  deleteOptions: any;
  setDeleteOptions: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      id?: string;
      logo?: string;
      accountNumber?: string;
      iban?: string;
    }>
  >;
};

export default function DeleteModal({
  deleteOptions,
  setDeleteOptions,
}: Props) {
  const [deleteAccount, { isLoading, isSuccess, isError, error }] =
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
        logo: undefined,
        accountNumber: "",
      });
    } else if (isError) toast.error(errorNormalizer(error as ErrorType));
  }, [isSuccess, isError, error, setDeleteOptions]);

  return (
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
            {deleteOptions.accountNumber
              ? formatShowAccount(deleteOptions.accountNumber)
              : deleteOptions?.iban}
          </span>
          {deleteOptions?.logo ? (
            <span
              className="mx-3"
              dangerouslySetInnerHTML={{ __html: deleteOptions.logo }}
            />
          ) : (
            <PiCreditCardLight className="mx-3" />
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
            disabled={isLoading}
            onClick={() =>
              deleteOptions.id && deleteAccountHandler(deleteOptions.id)
            }
          >
            {isLoading ? (
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
  );
}