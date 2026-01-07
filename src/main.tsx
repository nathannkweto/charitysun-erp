import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { OpenAPI } from './client';

// 1. Set the Backend URL
OpenAPI.BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

// 2. Configure Token Injection
OpenAPI.TOKEN = async () => {
    return localStorage.getItem('token') || '';
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);