import { useState } from 'react';
import './ProfileEditFormulary.css'
import imageToBase64 from 'image-to-base64/browser'
import { putUser } from '../../Services/UserService';


const ProfileEditFormulary = ({ userData, setUserData, setModalState }) => {

    const [email, setEmail] = useState("");
    const [description, setDescription] = useState(userData.description);
    const [image, setImage] = useState(userData.image);
    

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            imageToBase64(reader.result).then(base64String => {
                setImage(base64String);
                console.log("Resultado: " + image);
            })
        };
    };

    const saveChanges = (event) => {
        event.preventDefault();
        const saveUser = { "id": userData.id, "name": userData.name, "email": email, "description": description, "image": image }
        setUserData(saveUser);
        setModalState(false);
        putUser(userData.id, saveUser);
    }

    return (<>
        <form className='profile-edit-form'>
            <div>
                <div className="center top-bot-margin">
                    <label htmlFor="file-input" className="file-label">
                        <div class="profileImg">
                            <img src={`data:image/png;base64,${image}`} alt='profile-img'/>
                            <div class='imgOverlay'>
                                <div class='oBody'></div>
                            </div>
                        </div>
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        className="file-input"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                </div>
            </div>
            <div className='formulary-line'>
                <label className='create-form-label'>
                    Description:
                </label>
                <textarea className='create-form-two-grid' type="text" defaultValue={userData.description} onChange={(event) => setDescription(event.target.value)} />
            </div>
            <div className='formulary-line'>
                <label className='create-form-label'>
                    Email:
                </label>
                <input className='create-form-two-grid' type="text" defaultValue={userData.email} onChange={(event) => setEmail(event.target.value)} />
            </div>
            <div className='center'>
                <button className='button' onClick={saveChanges}>Save </button>
            </div>
        </form>

    </>);

}

export default ProfileEditFormulary;