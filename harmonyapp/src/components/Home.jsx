import React from 'react'
import Footer from './Footer';
import { useAuth } from './contexts/AuthContext';



function Home() {

    const urlApi = `${import.meta.env.VITE_API_BASE_URL}/docs/`

    return (
        <div>
            <div className='box has-text-centered'>
                <nav className="navbar-menu is-active grid">
                    <ul className='navbar-brand'>
                        <li className='navbar-item'><a className='button is-link is-dark is-outlined' href={urlApi}>Api</a></li>
                        <li className='navbar-item'><a className='button is-link is-dark is-outlined' href="/contacto">Contacto</a></li>
                        <li className='navbar-item'><a className='button is-primary is-dark is-outlined' href="/login">Iniciar sesion</a></li>
                    </ul>
                </nav>
            </div>
            <section className="section has-text-centered">
                <h1 className="title has-text-primary-white" >Welcome to music app</h1>
                
                <div className='content'>
                    <h3 className="subtitle has-text-info-light">En esta aplicacion se encuentran Playlists, Artistas y Canciones</h3>
                    <p className="has-text-grey-light">Para crear artistas y canciones deberás iniciar sesión</p>
                    <p className="has-text-grey-light">Navega libremente por la web</p>
                    <div className="buttons is-centered mt-5">
                        <a className='button is-link' href="/playlists">Ir a Playlists</a>
                        <a className='button is-link' href="/artistas">Ir a Artistas</a>
                        <a className='button is-link' href="/songs">Ir a Canciones</a>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Home