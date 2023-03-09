import './BurguerButton.css'

const BurguerButton = ({handleClick, clicked}) => {

    return (<>
        <div className="nav-icon" onClick={handleClick}>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </>);

}

export default BurguerButton;