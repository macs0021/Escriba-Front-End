import './CreationFormulary.css'
import Chip from '../Chip/Chip'
import sizeImage from '../../files/sizeImage.png'
import ImageGeneratorService from '../../Services/ImageGeneratorService';
import DocumentService from '../../Services/DocumentService';
import { useNavigate } from 'react-router-dom';
import TokenService from '../../Services/TokenService';

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

    const [prompt, setPrompt] = useState("");

    const handleGenreChange = (event) => {
        const { value, checked } = event.target;
        setSelectedGenres((prevSelectedGenres) =>
            checked ? [...prevSelectedGenres, value] : prevSelectedGenres.filter((genre) => genre !== value)
        );
    };

    const handleGenreDelete = (genre) => {
        setSelectedGenres((prevSelectedGenres) => prevSelectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    };

    const createDocument = (event) => {

        event.preventDefault();

        console.log("Synopsis: " + synopsis);

        const document = { "privateText": "", "cover": cover, "tittle": title, "synopsis": synopsis, "creatorUsername": TokenService.getUsername() };
        console.log("User: " + TokenService.getUsername());

        DocumentService.postDocument(document).then(data => {
            navigate('/documents/' + data);
        });
    }



    const generateCover = (event) => {

        event.preventDefault();

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
            setCover(`data:image/png;base64,${data.images[0]}`);
            console.log("cover: " + cover);
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
                <img className='cover' src={cover}></img>
            </div>

            <div className='center-element vertical'>
                <p>Sinopsis</p>
                <textarea onChange={(event) => setSynopsis(event.target.value)} className='sinopsis-input'></textarea>
            </div>

            <div className='center-element'>
                <div className='chip-container'>
                    {genres.map((genre) => (
                        <Chip key={genre} data={genre} onDelete={() => handleGenreDelete(genre)} />
                    ))}
                </div>
            </div>

            <div className='formulary-line'>
                <label className='create-form-label'>
                    Etiquetas:
                </label>
                <input className='create-form-input' type="text" value={tags} onChange={(event) => setTags(event.target.value)} />
            </div>
            <div className='center-element'>

                <button onClick={createDocument} className='create-document-button'>Enviar</button>

            </div>
        </form>
    </>);
}

export default CreationFormulary;