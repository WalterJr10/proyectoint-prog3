import React, { useEffect, useState } from 'react';
import { useAuth } from './contexts/AuthContext';

export default function ArtistDelete({ isOpen, onClose, artist_id, artist_name }) {
    const { token } = useAuth("state");
    const [isLoading, setIsLoading] = useState(false);
    const [dataDelete, setDataDelete] = useState(false);

    function handleConfirmDelete(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artist_id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${token}`
            },
        })
            .then((respDelete) => {
                if (!respDelete.ok) {
                    console.log("Error al eliminar el artista");
                    return;
                }
                setDataDelete(true);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    location.reload();
                }, 500);
            });
    }

    useEffect(() => {
        if (dataDelete) {
            onClose();
        }
    }, [dataDelete]);

    if (!isOpen) return null;

    return (
        <div className='section'>
            <p className='title is-4'>Eliminarás el artista {artist_name}. ¿Deseas continuar?</p>
            <button
                className='button m-4'
                onClick={onClose}
            >Cancelar</button>
            <form onSubmit={handleConfirmDelete}>
                <button
                    className='button is-danger m-4'
                    type="submit"
                    disabled={isLoading}
                >
                    {isLoading ? "Eliminando..." : "Eliminar"}
                </button>
            </form>
        </div>
    );
}