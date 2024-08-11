import React from 'react'
import { AuthProvider } from '../contexts/AuthContext'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <AuthProvider>
            <div>
                <Outlet />
            </div>
        </AuthProvider>
    )
}
