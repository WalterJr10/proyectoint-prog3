import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';
import ArtistDelete from './ArtistaDelete';


export const ArtistaCard = ({ artist, userId }) => {

    const { user__id } = useAuth("state");

    const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
    const { name, bio, website, created_at, updated_at } = artist;

    return (
        <div>
            <div className='container m-5'>
                <h2 className='title'> {name} </h2>
                <div>
                    <p className='subtitle'>Biografía: <span> {bio ? bio : "Sin datos."} </span></p>
                    <p className='subtitle'>Página web: <span className='tag is-link'>{website ? <a className='has-text-white' href={website} target="_blank" rel="noopener noreferrer">{website}</a> : "No especificada"}</span></p>
                    <p className='subtitle'>Creado: <span> { new Date(created_at).toLocaleDateString("es-ES") } </span></p>
                </div>
            </div>
            <div>
                {artist.owner == userId ? (
                    <>
                        <div className="column" onClick={() => setModalDeleteOpen(true)}>
                            <button className="button is-danger">Eliminar</button>
                        </div>
                        {modalDeleteOpen ? (
                            <ArtistDelete
                                isOpen={modalDeleteOpen}
                                onClose={() => setModalDeleteOpen(false)}
                                artist_id={artist.id}
                                artist_name = {artist.name}
                            />
                        ) : null}
                    </>
                ) : null}
            </div>
        </div>
    )

}
