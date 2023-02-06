import { Button } from "@mui/material";
import TransferList from "../../CustomComponent/TransferList";
import {
  RadioButtonGroup,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import axios from "../../api/axios";

export default function Testset() {
  const [testSets, setTestSets] = useState([]);
  // const axiosPrivate = useAxios();
  const schema = yup.object().shape({
    executionName: yup.string().required(),
    description: yup.string().required(),
    TestSet: yup.string().required(),
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
        `/qfservice/webtestset/api/v1/projects/467/workflow/768/web/testsets`
      )
      .then((resp) => {
        const data = resp?.data?.result;
        setTestSets(() => {
          return data.map((set) => {
            return {
              ...set,
              id: set.testset_id.toString(),
              label: set.testset_name,
            };
          });
        });
      });
  }, []);

  const onSubmitHandler = (data) => {
    console.log({ data });
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <RadioButtonGroup
        label="TestSet"
        name="TestSet"
        control={control}
        options={testSets}
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
    </form>
  );
}
