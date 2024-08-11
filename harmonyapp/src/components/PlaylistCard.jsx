import React, { useState } from 'react';

export const PlaylistCard = ({ playlist, userId }) => {

    const { name, description, public: isPublic, entries, owner } = playlist;

    return (
        <div>
            <div className='container m-5'>
                <h3 className='title is-size-4'>{name}</h3>
                <p className='subtitle'>Descripción: <span>{description ? description : "No especificada"}</span></p>
                <p className='subtitle'>Pública: <span>{isPublic ? "Sí" : "No"}</span></p>
                <p className='subtitle'>Canciones: <span>{entries ? entries : "No especificado"}</span></p>
            </div>
        </div>
    );
};