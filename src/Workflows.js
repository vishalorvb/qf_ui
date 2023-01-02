import WorkflowElement from "./WorkflowElement"

export default function Workflows () {

    const array = ["Api","Pages",""]

    return(<>
        <WorkflowElement workflowName="API"/>
        <WorkflowElement workflowName="Pages"/>
        </>     
    )
}