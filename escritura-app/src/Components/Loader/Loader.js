import './Loader.css'

const Loader = () => {
    return (<>
        <div style={{ justifyContent:'center' }}>
            <div className="lds-ring">
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
                <div>
                </div>
            </div>
        </div>
    </>);
}
export default Loader;