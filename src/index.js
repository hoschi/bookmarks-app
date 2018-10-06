import React from 'react'
import { render } from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import CssBaseline from '@material-ui/core/CssBaseline'
import App from './App'

const client = new ApolloClient({
    uri: 'http://localhost:3009/graphql',
})
const rootElement = global.document.querySelector('#root')
if (rootElement) {
    render(
        <ApolloProvider client={client}>
            <CssBaseline />
            <App />
        </ApolloProvider>,
        rootElement
    )
}
