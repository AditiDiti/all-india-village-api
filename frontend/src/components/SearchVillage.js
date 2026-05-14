import { useEffect, useState } from 'react';
import axios from 'axios';

function SearchVillage() {

    const [query, setQuery] = useState('');

    const [results, setResults] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchResults = async () => {

            if (!query.trim()) {

                setResults([]);
                return;
            }

            setLoading(true);

            try {

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/search?village=${query}`
                )

                setResults(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

        const debounce = setTimeout(() => {

            fetchResults();

        }, 400);

        return () => clearTimeout(debounce);

    }, [query]);

    return (

        <div className="mt-5">

            <h3 className="mb-3">
                Search Villages
            </h3>

            <input
                type="text"
                className="form-control"
                placeholder="Type village name..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {loading && (

                <div className="text-center mt-4">

                    <div
                        className="spinner-border"
                        role="status"
                    >
                    </div>

                </div>
            )}

            {!loading && query && results.length === 0 && (

                <div className="alert alert-warning mt-4">

                    No villages found.

                </div>
            )}

            <div className="mt-4">

                {results.map((item) => (

                    <div
                        key={item.id}
                        className="card mb-3 shadow-sm border-0"
                    >

                        <div className="card-body">

                            <h5 className="card-title">
                                {item.village_name}
                            </h5>

                            <p className="mb-1">
                                <strong>Subdistrict:</strong>
                                {' '}
                                {item.subdistrict_name}
                            </p>

                            <p className="mb-1">
                                <strong>District:</strong>
                                {' '}
                                {item.district_name}
                            </p>

                            <p className="mb-0">
                                <strong>State:</strong>
                                {' '}
                                {item.state_name}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default SearchVillage;