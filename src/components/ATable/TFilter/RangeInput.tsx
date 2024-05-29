import React, { useState } from "react";
import { FormGroup, Input, Label, Row } from "reactstrap";

type Props = {};

export default function RangeInput({}: Props) {
  const [value, setValue] = useState(["", ""]);
  return (
    <Row>
      <FormGroup className="col-6">
        <Input
          id="range1"
          name="range1"
          placeholder="از"
          value={value[0]}
          onChange={({ target }) =>
            setValue((oldVal) => [target.value, oldVal[1]])
          }
        />
      </FormGroup>
      <FormGroup className="col-6">
        <Input
          id="range2"
          name="range2"
          placeholder="تا"
          value={value[1]}
          onChange={({ target }) =>
            setValue((oldVal) => [oldVal[0], target.value])
          }
        />
      </FormGroup>
    </Row>
  );
}
