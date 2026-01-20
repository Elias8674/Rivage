import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

export default function Dropzone({ onFilesDrop }) {
    const onDrop = (acceptedFiles) => {
        //console.log('Fichiers reçus :', acceptedFiles);
        // Appel de la fonction du parent
        if (onFilesDrop) {
            onFilesDrop(acceptedFiles);
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        noClick: false,
        noKeyboard: true,
    });

    return (
        <div
            {...getRootProps()}
            style={{
                border: '2px dashed #aaa',
                borderRadius: '10px',
                padding: '40px',
                textAlign: 'center',
                backgroundColor: isDragActive ? '#f0f8ff' : '#fafafa',
            }}
        >
            <input {...getInputProps()} />
            <p>{isDragActive ? 'déposez un document ici...' : 'Faites glisser et déposez un document ou cliquez pour sélectionner'}</p>
        </div>
    );
}

Dropzone.propTypes = {
    onFilesDrop: PropTypes.func
};