import SuccessfullPyment from "components/paymeny/successfullPyment"
import FailedPayment from "components/paymeny/failedPayment"
import { useTransactionStatusQuery } from "store/api/wallet-management"
import { useParams } from "react-router-dom"
const PaymentRecipt = () => {
    const id = useParams<{ id: string }>().id as string
    const { data, isLoading, isSuccess } = useTransactionStatusQuery(id)
    console.log(data,'data')
    return (
        <div className="">
            {isLoading && <div>loading...</div>}
            {data?.status === "SUCCESSFUL" && <SuccessfullPyment data={data} />}
            {data?.status === "FAILED" && <FailedPayment data={data} />}
        </div>
    )
}
export default PaymentRecipt