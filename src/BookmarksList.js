import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import React, { Fragment } from 'react'
import { Query } from 'react-apollo'
import BookmarkItem from './BookmarkItem'
import { queryAllBookmarks } from './gql'

function BookmarksList() {
    return (
        <Query query={queryAllBookmarks}>
            {({ loading, error, data }) => {
                if (loading) return <p>Loading...</p>
                if (error) return <p>Query Error {error.toString()}</p>
                const { allBookmarks } = data

                return (
                    <Paper>
                        <Typography component="div">
                            <List disablePadding>
                                {allBookmarks.map((item, i) => (
                                    <Fragment key={item.id}>
                                        <BookmarkItem {...item} />
                                        {i !== allBookmarks.length - 1 && <Divider />}
                                    </Fragment>
                                ))}
                            </List>
                        </Typography>
                    </Paper>
                )
            }}
        </Query>
    )
}

export default BookmarksList
