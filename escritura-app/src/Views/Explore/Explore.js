import Tab from '../../Components/Tab/Tab'
import Galery from '../../Components/Galery/Galery'
import ImageGeneratorForm from '../../Components/TextEditor/ImageGeneratorForm';
export default function Explore() {



    function tab1() {
        return (
            <>
                <Galery cards={[]}/>
            </>
        )
    }

    const tabs = [
        { id: 1, title: 'Tab 1', content: tab1() },
        { id: 2, title: 'Tab 2', content: <ImageGeneratorForm/> },
        { id: 3, title: 'Hola', content: 'Contenido del Tab 3' },
    ];

    return (
        <>
            <h1>Explore</h1>
        </>
    );
}