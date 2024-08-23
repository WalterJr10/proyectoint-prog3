import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const PlaylistCard = ({ playlist, userId }) => {

    const navigate = useNavigate();
    const { id, name, description, public: isPublic, entries, owner } = playlist;
    const [arraySongs, setArraySongs] = useState([])
    const [songs, setSongs] = useState(null);
    const [loadSongs, setLoadSongs] = useState(false);



    function checkeoSong(){
        setLoadSongs(true)
        for (let i = 0; i < playlist.entries.length; i++) {
            fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${playlist.entries[i]}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('error playlist entrie');
                }
                return response.json();
            })
            .then((data) => {
                setSongs(data)
                
            })

        }

    }

    return (
        <div>
            <div className='container m-5'>
                <h3 className='title is-size-4'>{name}</h3>
                <p className='subtitle'>Descripción: <span>{description ? description : "No especificada"}</span></p>
                <p className='subtitle'>Pública: <span>{isPublic ? "Sí" : "No"}</span></p>
            </div>
            <div className='m-3'>
                <button className='button' onClick={() => {navigate(`/playlists/${playlist.id}`)}}>Ver playlist</button>
            </div>
        </div>
    );
};