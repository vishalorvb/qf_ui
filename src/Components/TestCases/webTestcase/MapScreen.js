


import React, { useEffect, useRef, useState } from 'react'
import { getPagesForTestcase } from '../../../Services/TestCaseService'
import { getPagesIntestcase } from '../../../Services/TestCaseService'
import MuiltiSelect from '../../../CustomComponent/MuiltiSelect'


function MapScreen({ callback, projectId, moduleId, testcaseId }) {

  const [pages, setpages] = useState([])
  let selected = useRef([])


  function updateList(pageId, list) {
    selected.current.forEach(page => {
      if (page.web_page_id === pageId) {
        page.screenList = list
      }
    })
  }

  useEffect(() => {
    if (testcaseId === undefined) {
      getPagesForTestcase(setpages, projectId, moduleId)
    }
    else {
      getPagesIntestcase(setpages, projectId, moduleId, testcaseId)
    }
  }, [projectId, moduleId, testcaseId])

  useEffect(() => {
    pages.map(page => {
      let temp = { web_page_id: page.web_page_id, screenList: [] }
      let selectedScreen = []
      page.screens_list.forEach(screen => {
        if (screen.is_select) {
          selectedScreen.push(screen)
        }
      })
      temp.screenList = selectedScreen
      if (!selected.current.find(page => page.web_page_id === temp.web_page_id)) {
        selected.current.push(temp)
      }
    }
    )
    let temp = selected.current
    callback([...temp])

    if (testcaseId !== undefined) {

    }


  }, [pages])


  return (
    <div>
      {pages.map(page => {
        return (<div>
          {page.name}
          <MuiltiSelect
            options={page.screens_list}
            id={"screen_id"}
            value={"name"}
            stateList={(list) => {
              console.log(list)
              updateList(page.web_page_id, list)
              let temp = selected.current
              callback([...temp])
            }}
            preselect={page?.screens_list.filter(screen => screen.is_select)}
          ></MuiltiSelect>
        </div>)
      })}

    </div>
  )
}

export default MapScreen
