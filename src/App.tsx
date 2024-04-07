import { Box, Container, Typography } from '@mui/material'
import { orange } from '@mui/material/colors'
import styled from '@emotion/styled'

import { MyButton } from './MyButton'

const StyledDiv = styled.div`
    padding: 32px;
    background-color: ${orange.A400};
    font-size: 24px;
    border-radius: 4px;
    color: black;
    font-weight: bold;
    &:hover {
        color: white;
    }
`

export const App: React.FunctionComponent = () => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Tracking Reporter
                </Typography>
                <MyButton />
                <StyledDiv>blubs</StyledDiv>
            </Box>
        </Container>
    )
}
