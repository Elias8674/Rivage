import PropsTypes from 'prop-types';
import Cours from "./Cours.jsx";

const ListeCours = () => {
    const [cours, setCours] = useState([]);

    const fetchCours = async () => {
        const response = await fetch('http://backend:8000/cours/');
        const data = await response.json();
        setCours(data);
    }



    return (
        <div>
            <h1>Liste Cours</h1>
            {cours.map((cour, index) => {
                return (
                    <Cours id={id} name={nom} />
                )
            })}
        </div>
    )
}