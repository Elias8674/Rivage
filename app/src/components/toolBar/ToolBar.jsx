import './toolBar.css'

import {useUpdate} from "../../services/UpdateContext.jsx";
import {delay} from "motion";

const ToolBar = () => {
    const { sendUpdate } = useUpdate();

    const  handleSave = async () => {
        await delay(2000);
        await sendUpdate();
        window.location.reload();
    }

    return (
        <div className={"toolBar_container"}>
            <button className={"toolBar_container_save_button"} onClick={handleSave}>Sauvegarder</button>
        </div>
    )
}

export default ToolBar;