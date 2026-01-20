import './toolBar.css'

import {useUpdate} from "../../services/UpdateContext.jsx";
import {postTp, deleteData} from "../../services/apiService.js";
import {delay} from "motion";
import {useParams, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import {useMemo, useState} from "react";

const ToolBar = (props) => {
    const { sendUpdate, hasUpdate } = useUpdate();
    const [ isUpdate, setIsUpdate ] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    // gérer le cas ou la save passe pas
    const  handleSave = async () => {
        setIsUpdate(true);
        await delay(2000);
        await sendUpdate();
        navigate(0);
    }

    const handleNewTp = async () => {
        await postTp("", "", id);
        navigate(0);

    }

    const handleDelete = async () => {
        const confirmDelete = window.confirm("Voulez vous vraiment supprimer ce cours ?");
        if (confirmDelete) {
            await deleteData('cours', id);
            navigate("/");
        }
    }

    //permet de changer d'état notre bouton de save
    const saveButtonClass = useMemo(() => {
        if (!hasUpdate()) return "toolBar_container_save_button disabled";
        if (isUpdate) return "toolBar_container_save_button saving";
        return "toolBar_container_save_button ready";
    },[isUpdate, hasUpdate]);

    return (
        <div className={"toolBar_container"}>

             <button className={"toolBare_container_newTP_button"} onClick={handleNewTp}>
                <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 10.494C0 10.7928 0.107071 11.0472 0.321212 11.2572C0.535353 11.4671 0.787878 11.5721 1.07879 11.5721H8.9212V19.4098C8.9212 19.7005 9.02625 19.9529 9.23636 20.1669C9.44645 20.381 9.701 20.488 9.99999 20.488C10.299 20.488 10.5555 20.381 10.7697 20.1669C10.9838 19.9529 11.0909 19.7005 11.0909 19.4098V11.5721H18.9211C19.2121 11.5721 19.4646 11.4671 19.6788 11.2572C19.8929 11.0472 20 10.7928 20 10.494C20 10.1952 19.8929 9.93875 19.6788 9.72474C19.4646 9.51072 19.2121 9.40372 18.9211 9.40372H11.0909V1.57814C11.0909 1.2874 10.9838 1.03503 10.7697 0.821018C10.5555 0.607006 10.299 0.5 9.99999 0.5C9.701 0.5 9.44645 0.607006 9.23636 0.821018C9.02625 1.03503 8.9212 1.2874 8.9212 1.57814V9.40372H1.07879C0.787878 9.40372 0.535353 9.51072 0.321212 9.72474C0.107071 9.93875 0 10.1952 0 10.494Z" fill="black" fillOpacity="0.85"/>
                </svg>
            </button>

            <button
                className={saveButtonClass}
                onClick={handleSave}
                disabled={!hasUpdate() || isUpdate}
            >Sauvegarder
            </button>

            <div className={"toolBar_container_divider"}></div>

            <button className={"toolBar_container_delete_button"} onClick={handleDelete}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5M5 6H21M5 6V20C5 20.5304 5.21071 21.0391 5.58579 21.4142C5.96086 21.7893 6.46957 22 7 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M10 11V17M14 11V17" stroke="#E40C04" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    )
}

ToolBar.propTypes = {
    reload: PropTypes.func.isRequired,
}


export default ToolBar;