import * as React from 'react'
import { Typography, List, Divider, Paper } from '@mui/material'
import { queryAllBookmarks } from './gql'
import { useQuery } from '@apollo/client'
import { BookmarkItem } from './BookmarkItem'

export const BookmarksList: React.FC = () => {
    const { loading, error, data } = useQuery(queryAllBookmarks)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Query Error {error.toString()}</p>

    const bookmarks = data?.allBookmarks || []
    return (
        <Paper>
            <Typography component="div">
                <List disablePadding>
                    {bookmarks.map((item, i: number) => {
                        // why can this be null? I gues this is, because json-graphql-server returns [Bookmark] and not [Bookmark!]. See https://www.apollographql.com/blog/using-nullability-in-graphql#nullability-and-lists
                        if (!item) {
                            throw new Error(`items from server shouldn't be null`)
                        }

                        return (
                            <React.Fragment key={item.id}>
                                <BookmarkItem bookmark={item} />
                                {i !== bookmarks.length - 1 && <Divider />}
                            </React.Fragment>
                        )
                    })}
                </List>
            </Typography>
        </Paper>
    )
}
