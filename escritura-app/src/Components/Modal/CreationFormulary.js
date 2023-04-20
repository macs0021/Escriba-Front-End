import './CreationFormulary.css'
import Chip from '../Chip/Chip'
import sizeImage from '../../files/sizeImage.png'
import ImageGeneratorService from '../../Services/ImageGeneratorService';
import loadingImg from '../../files/cargaV3.gif';

import React, { useState } from 'react';

const genres = [
    "Novel",
    "Short Story",
    "Poetry",
    "Drama",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Adventure",
    "Humor",
    "Historical",
    "Detective",
    "Western",
    "Dystopian",
    "Realistic",
    "Juvenile",
    "Children's",
    "History",
    "Biography and Memoir",
    "Self-Help and Personal Development",
    "Business and Finance",
    "Politics and Current Affairs",
    "Travel",
    "Food and Gastronomy",
    "Art and Photography",
    "Sports and Outdoor Activities",
    "Education and Reference",
    "Science and Technology",
    "Religion and Spirituality",
    "Environment and Ecology",
    "Philosophy and Thought",
    "Sociology and Anthropology",
    "Journalism and Essays"
];

const CreationFormulary = ({ tittle, setTitle, selectedGenres, setSelectedGenres, synopsis, setSynopsis, cover, setCover }) => {

    const [tempCover, setTemCover] = useState(cover);
    const [image, setImage] = useState("");

    //Gestión de los géneros
    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres(selectedGenres.concat([genre]));
        }
    };

    //Generador de portada
    const generateCover = (event) => {
        event.preventDefault();

        setTemCover(loadingImg);
        const seed = Math.floor(Math.random() * 999999) + 1;

        const imgData = {
            "prompt": image,
            "negative_prompt": "string",
            "scheduler": "EulerAncestralDiscreteScheduler",
            "image_height": 872,
            "image_width": 616,
            "num_images": 1,
            "guidance_scale": 7,
            "steps": 50,
            "seed": seed,
        }
        ImageGeneratorService.postImg(imgData).then(data => {
            console.log("imagen generada: " + data.images[0])
            setTemCover(`data:image/png;base64,${data.images[0]}`);
            setCover(`data:image/png;base64,${data.images[0]}`);
        })
    };

    return (<>
        <form>
            <div className=' formulary-line'>
                <div className='create-form-two-grid row'>
                    <label className='create-form-label create-form-two-grid row'>
                        Tittle:
                    </label>
                    <p className={tittle.trim().length !== 0 ? 'create-form-two-grid info-accepted' : 'create-form-two-grid info'}> You need to fill this field in order to publish your document</p>
                </div>
                <input className='create-form-input create-form-two-grid' type="text" defaultValue={tittle} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className='formulary-line'>
                <label className='create-form-label '>
                    Cover:
                </label>
                <div className='create-form-two-grid'>
                    <input className='create-form-input' type="text" value={image} onChange={(event) => setImage(event.target.value)} />
                    <button className='create-form-cover-button button' onClick={generateCover}> Generate </button>
                </div>
            </div>

            <div className='cover-portrait'>
                <img className='cover' src={tempCover}></img>
            </div>

            <div className='create-form-two-grid row'>
                <label className='create-form-label create-form-two-grid row'>
                    Synopsis:
                </label>
                <p className={synopsis.trim().split(" ").length>=10 ? 'create-form-two-grid info-accepted' : 'create-form-two-grid info'}>You need to write a synopsis of at least 10 words in order to publish your document</p>
            </div>
            <div className='center-element vertical'>
                <textarea onChange={(event) => setSynopsis(event.target.value)} defaultValue={synopsis} className='sinopsis-input'></textarea>
            </div>

            <div className='create-form-two-grid row'>
                <label className='create-form-label create-form-two-grid row'>
                    Genres:
                </label>
                <p className={selectedGenres.length!==0 ? 'create-form-two-grid info-accepted' : 'create-form-two-grid info'}>You need to select at least one of this in order to publish your document</p>
            </div>

            <div className='center-element'>
                <div className='chip-container'>
                    {genres.map((genre) => (
                        <Chip key={genre + " - form"} id={genre + " - form"} data={genre} onClick={handleGenreClick} active={!selectedGenres.includes(genre)} />
                    ))}
                </div>
            </div>
        </form>
    </>);
}

export default CreationFormulary;