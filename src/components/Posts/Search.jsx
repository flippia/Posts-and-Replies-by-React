import './Search.css';
import { useState } from 'react';
import DropdownMenu from '../DropdownMenu/DropdownMenu';

const Search = () => {
    const [ open, setOpen ] = useState(false);

    return (  
        <div className="search" onClick={() => setOpen(true)}>
            Search
            { open && <DropdownMenu setOpen={setOpen}/> }
        </div>
    );
}
 
export default Search;