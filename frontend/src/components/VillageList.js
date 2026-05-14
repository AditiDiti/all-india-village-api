import { useEffect, useState } from 'react';
import axios from 'axios';

function VillageList({ subdistrictId }) {

    const [villages, setVillages] = useState([]);

    useEffect(() => {

        const fetchVillages = async () => {

            try {

                const response = await axios.get(
                    `http://localhost:5000/api/villages/${subdistrictId}`
                );

                setVillages(response.data.data);

            } catch (error) {

                console.error(error);
            }
        };

        if (subdistrictId) {

            fetchVillages();

        } else {

            setVillages([]);
        }

    }, [subdistrictId]);

    return (

        <div className="mt-5">

            <h4>
                Villages
            </h4>

            <ul className="list-group">

                {villages.map((village) => (

                    <li
                        key={village.id}
                        className="list-group-item"
                    >
                        {village.village_name}
                    </li>

                ))}

            </ul>

        </div>
    );
}

export default VillageList;