import React from 'react'
import { useGlobalContext } from './Context'

const Search = () => {
    const { quary, setQuary, isError } = useGlobalContext();

    const handleInputChange = (e) => {
        setQuary(e.target.value);
    };

    const handleSearch = () => {
        console.log(`Searching for: ${quary}`);
    };

    return (
        <>
            <section className="search-section">
                <h1>Search Your Favourite Movie ...</h1>
                <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input type="text" placeholder='Search Here ....'
                            value={quary}
                            onChange={(e) => setQuary(e.target.value)}
                        />
                    </div>
                </form>
                <div className="card-error">
                    <p>
                        {isError.show && isError.msg}
                    </p>
                </div>
            </section>
        </>
    )
}

export default Search