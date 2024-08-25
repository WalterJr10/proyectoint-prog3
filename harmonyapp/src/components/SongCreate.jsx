import React, { useState } from 'react'
import { useAuth } from './contexts/AuthContext'

function SongCreate() {

    const { token } = useAuth("state");

    const [file, setFile] = useState(null)
    const [cancion, setCancion] = useState({
        title: "",
        year: 0,
        song_file: file
    })

    const [cancionCreada, setCancionCreada] = useState(null)

    /* estado para no enviar multiples peticiones a la API y comprobar campos */
    const [submitting, setSubmitting] = useState(false);

    function handleArchiveChange(e){
        setFile(e.target.files[0]);

    }

    function handleInputChange(event){
        setCancion({
            ...cancion,
            [event.target.name] : event.target.value,
        });
    }

    function handleSubmit(event){
        event.preventDefault();
        if(!submitting){
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("title", cancion.title);
            newForm.append("year", cancion.year);
            newForm.append("song_file", file);


            fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/`,{
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`
                },
                body: newForm,
            })
                .then((response) => {
                    if(!response.ok){
                        throw new Error("No se pudo crear la cancion")
                    }
                    return response.json();
                })
                .then((data) => {
                    setCancionCreada(data)
                })
                .catch((error) => {
                    console.error("Error al cargar la cancion", error)
                })
                .finally(() => {
                    return setSubmitting(false)
                })

        }
        
    }

    return (
        <div className="section">
            <h3 className='title'>Crear cancion</h3>
            <div className='field box'>
                <form className='column is-two-fifths' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='label is-size-4'>Titulo:</label>
                        <input 
                            className='input is-medium'
                            type="text"
                            minLength="3"
                            maxLength="255"
                            name='title'
                            value={cancion.title}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label is-size-4'>Año:</label>
                        <input 
                            className='input is-medium'
                            type="number"
                            min="0"
                            max="2024"
                            name='year'
                            value={cancion.year}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className='label is-size-4 media'>Archivo</label>
                        <input 
                            type="file"
                            accept="audio/*"
                            onChange={handleArchiveChange}

                        />
                    </div>
                    <div className='mt-5'>
                        <button
                            className='button is-dark is-success'
                            type="submit"
                            disabled={submitting}
                        >
                                Crear cancion
                        </button>
                    </div>
                </form>
            </div>
            {cancionCreada ? (
                <div className='m-6'>
                    <h3 className='title'>¡Cancion creada con exito!</h3>
                    <p className='subtitle m-3'>Titulo: <span>{cancionCreada.title}</span></p>
                    <p className='subtitle m-3'>Año: <span>{cancionCreada.year}</span></p>
                    <p className='subtitle m-3'>ID Creador: <span>{cancionCreada.owner}</span></p>
                    <p className='subtitle m-3'>Fecha de creacion: <span>{cancionCreada.created_at}</span></p>
                    {cancionCreada.song_file ? (
                        <div>
                            <p className='subtitle m-3'>Escuchar</p>
                            <audio controls>
                                <source src={cancionCreada.song_file} type="audio/mpeg" />
                                    Tu navegador no soporta el elemento de audio.
                            </audio>

                        </div>
                    ) : null}
                    
                </div>
            ) : null }
            <a className='mt-4' href="/songs">Volver</a>
        </div>
    )
}

export default SongCreate