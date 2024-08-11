import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { SongCard } from './SongCard';
import { useAuth } from './contexts/AuthContext';


export default function Songs() {

    const [songs, setSongs] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(null);
    const [pagina, setPagina] = useState(1);

    const { token , user__id } = useAuth("state");


    let url = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?page=${pagina}`
    let paginaOwner = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/songs/?owner=${user__id}`

    /* 
        Funcion asincrona doFetch que realiza una solicitud a la API
        incorporando paginacion
        Setteando pagina y utilizando estados para mejorar funcionalidad
    */

    const doFetch = async () => {
        setIsLoading(true)
        fetch(url)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a las canciones erronea')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setSongs((prevSongs) => [...prevSongs, ...data.results]);
                    setNextURL(data.next);
                }
            })
            .catch((error) => {
                setIsError(true)
                console.error(error, 'Error con el Data.')
            })
            .finally(() => {
                setIsLoading(false)
            })

    }
    
    /* handle que maneja el boton 'Mis canciones' para la eliminacion o edicion */

    function handleMySongs(){
        setSongs([]);
        setIsLoading(true);
        fetch(paginaOwner)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a las canciones erronea')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setSongs(data.results)
                }
            })
            .catch((error) => {
                setIsError(true)
                console.error(error, 'Error con mis canciones.')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    /* funcion handleLoadMore implementada en clases */
    function handleCargar(){

        if(nextURL){
            setPagina((currentPage) => currentPage + 1)
        }
    }

    useEffect(() => {
        doFetch();
    }, [pagina]);

    return (
        <div>
            <header className='m-4 mb-2 p-4'>
                <a className='button is-primary is-dark is-outlined p-2 m-2' href="/profile">Mi perfil</a>
                <a className='button is-link is-dark is-outlined p-2 m-2' href="/playlists">Playlists</a>
                <a className='button is-link is-dark is-outlined p-2 m-2' href="/artistas">Artistas</a>
            </header>
            <div className='m-4'>
                <h1 className='title'>Canciones</h1>
                
                {
                    isLoading ? (
                        <p>Cargando canciones</p>
                    ) : (
                        null
                    )
                }
                <div className='m-2 is-flex'>
                    <div className='is-flex mx-4'>
                        <a className='button is-primary' href="/songs/new/">Crear canción</a>
                    </div>
                    <div className='is-flex is-justify-content-flex-end'>
                        <button className='button is-dark is-primary ' onClick={handleMySongs}>Mis canciones</button>

                    </div>
                </div>
                <ul>
                    {songs.map((song) => (
                        <SongCard key={song.id} song={song} userId={user__id}/>
                    ))}
                </ul>
                <div>
                    {isLoading && <p>Cargando más canciones...</p>}
                    {nextURL && !isLoading && (
                        <button
                            className="button is-link m-2"
                            onClick={handleCargar}
                        >
                            Cargar más
                        </button>
                    )}
                </div>
                <Footer/>
            </div>


        </div>
    )
}
