import React, { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";

type Props = {};

export default function TextInput({}: Props) {
  const [value, setValue] = useState("");
  return (
    <FormGroup>
      <Input
        name="text-input-search"
        placeholder="جستجو ..."
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </FormGroup>
  );
}
