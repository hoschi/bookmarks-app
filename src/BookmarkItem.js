import * as R from 'ramda'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import { withStyles } from '@material-ui/core'
import React from 'react'
import { Mutation } from 'react-apollo'
import { changeBookmarkReadFlag, queryAllBookmarks } from './gql'

const styles = R.always({
    link: {
        color: 'inherit',
        textDecoration: 'none',
    },
    linkRead: {
        color: '#00000080',
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
                    <ListItem component="a" href={url} className={classes.link}>
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
                    </ListItem>
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
