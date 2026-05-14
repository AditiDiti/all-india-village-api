import { useEffect, useState } from 'react';
import axios from 'axios';

function StateDropdown({
    selectedState,
    setSelectedState
}) {

    const [states, setStates] = useState([]);

    useEffect(() => {

        const fetchStates = async () => {

            try {

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/states`
                )

                setStates(response.data);

            } catch (error) {

                console.error(error);
            }
        };

        fetchStates();

    }, []);

    return (

        <div className="mt-4">

            <label className="form-label">
                Select State
            </label>

            <select
                className="form-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
            >

                <option value="">
                    -- Select State --
                </option>

                {states.map((state) => (

                    <option
                        key={state.id}
                        value={state.id}
                    >
                        {state.state_name}
                    </option>

                ))}

            </select>

        </div>
    );
}

export default StateDropdown;