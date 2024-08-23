import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';

export default function SongEdit({ isOpen, onClose, song_id  }) {

    let url = `${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`

    const { token } = useAuth("state");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [cancion, setCancion] = useState({})
    const [cancionEdit, setCancionEdit] = useState({
        title: "",
        year: 0
    })

    /* estado para no enviar multiples peticiones a la API y comprobar campos */
    const [submitting, setSubmitting] = useState(false);

    const doFetch = async () => {
        setIsLoading(true)
        fetch(url,{
            method: "GET",
            headers: {
                Authorization: `Token ${token}`
            },
        })
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a la cancion a editar erronea')
                }
                return response.json()
            })
            .then((data) => {
                if(data){
                    setCancion(data);
                }
            })
            .catch((error) => {
                console.error(error, 'Error con el Data.')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }

    function handleInputChange(e){
        setCancionEdit({
            ...cancionEdit,
            [e.target.name] : e.target.value,
        });
    }

    function handleSubmit(e){
        e.preventDefault();
        if(!submitting){
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", cancionEdit.title)
            newForm.append("year", cancionEdit.year)

            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${song_id}/`,{
                method: "PATCH",
                headers: {
                    Authorization: `Token ${token}`
                },
                body: newForm,
            })
                .then((response) => {
                    if(!response.ok){
                        setIsError(true)
                        throw new Error("No se pudo Editar la cancion")
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.error("Error al editar la cancion", error)
                })
                .finally(() => {
                    location.reload()
                    return setSubmitting(false)
                })
        }

    }

    useEffect(() => {
        doFetch();
    }, [url]);

    if (!isOpen) return null;

    return (
        <div className=''>
            <div className='section'>
                <p className='title'>Editar cancion</p>
                {isLoading ? <h3>Cargando...</h3> : null }
                <form className='column is-two-fifths' onSubmit={handleSubmit}>
                    <div className='container'>
                        <label className='subtitle m-2' htmlFor="title">Titulo: {cancion.title} </label>
                        <label className='label m-2' htmlFor="title">Nuevo titulo:</label>
                        <input 
                            className='input is-rounded mb-3'
                            type="text"
                            minLength="3"
                            maxLength="255"
                            name='title'
                            value={cancionEdit.title}
                            onChange={handleInputChange}
                        />
                        <label className='subtitle m-2' htmlFor="year">Año: {cancion.year} </label>
                        <label className='label m-2' htmlFor="year">Cambiar año:</label>
                        <input 
                            className='input is-rounded mb-3'
                            type="number"
                            min="0"
                            max="2024"
                            name='year'
                            value={cancionEdit.year}
                            onChange={handleInputChange}
                        />
                        
                    </div>
                    <button className='mt-4 is-flex button is-primary is-dark' type='submit' disabled={submitting}>
                        Confirmar edición
                    </button>
                    {isError ? <p>Error al editar</p> : null }
                </form>
                <button
                    className="button is-dark grid"
                    onClick={onClose}
                >Cancelar</button>
            </div>

        </div>
    )
}
