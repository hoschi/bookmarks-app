import * as React from 'react'
import { Bookmark } from './__generated__/graphql'
import {
    ListItem,
    Checkbox,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useMutation } from '@apollo/client'
import {
    changeBookmarkReadFlag,
    removeBookmark as removeBookmarkMutation,
    queryAllBookmarks,
} from './gql'

export const BookmarkItem: React.FC<{ bookmark: Bookmark }> = ({ bookmark }) => {
    const { id, title, url, isRead } = bookmark
    const [updateBookmark, { error: updateBookmarkError }] = useMutation(changeBookmarkReadFlag, {
        refetchQueries: [queryAllBookmarks],
    })
    const [removeBookmark, { error: removeBookmarkError }] = useMutation(removeBookmarkMutation, {
        refetchQueries: [queryAllBookmarks],
    })

    if (updateBookmarkError) throw new Error(updateBookmarkError.toString())
    if (removeBookmarkError) throw new Error(removeBookmarkError.toString())

    return (
        <ListItem
            component="a"
            href={url}
            sx={{
                color: 'inherit',
                textDecoration: 'none',
                '&:hover + .MuiListItemSecondaryAction-root, & + .MuiListItemSecondaryAction-root:hover':
                    {
                        opacity: 1,
                    },
            }}
        >
            <Checkbox
                disableRipple
                checked={isRead}
                aria-label={isRead ? 'Mark unread' : 'Mark read'}
                tabIndex={-1}
                onChange={() => {
                    updateBookmark({
                        variables: {
                            id: id,
                            isRead: !isRead,
                        },
                        optimisticResponse: {
                            __typename: 'Mutation',
                            updateBookmark: {
                                id,
                                __typename: 'Bookmark',
                                isRead: !isRead,
                            },
                        },
                    })
                }}
            />
            <ListItemText
                primary={title}
                sx={{ color: isRead ? { color: '#00000080' } : undefined }}
            />
            <ListItemSecondaryAction
                sx={{
                    opacity: 0,
                }}
            >
                <IconButton
                    aria-label="remove item"
                    onClick={() => {
                        removeBookmark({
                            variables: {
                                id,
                            },
                        })
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
