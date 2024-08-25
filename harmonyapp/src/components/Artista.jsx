import React, { useEffect, useState } from 'react'
import { useAuth } from './contexts/AuthContext';
import { ArtistaCard } from './ArtistaCard';

function Artista() {
    const [artists, setArtists] = useState([]);
    const [nextURL, setNextURL] = useState(null);
    const [pagina, setPagina] = useState(1);
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [ultimosArtistas, setUltimosArtistas] = useState([]);
    const [filter, setFilter] = useState({});


    const { token , user__id } = useAuth("state");


    let url = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?page=${pagina}`


    const doFetch = async () => {
        setIsLoading(true)
        let params = new URLSearchParams({
            page: pagina,
            ...filter
        }).toString();
        fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?${params}`)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a los artistas erroneo')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setArtists((prevArtists) => [...prevArtists, ...data.results]);
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

    function handleFiltrar(e){
        e.preventDefault();
        setUltimosArtistas([])
        
        const filterForm = new FormData(e.target);

        const newFilter = {}

        filterForm.forEach((value, key) => {
            if(value) {
                newFilter[key] = value
            }
        });

        setFilter(newFilter);
        setArtists([]);
        setPagina(1);        

    }

    function handleCargar() {
        if (nextURL) {
            setPagina((currentPage) => currentPage + 1);
        }
    }

    function handleOrder(e) {
        e.preventDefault();
        setIsLoading(true);
        const consulta = `${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/?ordering=-created_at`
        fetch(consulta)
            .then((response) => {
                if(!response.ok){
                    throw new Error('Solicitud a los artistas erroneo')
                }
                return response.json()
            })
            .then((data) => {
                if(data.results){
                    setUltimosArtistas(data.results)
                }
            })
            .catch((error) => {
                console.error(error, 'Error con el Data.')
            })
            .finally(() => {
                return setIsLoading(false)
            })
    }
    
    useEffect(() => {
        doFetch();
    }, [pagina, filter]);



    return (
        <div className='container'>
            <div className='card'>
                <header className='card-header'>
                    <a className='button is-info m-4' href="/profile">Mi perfil</a>
                    <a className='button is-link m-4' href="/playlists">Playlists</a>
                    <a className='button is-link m-4' href="/songs">Canciones</a>
                </header>
            </div>
            <div className="m-4">
                <h1 className='title'>Artistas</h1>
                <div className='my-4'>
                    <a className='button is-primary' href="/artistas/new">Crear artista</a>
                </div>

                <div className='is-flex is-justify-content my-3'>
                    <form className='box' onSubmit={handleFiltrar}>
                        <label htmlFor="title" className='label'>Buscar artista</label>
                        <input type="text" className='input' name='name' />
                        <button className='button is-dark is-primary my-3'>Buscar</button>
                    </form>
                </div>

                <div className='container content is-normal'>
                    <button className='button is-primary' onClick={handleOrder}>Ver ultimos artistas creados</button>
                    {ultimosArtistas ? (                    
                        <div className='content'>
                            <ul className='p-3'>
                                {ultimosArtistas.map((lastArtist) => (
                                    <ArtistaCard key={lastArtist.id} artist={lastArtist} userId={user__id} />
                                ))}
                            </ul>
                            <h4>Ultima actualizacion</h4>
                            <p>{new Date().toLocaleString("es-ES")}</p>
                            <p>Sigue navegando en nuestra web disfrutando de todos nuestros artistas</p>
                        </div>
                    ) : null}
                </div>
                <div className='container box'>
                    <ul>
                        {artists.map((artist) => (
                            <ArtistaCard key={artist.id} artist={artist} userId={user__id} />
                        ))}
                    </ul>
                </div>
                <div className='container'>
                    <button className='button is-link' onClick={handleCargar}>Cargar artistas</button>
                </div>
            </div>


        </div>
    )
}

export default Artista