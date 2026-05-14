import { useEffect, useState } from 'react';
import axios from 'axios';

function SubdistrictDropdown({
    districtId,
    selectedSubdistrict,
    setSelectedSubdistrict
}) {

    const [subdistricts, setSubdistricts] = useState([]);

    useEffect(() => {

        const fetchSubdistricts = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:5000/api/subdistricts/${districtId}`
                );

                setSubdistricts(response.data);

            } catch (error) {

                console.error(error);
            }
        };

        if (districtId) {

            fetchSubdistricts();

        } else {

            setSubdistricts([]);
        }

    }, [districtId]);

    return (

        <div className="mt-4">

            <label className="form-label">
                Select Subdistrict
            </label>

            <select
                className="form-select"
                value={selectedSubdistrict}
                onChange={(e) => setSelectedSubdistrict(e.target.value)}
            >

                <option value="">
                    -- Select Subdistrict --
                </option>

                {subdistricts.map((subdistrict) => (

                    <option
                        key={subdistrict.id}
                        value={subdistrict.id}
                    >
                        {subdistrict.subdistrict_name}
                    </option>

                ))}

            </select>

        </div>
    );
}

export default SubdistrictDropdown;