import React, { useEffect, useState } from "react";
import MastPop from "./MastPop";
//import { getElementsDetails } from "../Services/ApplicationService";
import { getElementsDetails } from "../Services/QfService";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
} from "@mui/material";
import {
    MultiSelectElement,
    SelectElement,
    TextFieldElement,
    useForm,
} from "react-hook-form-mui";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack } from "@mui/system";
import * as yup from "yup";
import axios from "axios";
import BackdropLoader from "./BackdropLoader";
import { qfservice } from "../Environment";
function ElementsDetails({ ElementId, setPopup, setUpdated, isDiffElement }) {
    const [details, setDetails] = useState();
    const [allXpath, setAllXpath] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getElementsDetails(setDetails, ElementId, isDiffElement === true);
    }, [ElementId]);
    const schema = yup.object().shape({});

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        console.log(details);
        setAllXpath(() =>
            details?.all_xpaths
                ?.split("XPATH_SEPARATOR")
                ?.filter((d) => d !== "")
                ?.map((x) => {
                    const splits = x?.split("=FIELD_VALUE=");
                    return {
                        pathntype: x,
                        id: splits[0],
                        label: splits[0],
                        path: splits[1],
                    };
                })
        );

        reset({
            fieldname: details?.name ?? "",
            path: details?.selected_xpath ?? "",
            fieldType: details?.input_type ?? "",
            otherFieldType: details?.secondary_input_type ?? "",
            pathType: details?.prefered_field ?? "",
        });
    }, [details]);

    const updateElement = (elementData) => {
        console.log(elementData);
        setLoading(true);
        const elementDetails = {
            element_id: ElementId,
            selected_xpath: elementData?.path,
            prefered: elementData?.pathType,
            input_type: elementData?.fieldType,
            secondary_input_type: elementData?.otherFieldType,
            all_xpaths: details?.all_xpaths,
            name: elementData?.fieldname,
        };
        console.log(elementDetails);
        console.log(details);
        axios
            .postForm(`/qfservice/webpages/updateWebPageElementPaths`, elementDetails)
            .then((resp) => {
                resp?.data?.status === "SUCCESS" && setUpdated(true);
                resp?.data?.status === "SUCCESS" && setPopup(false);
                setLoading(false);
            })
            .catch((resp) => {
                setLoading(false);
            });
    };

    return (
        <>
            <Dialog open={true} onClose={() => setPopup(false)}>
                <DialogTitle className="dialogTitle">Elements Details</DialogTitle>
                <form onSubmit={handleSubmit(updateElement)}>
                    <DialogContent>
                        <Stack direction="row" spacing={1} mt={3}>
                            <label>Path Type</label>
                            <SelectElement
                                name="pathType"
                                size="small"
                                onChange={(e) => {
                                    const path = allXpath.find((xpath) => xpath?.id === e)?.path;
                                    setValue("path", path);
                                }}
                                control={control}
                                sx={{ width: 200 }}
                                options={allXpath || []}
                            />
                            <label>Path</label>
                            <TextFieldElement
                                id="name"
                                variant="outlined"
                                size="small"
                                name="path"
                                fullWidth
                                control={control}
                            />
                        </Stack>
                        <Stack spacing={2} mt={2}>
                            <label>Field Name</label>
                            <TextFieldElement
                                id="field-name"
                                variant="outlined"
                                size="small"
                                name="fieldname"
                                fullWidth
                                control={control}
                            />
                            <label>Field Type</label>
                            <SelectElement
                                name="fieldType"
                                size="small"
                                fullWidth
                                control={control}
                                options={[
                                    { id: "", label: "Nothing Selected" },
                                    { id: "Label", label: "Label" },
                                    { id: "Button", label: "Button" },
                                    { id: "InputText", label: "InputText" },
                                    { id: "Link", label: "Link" },
                                ]}
                            />
                            <label>Other Field Type</label>
                            <SelectElement
                                name="otherFieldType"
                                size="small"
                                fullWidth
                                control={control}
                                options={[
                                    { id: "", label: "Nothing Selected" },
                                    { id: "DropDown", label: "DropDown" },
                                    { id: "MouseOver", label: "MouseOver" },
                                    { id: "WindowSwitch", label: "WindowSwitch" },
                                    { id: "Alert", label: "Alert" },
                                ]}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" type="submit">
                            update
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <BackdropLoader open={loading} />
        </>
    );
}

export default ElementsDetails;
