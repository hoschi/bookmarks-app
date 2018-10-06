import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
function BookmarksList() {
    return (
        <Query
            query={gql`
                {
                    allBookmarks {
                        title
                        isRead
                    }
                }
            `}
        >
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Error {error.toString()}</p>
                const { allBookmarks } = data

                return (
                    <Paper>
                        <Typography component="div">
                            My List, items: {allBookmarks.length}
                        </Typography>
                    </Paper>
                )
            }}
        </Query>
    )
}

export default BookmarksList
