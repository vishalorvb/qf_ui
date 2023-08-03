import React, { useEffect, useRef, useState } from "react";
import { getPagesForTestcase } from "../../../Services/TestCaseService";
import { getPagesIntestcase } from "../../../Services/TestCaseService";
import MuiltiSelect from "../../../CustomComponent/MuiltiSelect";
import useHead from "../../../hooks/useHead";

function MapScreen({ callback, projectId, moduleId, testcaseId }) {
    const [pages, setpages] = useState([]);
    let selected = useRef([]);
    const { setSnackbarData, setShowloader } = useHead();
    function updateList(pageId, list) {
        selected.current.forEach((page) => {
            if (page.web_page_id === pageId) {
                page.screenList = list;
            }
        });
    }

    useEffect(() => {
        setShowloader(true);
        if (testcaseId === undefined) {
            getPagesForTestcase(setpages, projectId, moduleId)
                .then((res) => {
                    setShowloader(false);
                })
                .catch(() => {
                    setShowloader(false);
                });
        } else {
            getPagesIntestcase(setpages, projectId, moduleId, testcaseId)
                .then((res) => {
                    setShowloader(false);
                })
                .catch(() => {
                    setShowloader(false);
                });
        }
    }, [projectId, moduleId, testcaseId]);

    useEffect(() => {
        pages.map((page) => {
            let temp = { web_page_id: page.web_page_id, screenList: [] };
            let selectedScreen = [];
            page.screens_list.forEach((screen) => {
                if (screen.is_select) {
                    selectedScreen.push(screen);
                }
            });
            temp.screenList = selectedScreen;
            if (
                !selected.current.find((page) => page.web_page_id === temp.web_page_id)
            ) {
                selected.current.push(temp);
            }
        });
        let temp = selected.current;
        callback([...temp]);

    }, [pages]);



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
                                updateList(page.web_page_id, list);
                                let temp = selected.current;
                                callback([...temp]);

                                let p = [...pages]
                                p.forEach(pages =>{
                                    if(pages.web_page_id == page.web_page_id){
                                        pages.screens_list.forEach(screens=>{
                                            if(list.find(selectedPages=>selectedPages.screen_id == screens.screen_id)){
                                                screens.is_select = true
                                            }
                                            else{
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
