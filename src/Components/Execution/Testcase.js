import { Button } from "@mui/material";
import TransferList from "../../CustomComponent/TransferList";
import { TextFieldElement, useForm } from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "../../api/axios";

export default function Testcase() {
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const schema = yup.object().shape({
    executionName: yup.string().required(),
    description: yup.string().required(),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    axios
      .get(
        `/qfservice/webtestcase//api/v1/projects/467/workflow/768/web/testcases`
      )
      .then((resp) => {
        console.log(resp?.data?.result);
        setLeft(resp?.data?.result);
        setRight([]);
      });
  }, []);

  return (
    <>
      <TransferList
        left={left}
        setLeft={setLeft}
        right={right}
        setRight={setRight}
      />
      <TextFieldElement
        id="execution-name"
        label="Execution Name"
        variant="outlined"
        size="small"
        fullWidth
        name="executionName"
        control={control}
      />
      <TextFieldElement
        id="description"
        label="Description"
        variant="outlined"
        size="small"
        fullWidth
        name="description"
        control={control}
      />
      <Button type="submit">Execute</Button>
    </>
  );
}
