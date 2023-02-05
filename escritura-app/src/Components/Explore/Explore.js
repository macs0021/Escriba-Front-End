import Tab from '../Tab/Tab'
import Galery from '../Galery/Galery'
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
        { id: 2, title: 'Tab 2', content: 'Contenido del Tab 2' },
        { id: 3, title: 'Hola', content: 'Contenido del Tab 3' },
    ];

    return (
        <>
            <h1>Explore</h1>
            <Tab tabs={tabs} />
        </>
    );
}