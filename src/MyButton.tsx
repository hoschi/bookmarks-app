import * as React from 'react'
import Button from '@mui/material/Button'

const text: string = 'text'

export const MyButton: React.FunctionComponent = () => {
    return <Button variant="contained">Hello {text}</Button>
}
