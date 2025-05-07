import React from 'react'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div className="flex flex-col min-w-full items-start ml-25 justify-center bg-BG text-text">
            <h1 className="text-6xl font-bold text-prime">404</h1>
            <p className="text-lg mt-2">Oops! The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="mt-4 px-6 py-3 bg-second text-BC rounded-lg text-lg font-medium shadow-md hover:bg-opacity-80 transition"
            >
                Go Home
            </Link>
        </div>
    )
}

export default NotFound