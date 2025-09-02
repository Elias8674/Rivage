import ListeCours from "../components/cours/ListeCours.jsx";
import './home.css'
import Header from "../components/header/Header.jsx";

const Home = () => {

    return (
        <div className='home_container'>
            <Header/>
            <div className='home_content_container'>
                <div>
                    <h1 className='home_content_container_title' >Retrouvez tout vos TP</h1>
                </div>
                <div>
                    <ListeCours/>
                </div>

            </div>
        </div>

    )
}

export default Home;