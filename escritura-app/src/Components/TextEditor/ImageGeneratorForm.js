import '../TextEditor/ImageGeneratorForm.css'
import { useState } from 'react';
import '../../Services/DocumentService';


export default function ImageGeneratorForm(props) {

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [imagePrompt, setImagePrompt] = useState("");


    const setParameters = () => {
        console.log("aa");
        props.execute({ imagePrompt: imagePrompt, width: width, height: height });
    };

    const reloadParameters = () =>{
        props.reload({ imagePrompt: imagePrompt, width: width, height: height });
    }


    const handleChangeImagePrompt = (event) => {
        setImagePrompt(event.target.value);
    };

    const handleChangeWidth = (event) => {
        setWidth(event.target.value);
    };

    const handleChangeHeight = (event) => {
        setHeight(event.target.value);
    };



    return (<>
        <div className="image-generator">

            <div className="top-image-container">
                <input className="image-prompt-input"
                    type="text"
                    placeholder="describe your image..."
                    onChange={handleChangeImagePrompt}
                />
            </div>
            <div className="size-input-container">
                <input className="size-input"
                    type="number"
                    placeholder="width"
                    onChange={handleChangeWidth}
                />
                <input className="size-input"
                    type="number"
                    placeholder="height"
                    onChange={handleChangeHeight}
                />
            </div>
            <div className="input-button-container">
                <button className="input-button" onClick={setParameters} type="button">New Image</button>
                <button className="input-button" onClick={reloadParameters} type="button">Reload</button>
            </div>
        </div>

    </>)
}