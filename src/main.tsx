import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import theme from './core/theme'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'

import { AuthProvider } from './core/auth/AuthContext'
import { RBACProvider } from './core/rbac/RBACContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <AuthProvider>
                        <RBACProvider>
                            <App />
                        </RBACProvider>
                    </AuthProvider>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
)
