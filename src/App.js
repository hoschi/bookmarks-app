import * as R from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import BookmarksList from './BookmarksList'

const styles = R.always({
    root: {
        margin: 16,
    },
    heading: {
        textAlign: 'center',
    },
})

function App({ classes }) {
    return (
        <div className={classes.root}>
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="display3" className={classes.heading}>
                        Bookmarks
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <BookmarksList />
                </Grid>
            </Grid>
        </div>
    )
}

App.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(App)
