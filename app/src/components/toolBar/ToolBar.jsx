import './toolBar.css'

import {useUpdate} from "../../services/UpdateContext.jsx";

const ToolBar = () => {
    const { sendUpdate } = useUpdate();



    return (
        <div className={"toolBar_container"}>
            <button className={"toolBar_container_save_button"} onClick={sendUpdate}>Sauvegarder</button>
        </div>
    )
}

export default ToolBar;