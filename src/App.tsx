import { Container, Grid, Typography } from '@mui/material'
import { BookmarksList } from './BookmarksList'

export const App: React.FunctionComponent = () => {
    return (
        <Container sx={{ my: 2 }} maxWidth="lg">
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                    <Typography component="h1" variant="h3" align="center">
                        Bookmarks
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {/*
                     *<BookmarkAdd />
                     */}
                    <BookmarksList />
                </Grid>
            </Grid>
        </Container>
    )
}
