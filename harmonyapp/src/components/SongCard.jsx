import React, { useState } from 'react'
import SongDelete from './SongDelete';
import SongEdit from './SongEdit';

export const SongCard = ({ song, userId }) => {

    const [ModalDeleteOpen, setModalDeleteOpen] = useState(false);
    const [modalEditOpen, setModalEditOpen] = useState(false);
    const { title, duration, year, view_count } = song;


    return (
        <div className='my-3'>
            <div className='content mt-3 mb-4 m-4'>
                <h3 className='title'>{title}</h3>
                <p className='subtitle mt-4'>Duración: <span> { duration ? duration + " segundos" : "Sin especificacion" }</span></p>
                <p className='subtitle mt-4'>Año: <span> { year ? year : "No especificado" }</span></p>
                <p className='subtitle mt-4'> { view_count } <span>vistas</span></p>
                <audio controls>
                        <source src={song.song_file} type="audio/mpeg" />
                        Tu navegador no soporta el elemento de audio.
                </audio>
            </div>
                {/* 
                    Dentro de este div se comprueba al creador de la cancion con el ID de usuario
                    luego de comprobar tendra permisos de Eliminar o Editar respectivamente

                */}
                <div className='p-3'>
                    { song.owner == userId ? (
                        <div className="m-4" onClick={() => setModalDeleteOpen(true)}>
                            <button className="button is-danger is-dark">Eliminar</button>
                        </div>                    
                    ) : null }
                    { ModalDeleteOpen ?
                        <SongDelete
                            isOpen={ModalDeleteOpen}
                            onClose={() => setModalDeleteOpen(false)}
                            song_id={song.id}
                        />
                    : null }
                    { song.owner == userId ? (
                        <div className="m-4" onClick={() => setModalEditOpen(true)}>
                            <button className="button is-warning is-dark">Editar</button>
                        </div>                    
                    ) : null }
                    { modalEditOpen ? <SongEdit 
                        isOpen={modalEditOpen}
                        onClose={() => setModalEditOpen(false)}
                        song_id={song.id}
                        
                        />
                    : null }
                </div>

        </div>
        
    )
}
