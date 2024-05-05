import { useRef } from "react";
import {
  Col,
  Row,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Label,
} from "reactstrap";
import { FaUsers, FaWallet } from "react-icons/fa";
import CopyInput from "components/Input/CopyInput";
import moment from "jalali-moment";
import {
  useGetFriendsListQuery,
  useGetReferralCodeQuery,
} from "store/api/addFriends";
interface IReferral {
  code: string;
  isDefault: boolean;
  userId: string;
  friendsFeePercent: number;
  createdAt: Date;
  updatedAt: Date;
}
const AddFriends = () => {
  const { data } = useGetReferralCodeQuery();
  const { data: refferalFriends } = useGetFriendsListQuery();
  console.log("AddFriends", refferalFriends);

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
                          ? `https://arsonex.com/register/${(data as IReferral).code}`
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
                        {refferalFriends?.referredUsersCount} نفر
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
          <div className="table-responsive">
            <table className="table table-borderless table-striped">
              {refferalFriends && refferalFriends.briefs?.length > 0 && (
                <thead>
                  <tr>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      شماره تلفن همراه
                    </th>
                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      {/*   پاداش دریافتی (IRT) */}
                      کد دعوت
                    </th>

                    <th
                      scope="col"
                      style={{ color: "#03041b66" }}
                      className="text-center"
                    >
                      زمان ثبت نام
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {refferalFriends &&
                  refferalFriends.briefs.length > 0 &&
                  refferalFriends.briefs?.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center">
                        {item.phoneNumber.replace("+", "")}
                      </td>
                      <td className="text-center">{item.referrerCode}</td>
                      <td className="text-center">
                        <span className="d-inline-block d-ltr">
                          {moment(data?.createdAt)
                            .locale("fa")
                            .format("DD MMMM YYYY")}
                        </span>
                      </td>
                    </tr>
                  ))}
                {refferalFriends && refferalFriends.briefs.length <= 0 && (
                  <tr>
                    <td colSpan={3} className="text-center">
                      شما هنوز دوستی را دعوت نکرده اید.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </section>
  );
};
export default AddFriends;
