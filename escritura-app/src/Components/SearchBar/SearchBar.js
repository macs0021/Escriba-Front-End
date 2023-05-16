import './SearchBar.css';

export default function SearchBar({ value, setValue }) {
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  
    return (
      <>
        <div className="input-wrapper">
          <div className="fa fa-search"></div>
          <input
            className="search-bar-input"
            type="text"
            placeholder="Search"
            value={value}
            onChange={handleChange}
          />
          <div className="fa fa-times"></div>
        </div>
      </>
    );
  }