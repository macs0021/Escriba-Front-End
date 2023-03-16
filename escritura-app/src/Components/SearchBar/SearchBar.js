import './SearchBar.css';

export default function SearchBar() {
    return (<>
        <div class="input-wrapper">
            <div class="fa fa-search"></div>
            <input type="text" placeholder="Search" />
            <div class="fa fa-times"></div>
        </div>
    </>);
}