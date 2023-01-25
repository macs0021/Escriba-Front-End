import './SearchBar.css';

export default function SearchBar() {
    return (
        <>
            <div className='bar-container'>
                <form>
                    <label>
                        <input type="text" className='search-bar' />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
    );
}