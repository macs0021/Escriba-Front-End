import GuardView from "../Views/GuardView/GuardView";

const UrlDoesntExistGuard = () => {
    return (<>
        <GuardView message={"You are lost, this URL does not exist"} icon={"location"}></GuardView >
    </>)
}

export default UrlDoesntExistGuard;