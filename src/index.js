import React from 'react'
import { render } from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'

const rootElement = global.document.querySelector('#root')
if (rootElement) {
    render(
        <div>
            <CssBaseline />
            <App />
        </div>,
        rootElement
    )
}
