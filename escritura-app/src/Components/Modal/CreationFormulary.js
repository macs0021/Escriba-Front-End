import './CreationFormulary.css'
import Chip from '../Chip/Chip'
import sizeImage from '../../files/sizeImage.png'
import ImageGeneratorService from '../../Services/ImageGeneratorService';
import DocumentService from '../../Services/DocumentService';
import { useNavigate } from 'react-router-dom';
import TokenService from '../../Services/TokenService';
import loadingImg from '../../files/cargaV3.gif';

import React, { useState } from 'react';

const genres = ['Ficción', 'No ficción', 'Drama', 'Romance', 'Ciencia ficción', 'Terror', 'Misterio'];

const CreationFormulary = () => {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [tags, setTags] = useState('');
    const [synopsis, setSynopsis] = useState("");

    const [cover, setCover] = useState(sizeImage);
    const [tempCover, setTemCover] = useState(sizeImage);

    const [prompt, setPrompt] = useState("");


    //Gestión de los géneros
    const handleGenreClick = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter((g) => g !== genre));
        } else {
            setSelectedGenres(selectedGenres.concat([genre]));
        }
    };

    //Creación del documento
    const createDocument = (event) => {

        event.preventDefault();

        console.log(selectedGenres);

        const document = { "privateText": "", "cover": cover, "tittle": title, "synopsis": synopsis, "creatorUsername": TokenService.getUsername(), "genres": selectedGenres, "readings": []};
        console.log("User: " + TokenService.getUsername());

        DocumentService.postDocument(document).then(data => {
            navigate('/documents/' + data);
        });
    }
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
                <label className='create-form-label'>
                    Tittle:
                </label>
                <input className='create-form-input create-form-two-grid' type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>
            <div className='formulary-line'>
                <label className='create-form-label '>
                    Cover:
                </label>
                <div className='create-form-two-grid'>
                    <input className='create-form-input' type="text" value={image} onChange={(event) => setImage(event.target.value)} />
                    <button className='create-form-cover-button' onClick={generateCover}> Generate </button>
                </div>
            </div>

            <div className='cover-portrait'>
                <img className='cover' src={tempCover}></img>
            </div>

            <label className='create-form-label'>
                Sinopsis:
            </label>
            <div className='center-element vertical'>
                <textarea onChange={(event) => setSynopsis(event.target.value)} className='sinopsis-input'></textarea>
            </div>

            <label className='create-form-label'>
                Genres:
            </label>
            
            <div className='center-element'>
                <div className='chip-container'>
                    {genres.map((genre) => (
                        <Chip key={genre} data={genre} onClick={handleGenreClick} />
                    ))}
                </div>
            </div>

            <div className='formulary-line'>
                <label className='create-form-label'>
                    Etiquetas:
                </label>
                <input className='create-form-input create-form-two-grid' type="text" value={tags} onChange={(event) => setTags(event.target.value)} />
            </div>
            <div className='center-element'>
                <button onClick={createDocument} className='create-document-button'>Enviar</button>
            </div>
        </form>
    </>);
}

export default CreationFormulary;