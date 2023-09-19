import React, { useEffect, useRef, useState } from "react";
import { getPagesForTestcase } from "../../../Services/TestCaseService";
import { getPagesIntestcase } from "../../../Services/TestCaseService";
import MuiltiSelect from "../../../CustomComponent/MuiltiSelect";
import useHead from "../../../hooks/useHead";

//function MapScreen({ callback, projectId, moduleId, testcaseId }) {
function MapScreen({ pages, setpages }) {
    //const [pages, setpages] = useState([]);

    const { setShowloader } = useHead();


    //useEffect(() => {
    //    setShowloader(true);
    //    if (testcaseId === undefined) {
    //        getPagesForTestcase(setpages, projectId, moduleId)
    //            .then((res) => {
    //                setShowloader(false);
    //            })
    //            .catch(() => {
    //                setShowloader(false);
    //            });
    //    } else {
    //        getPagesIntestcase(setpages, projectId, moduleId, testcaseId)
    //            .then((res) => {
    //                setShowloader(false);
    //            })
    //            .catch(() => {
    //                setShowloader(false);
    //            });
    //    }

    //}, [projectId, moduleId, testcaseId]);

    //useEffect(() => {
    //    let val = pages.map(page => {
    //        return {
    //            web_page_id: page.web_page_id, screenList: page?.screens_list?.filter(screen => screen.is_select)
    //        }
    //    })
    //    callback([...val])
    //}, [pages]);



    return (
        <div>
            {pages.map((page) => {
                return (
                    <div>
                        {page.name}
                        <MuiltiSelect
                            options={page.screens_list}
                            id={"screen_id"}
                            value={"name"}
                            stateList={(list) => {
                                let p = [...pages]
                                p.forEach(pages => {
                                    if (pages.web_page_id == page.web_page_id) {
                                        pages.screens_list.forEach(screens => {
                                            if (list.find(selectedPages => selectedPages.screen_id == screens.screen_id)) {
                                                screens.is_select = true
                                            }
                                            else {
                                                screens.is_select = false
                                            }

                                        })
                                    }
                                })
                                setpages([...p])
                            }}
                            preselect={page?.screens_list.filter(
                                (screen) => screen.is_select
                            )}
                        ></MuiltiSelect>
                    </div>
                );
            })}
        </div>
    );
}

export default MapScreen;
