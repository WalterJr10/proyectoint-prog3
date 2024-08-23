import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";


export const PlaylistView = () => {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [plist, setPlist] = useState({});
    //const [balada, setBalada] = useState({})
    const { user__id } = useAuth('state');


    // function songFetch(idSong){

    //     fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/songs/${idSong}`)
    //         .then((response) => {
    //             if(!response.ok){
    //                 throw new Error('Error')
    //             }
    //             return response.json();
    //         })
    //         .then((data) => {
    //             setBalada(data);
    //         })
    //         .catch((error) => {
    //             console.log('Error', error)
    //         })

    // }

    useEffect(() => {
        setIsLoading(true)
        fetch(`${import.meta.env.VITE_API_BASE_URL}/harmonyhub/playlists/${id}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Error')
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setPlist(data);
            })
            .catch((error) => {
                console.log('Error', error)
            })
            .finally(() => {
                return setIsLoading(false)
            })


    },[])



    if(isLoading) return <p>Cargando...</p>;


    return (
        <div>
            <div>
                <h1 className="title m-5"> {plist.name} </h1>
                <p className="subtitle mx-5">Creada: {plist.created_at} </p>
            </div>
            <div>

                {plist.entries ? (
                    <div>
                        <ul>
                            {plist.entries.map((entrie) => (
                                
                                <li key={entrie} className="subtitle m-5">
                                    ID Cancion: {entrie} 
                                </li>
                            ))}
                        </ul>
                    </div>
                ): null}

            </div>
            <div className="m-5">
                <p className="subtitle"> ID de creador: {plist.owner} </p>
                <p className="subtitle"> Descripcion: {plist.description} </p>
                <p className="subtitle"> Ultima actualizacion: {plist.updated_at} </p>
            </div>

            <div className="mx-3">
                <a href="/playlists" className="button is-link is-outlined">Volver</a>

            </div>
        </div>
    )
}
