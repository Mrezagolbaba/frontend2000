import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlineEdit } from "react-icons/ai";
import {
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
} from "reactstrap";
import { useAppSelector } from "redux/hooks";
import * as Yup from "yup";

export default function PersonalInformation() {
  const user = useAppSelector((state) => state.user);
  const { firstName, lastName, nationalId, birthDate } = user;

  const resolver = yupResolver(
    Yup.object().shape({
      firstName: Yup.string(),
      lastName: Yup.string(),
      nationalCode: Yup.string(),
      birthDate: Yup.string(),
      nationalPhone: Yup.string(),
      iranianPhone: Yup.string(),
    })
  );

  const {
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalCode: "",
      birthDate: "",
      nationalPhone: "",
      iranianPhone: "",
    },
    resolver,
  });

  useEffect(() => {
    reset({
      firstName: firstName,
      lastName: lastName,
      nationalCode: nationalId,
      birthDate: birthDate,
    });
  }, [birthDate, firstName, lastName, nationalId, reset]);

  return (
    <Card className="custom-card card-secondary personal-info-card mb-4">
      <CardHeader>
        <CardTitle tag="h5">اطلاعات شخصی</CardTitle>
      </CardHeader>
      <CardBody>
        <div className="alert alert-primary">
          با وارد کردن اطلاعات زیر در صورتی که تمامی اطلاعات به نام شما باشد
          احراز هویت سطح یک شما به طور خودکار انجام خواهد شد
        </div>
        <div className="alert alert-danger">
          اطلاعات وارد شده با هم تطبیق ندارند، شماره موبایل وارد شده مربوط به کد
          ملی دیگری می&zwnj;باشد.{" "}
        </div>
        <div className="alert alert-success">
          احراز هویت شما با موفقیت انجام شد و هم اکنون به سطح یک کاربری ارتقا
          پیدا کرده&zwnj;اید.{" "}
        </div>
        <div className="alert alert-warning">
          در صورت تغییر شماره موبایل یا ایمیل تا ۲۴ ساعت قابلیت واریز و برداشت
          نخواهید داشت
        </div>
        <div className="alert alert-warning">
          در صورت تغییر شماره موبایل توجه داشته باشید باید خط به نام شخص
           {`${firstName} ${lastName}`}
           باشد در غیر اینصورت شماره موبایل تغییر نمی&zwnj;کند.
        </div>

        <Form action="" className="">
          <Row>
            <Col sm={{ offset: 1, size: 12 }} lg={{ offset: 1, size: 5 }}>
              <Controller
                name="firstName"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      نام:
                    </Label>
                    <Col sm={9}>
                      <Input
                        disabled
                        id={name}
                        value={value}
                        ref={ref}
                        onChange={onChange}
                        name={name}
                        type="text"
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col sm={{ offset: 1, size: 12 }} lg={{ offset: 1, size: 5 }}>
              <Controller
                name="lastName"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      نام خانوادگی:
                    </Label>
                    <Col sm={9}>
                      <Input
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col sm={{ offset: 1, size: 12 }} lg={{ offset: 1, size: 5 }}>
              <Controller
                name="nationalCode"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      کدملی:
                    </Label>
                    <Col sm={9}>
                      <Input
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col sm={{ offset: 1, size: 12 }} lg={{ offset: 1, size: 5 }}>
              <Controller
                name="birthDate"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} htmlFor={name}>
                      تاریخ تولد:
                    </Label>
                    <Col sm={9}>
                      <Input
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col sm={{ offset: 1, size: 12 }} lg={{ offset: 1, size: 5 }}>
              <Controller
                name="nationalPhone"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} for="input1">
                      شماره ثابت:
                    </Label>
                    <Col sm={9}>
                      <Input
                        invalid={Boolean(errors?.[name])}
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors?.[name]?.message}
                        </FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
            <Col sm={{ offset: 1, size: 12 }} lg={{ offset: 1, size: 5 }}>
              <Controller
                name="iranianPhone"
                control={control}
                render={({ field: { name, value, onChange, ref } }) => (
                  <FormGroup row>
                    <Label sm={3} for="input1">
                      شماره موبایل:
                    </Label>
                    <Col sm={9}>
                      <Input
                        invalid={Boolean(errors?.[name])}
                        disabled
                        id={name}
                        name={name}
                        ref={ref}
                        value={value}
                        type="text"
                        onChange={onChange}
                      />
                      {errors?.[name] && (
                        <FormFeedback tooltip>
                          {errors?.[name]?.message}
                        </FormFeedback>
                      )}
                    </Col>
                  </FormGroup>
                )}
              />
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
}
