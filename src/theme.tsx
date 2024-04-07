import { createTheme } from '@mui/material/styles'
import { red } from '@mui/material/colors'
import { Theme } from '@emotion/react'

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
})
