import {
  Button,
  Col,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { AlertInfo } from "components/AlertWidget";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { useEnglishNamesMutation } from "store/api/user";
import { yupResolver } from "@hookform/resolvers/yup";

type FormType = {
  firstName: string;
  lastName: string;
};
type Props = {
  successHandler: () => void;
};

export default function NameStep({ successHandler }: Props) {
  // ==============|| Hooks ||================= //
  const [namesRequest, { isLoading, isSuccess }] = useEnglishNamesMutation();
  const resolver = yupResolver(
    Yup.object().shape({
      firstName: Yup.string()
        .matches(
          /[a-z,A-Z]/,
          "لطفا نام خود را به طور صحیح به انگلیسی وارد کنید",
        )
        .required("لطفا نام خود را به طور صحیح به انگلیسی وارد کنید"),
      lastName: Yup.string()
        .matches(
          /[a-z,A-Z]/,
          "لطفا نام خانوادگی خود را به طور صحیح به انگلیسی وارد کنید",
        )
        .required("لطفا نام خانوادگی خود را به طور صحیح به انگلیسی وارد کنید"),
    }),
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
    },

    resolver,
  });

  // ==============|| Handlers ||================= //
  const onSubmit = (data: FormType) => namesRequest(data);

  // ==============|| Life Cycle ||================= //
  useEffect(() => {
    if (isSuccess) successHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // ==============|| Render ||================= //
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <AlertInfo
          text="برای استفاده از خدمات بین المللی آرسونیکس باید نام و نام خانوادگی لاتین خود را وارد کنید. (توجه داشته باشید که نام و نام خانوادگی شما همان نام و نام خانوادگی درج شده در کارت اقامت شما باشد.)."
          hasIcon
        />
      </Row>
      <Row>
        <Col xs={12}>
          <Controller
            control={control}
            name="firstName"
            render={({ field: { name, value, onChange } }) => (
              <FormGroup>
                <Label htmlFor={name}>نام لاتین</Label>
                <Input
                  type="text"
                  name={name}
                  id={name}
                  value={value}
                  onChange={({ target }) => {
                    const val = target.value.toUpperCase();
                    onChange(val);
                  }}
                  invalid={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback>{errors?.[name]?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12}>
          <Controller
            control={control}
            name="lastName"
            render={({ field: { name, value, onChange } }) => (
              <FormGroup>
                <Label htmlFor={name}>نام خانوادگی لاتین</Label>
                <Input
                  type="text"
                  name={name}
                  id={name}
                  value={value}
                  onChange={({ target }) => {
                    const val = target.value.toUpperCase();
                    onChange(val);
                  }}
                  invalid={Boolean(errors?.[name])}
                />
                {errors?.[name] && (
                  <FormFeedback>{errors?.[name]?.message}</FormFeedback>
                )}
              </FormGroup>
            )}
          />
        </Col>
        <Col xs={12} className="d-flex justify-content-center mt-3">
          <Button
            color="primary"
            className="px-5 py-3"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner /> : "ثبت"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
