import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { Card, Col, Form, Row } from "reactstrap";
import RangeInput from "./RangeInput";
import TextInput from "./TextInput";

type Props = {
  columns: ColumnDef<any, any>[];
};

type TypeInput =
  | "text"
  | "range"
  | "number"
  | "status"
  | "select"
  | "date"
  | undefined;

export default function TFilter({ columns }: Props) {
  const renderInputs = (type: TypeInput) => {
    switch (type) {
      case "range":
        return (
          <Col xs={12}>
            <RangeInput />
          </Col>
        );
      case "text":
        return (
          <Col xs={6}>
            <TextInput />
          </Col>
        );
      default:
        return null;
    }
  };

  return (
    <Card outline className=" p-3">
      <Form>
        <Row>{columns.map((col: any) => renderInputs(col?.filterType))}</Row>
      </Form>
    </Card>
  );
}
