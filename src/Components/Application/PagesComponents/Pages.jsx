import PagesTable from "../PagesTable";
import { useState } from "react";
import CreatePage from "./CreatePage";
import axios from "../../../Services/AxiosConfig";
import useHead from "../../../hooks/useHead";
import { qfservice } from "../../../Environment";
export default function Pages({ location }) {
    const { setShowloader } = useHead();
    const [pages, setPages] = useState([]);
    const callGetPages = () => {
        setShowloader(true);
        axios
            .get(
                `${qfservice}/webpages/getWebPagesList?module_id=${location?.state?.module_id}`
            )
            .then((resp) => {
                setPages(resp.data.info ?? []);
                setShowloader(false);
            });
    };

    return (
        <>
            <div className="apptable">
                <div className="intable">
                    <div style={{ float: "right" }}>
                        <CreatePage callGetPages={callGetPages} />
                    </div>
                </div>
                <PagesTable
                    location={location}
                    pages={pages}
                    callGetPages={callGetPages}
                />
            </div>
        </>
    );
}
