import * as React from 'react'
import { Typography, List, Divider, Paper } from '@mui/material'
import { queryAllBookmarks } from './gql'
import { useQuery } from '@apollo/client'

// FIXME add type from GQL to `item` below
export const BookmarksList: React.FunctionComponent = () => {
    const { loading, error, data } = useQuery(queryAllBookmarks)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Query Error {error.toString()}</p>
    const { allBookmarks } = data
    return (
        <Paper>
            <Typography component="div">
                <List disablePadding>
                    {allBookmarks.map((item: any, i: number) => (
                        <React.Fragment key={item.id}>
                            {item.title}
                            {i !== allBookmarks.length - 1 && <Divider />}
                        </React.Fragment>
                    ))}
                </List>
            </Typography>
        </Paper>
    )
}
