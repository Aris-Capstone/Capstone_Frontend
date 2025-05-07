export default function SearchBar(props) {
    return (
        <div className="search-bar">
            <label>
                Search:
                <input value={props.searchParamater}
                    onChange={(event) => props.setSearchParamater(event.target.value)}
                    type="text"
                />
            </label>
        </div>
    );
}