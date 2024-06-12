import {
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import {
  useGetFriendsListQuery,
  useGetReferralCodeQuery,
} from "store/api/addFriends";
import ATable from "components/ATable";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import { FaUsers, FaWallet } from "react-icons/fa";
import { useMemo } from "react";

interface IReferral {
  code: string;
  isDefault: boolean;
  userId: string;
  friendsFeePercent: number;
  createdAt: Date;
  updatedAt: Date;
}
const AddFriends = () => {
  // ==============|| Hooks ||================= //
  const { data } = useGetReferralCodeQuery();
  const {
    data: referralFriends,
    isLoading,
    isSuccess,
    isFetching,
  } = useGetFriendsListQuery();

  // ==============|| Constants ||================= //
  const columns = useMemo(
    () => [
      {
        id: "0",
        accessorKey: "phoneNumber",
        header: "شماره تلفن همراه",
        accessorFn: (row: any) => <span dir="ltr">{row?.phoneNumber}</span>,
      },
      {
        id: "1",
        accessorKey: "referrerCode",
        header: "کد دعوت",
      },
      {
        id: "2",
        accessorKey: "createdAt",
        header: "زمان ثبت نام",
        accessorFn: (row: any) =>
          moment(row.createdAt).locale("fa").format("hh:mm YYYY/MM/DD"),
      },
    ],
    [],
  );

  // ==============|| Render ||================= //
  return (
    <section className="page page-add-friends">
      <Card className="mb-4">
        <CardHeader>
          <h5 className="card-title">از معامله دوستان خودت کسب درآمد کن!</h5>
        </CardHeader>
        <CardBody>
          <div className="invite-friends-card__right">
            <p className="card-text">
              با دعوت دوستان خود میتوانید تا سقف ۳۵ درصد از کارمزد معاملات آن‌ها
              را در کیف پول خود دریافت کنید!
            </p>
            <Row className="mb-3">
              <Col xs={12} md={6}>
                <Col xs={12}>
                  <FormGroup>
                    <Label htmlFor="walletAddress"> کد دعوت :</Label>
                    <CopyInput text={data ? (data as IReferral).code : ""} />
                  </FormGroup>
                </Col>

                <Col xs={12}>
                  <FormGroup>
                    <Label htmlFor="walletAddress">لینک دعوت:</Label>
                    <CopyInput
                      text={
                        data
                          ? `https://arsonex.com/register?code=${(data as IReferral).code}`
                          : ""
                      }
                    />
                  </FormGroup>
                </Col>
              </Col>
              <Col xs={12} md={6}>
                <div className="d-flex justify-content-center items-center">
                  <div className="">
                    <label>میزان سود من:</label>
                    <div
                      className="border p-4 rounded mt-2 "
                      style={{ width: "130px" }}
                    >
                      <span className="d-flex justify-content-center items-center">
                        <FaWallet size={50} color="#d7d7d7" />
                      </span>
                      <h6 className="text-center mt-2">
                        {data?.friendsFeePercent} تومان
                      </h6>
                    </div>
                  </div>
                  <div className="mx-5">
                    <label>تعداد دوستان من:</label>
                    <div
                      className="border p-4 rounded mt-2"
                      style={{ width: "130px" }}
                    >
                      <span className="d-flex justify-content-center items-center">
                        <FaUsers size={50} color="#d7d7d7" />
                      </span>
                      <h6 className="text-center mt-2">
                        {referralFriends?.referredUsersCount} نفر
                      </h6>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <h5 className="card-title">لیست دوستان</h5>
        </CardHeader>
        <CardBody>
          <ATable
            data={isSuccess ? referralFriends?.briefs : []}
            isLoading={isLoading || isFetching}
            columns={columns}
          />
        </CardBody>
      </Card>
    </section>
  );
};
export default AddFriends;
