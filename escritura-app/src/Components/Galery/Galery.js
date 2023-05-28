import './Galery.css';

export default function Galery({ children }) {

    return (
        <>
            <div className="galery-center">
                <div className="galery-container">
                    {children}
                </div>

            </div>
        </>
    );
}