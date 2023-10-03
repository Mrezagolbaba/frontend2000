import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Table,
} from "reactstrap";

import wallet from "pages/dashboard/wallet/style.module.scss";

import teter from "assets/img/icons/flag-turkey.png";

export default function Fiat() {
  return (
    <Card className="custom-card card-secondary mb-4">
      <CardHeader>
        <CardTitle tag="h5">موجودی فیات دیجیتال</CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col xs={6} className="table-responsive">
            <Table borderless className={wallet["table-view"]}>
              <thead>
                <tr>
                  <th>ارز</th>
                  <th className="text-center">موجودی</th>
                  <th className="text-center"> ارزش تخمینی</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div>
                      <img
                        src={teter}
                        alt=""
                        className={wallet["crypto-img"]}
                      />
                      <span className={wallet["crypto-name"]}>لیر</span>
                    </div>
                  </th>
                  <td className="text-center">54.32</td>
                  <td className="text-center">17,232.32</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col
            xs={6}
            className="d-flex justify-content-evenly align-items-center"
          >
            <button type="button" className={`btn ${wallet["silver-button"]}`}>
              واریز
            </button>
            <button type="button" className={`btn ${wallet["silver-button"]}`}>
              برداشت
            </button>
            <button
              type="button"
              className={`btn ${wallet["transaction-button"]}`}
            >
              معامله
            </button>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
