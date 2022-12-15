



import React from 'react'

function ProjectOverview(props) {
  return (
    <div>ProjectOverview
        <h1>This is project view</h1>
        <h1>{props.project}</h1>
    </div>
  )
}

export default ProjectOverview