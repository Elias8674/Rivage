import './toolBar.css'

import {useUpdate} from "../../services/UpdateContext.jsx";
import {postTp} from "../../services/apiService.js";
import {delay} from "motion";
import {useParams} from "react-router-dom";

const ToolBar = () => {
    const { sendUpdate } = useUpdate();
    const { id } = useParams();

    const  handleSave = async () => {
        await delay(2000);
        await sendUpdate();
        window.location.reload();
    }

    const handleNewTp = async () => {
        console.log("call api")
        await postTp("", "", id);
        console.log("tp created")
        window.location.reload();

    }

    return (
        <div className={"toolBar_container"}>
            <button className={"toolBar_container_save_button"} onClick={handleSave}>Sauvegarder</button>
            <button className={"toolBare_container_newTP_button"} onClick={handleNewTp}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10.494C0 10.7928 0.107071 11.0472 0.321212 11.2572C0.535353 11.4671 0.787878 11.5721 1.07879 11.5721H8.9212V19.4098C8.9212 19.7005 9.02625 19.9529 9.23636 20.1669C9.44645 20.381 9.701 20.488 9.99999 20.488C10.299 20.488 10.5555 20.381 10.7697 20.1669C10.9838 19.9529 11.0909 19.7005 11.0909 19.4098V11.5721H18.9211C19.2121 11.5721 19.4646 11.4671 19.6788 11.2572C19.8929 11.0472 20 10.7928 20 10.494C20 10.1952 19.8929 9.93875 19.6788 9.72474C19.4646 9.51072 19.2121 9.40372 18.9211 9.40372H11.0909V1.57814C11.0909 1.2874 10.9838 1.03503 10.7697 0.821018C10.5555 0.607006 10.299 0.5 9.99999 0.5C9.701 0.5 9.44645 0.607006 9.23636 0.821018C9.02625 1.03503 8.9212 1.2874 8.9212 1.57814V9.40372H1.07879C0.787878 9.40372 0.535353 9.51072 0.321212 9.72474C0.107071 9.93875 0 10.1952 0 10.494Z" fill="black" fill-opacity="0.85"/>
                </svg>
            </button>
        </div>
    )
}

export default ToolBar;