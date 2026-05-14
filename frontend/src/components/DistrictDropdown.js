import { useEffect, useState } from 'react';
import axios from 'axios';

function DistrictDropdown({
    stateId,
    selectedDistrict,
    setSelectedDistrict
}) {

    const [districts, setDistricts] = useState([]);

    useEffect(() => {

        const fetchDistricts = async () => {

            try {

                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/districts/${stateId}`
                )

                setDistricts(response.data);

            } catch (error) {

                console.error(error);
            }
        };

        if (stateId) {

            fetchDistricts();

        } else {

            setDistricts([]);
        }

    }, [stateId]);

    return (

        <div className="mt-4">

            <label className="form-label">
                Select District
            </label>

            <select
                className="form-select"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
            >

                <option value="">
                    -- Select District --
                </option>

                {districts.map((district) => (

                    <option
                        key={district.id}
                        value={district.id}
                    >
                        {district.district_name}
                    </option>

                ))}

            </select>

        </div>
    );
}

export default DistrictDropdown;