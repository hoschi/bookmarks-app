import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Checkbox from '@material-ui/core/Checkbox'
import DeleteIcon from '@material-ui/icons/Delete'
import { withStyles } from '@material-ui/core'
import React from 'react'
import { Mutation } from 'react-apollo'
import { changeBookmarkReadFlag, removeBookmark, queryAllBookmarks } from './gql'

const styles = R.always({
    root: {
        color: 'inherit',
        textDecoration: 'none',
    },
    listItemContainer: {
        '&:hover $remove': {
            opacity: 1,
        },
    },
    linkRead: {
        color: '#00000080',
    },
    remove: {
        opacity: 0,
    },
})

function BookmarkItem({ classes, id, title, url, isRead }) {
    return (
        <Mutation
            mutation={changeBookmarkReadFlag}
            ignoreResults
            refetchQueries={[{ query: queryAllBookmarks }]}
        >
            {(updateBookmark) => {
                return (
                    <Mutation
                        mutation={removeBookmark}
                        ignoreResults
                        refetchQueries={[{ query: queryAllBookmarks }]}
                    >
                        {(removeBookmark) => {
                            return (
                                <ListItem
                                    component="a"
                                    href={url}
                                    className={classes.root}
                                    classes={{ container: classes.listItemContainer }}
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
                                        classes={{
                                            primary: classNames({
                                                [classes.linkRead]: isRead,
                                            }),
                                        }}
                                    />
                                    <ListItemSecondaryAction className={classes.remove}>
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
                        }}
                    </Mutation>
                )
            }}
        </Mutation>
    )
}

BookmarkItem.propTypes = {
    classes: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isRead: PropTypes.bool.isRequired,
}

export default withStyles(styles)(BookmarkItem)
