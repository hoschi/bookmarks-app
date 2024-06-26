import { Container, Grid, Typography } from '@mui/material'
import { BookmarksList } from './BookmarksList'
import { BookmarkAddForm } from './BookmarkAddForm'

export const App: React.FunctionComponent = () => {
    return (
        <Container sx={{ mt: 2, backgroundColor: 'grey.200', minHeight: '100vh' }} maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography component="h1" variant="h3" align="center">
                        Bookmarks
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <BookmarkAddForm />
                    <BookmarksList />
                </Grid>
            </Grid>
        </Container>
    )
}
