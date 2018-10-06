import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

/*
 *import gql from 'graphql-tag'
 *client
 *    .query({
 *        query: gql`
 *            {
 *                allBookmarks {
 *                    title
 *                    isRead
 *                }
 *            }
 *        `,
 *    })
 *    .then((result) => console.log(result))
 *
 */
function BookmarksList() {
    return (
        <Paper>
            <Typography component="div">My List</Typography>
        </Paper>
    )
}

export default BookmarksList
