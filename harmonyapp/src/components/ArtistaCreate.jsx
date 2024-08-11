import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';

export default function ArtistaCreate() {

    const { token } = useAuth("state");

    const [artista, setArtista] = useState({
        name: "",
        bio: "",
        website: ""
    })

    const [artistCreated, setArtistCreated] = useState(null);

    const [submitting, setSubmitting] = useState(false);

    function handleInputChange(event) {
        setArtista({
            ...artista,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!submitting) {
            setSubmitting(true);
            const newForm = new FormData();
            newForm.append("name", artista.name);
            newForm.append("bio", artista.bio);
            newForm.append("website", artista.website);

            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/artists/`, {
                method: "POST",
                headers: {
                    Authorization: `Token ${token}`
                },
                body: newForm,
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("No se pudo crear el artista");
                    }
                    return response.json();
                })
                .then((data) => {
                    setArtistCreated(data);
                })
                .catch((error) => {
                    console.error("Error al crear el artista", error);
                })
                .finally(() => {
                    return setSubmitting(false);
                });
        }
    }


    return (
        <div>
            <div className='column is-half'>
                <h3 className='title'>Crea tu propio artista</h3>
            </div>
            <div>
                <form className='form m-3' onSubmit={handleSubmit}>
                    <div className=''>
                        <label>Nombre:</label>
                        <input
                            className='input' 
                            type="text"
                            name="name"
                            value={artista.name}
                            onChange={handleInputChange}
                            minLength="1"
                            maxLength="255"
                            required
                        />
                    </div>
                    <div>
                        <label>Biografía:</label>
                        <textarea
                            className='textarea'
                            name="bio"
                            value={artista.bio}
                            onChange={handleInputChange}
                            maxLength="500"
                        />
                    </div>
                    <div>
                        <label>Página Web:</label>
                        <input 
                            className='input'
                            type="text"
                            name="website"
                            value={artista.website}
                            onChange={handleInputChange}
                            maxLength="200"
                        />
                    </div>
                    <div>
                        <button
                            className='button is-success mt-3'
                            type="submit"
                            disabled={submitting}
                        >
                            Crear Artista
                        </button>
                    </div>
                </form>
            </div>
            {artistCreated ? (
                <div className='notification is-success'>
                    <h3 className='title is-2 p-2'>¡Artista creado con éxito!</h3>
                    <p className='subtitle is-3'>Nombre: <span>{artistCreated.name}</span></p>
                    <p className='subtitle is-4'>Biografía: <span>{artistCreated.bio}</span></p>
                    <p className='subtitle is-4'>Página Web: <span>{artistCreated.website}</span></p>
                </div>
            ) : null }
            <div>
                <a className='button is-warning m-3' href="/artistas">Volver</a>
            </div>
        </div>
    )

}
