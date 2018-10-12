import * as R from 'ramda'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import { Query, Mutation } from 'react-apollo'
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

function BookmarksList({ classes }) {
    return (
        <Mutation
            mutation={changeBookmarkReadFlag}
            ignoreResults
            refetchQueries={[{ query: queryAllBookmarks }]}
        >
            {(updateBookmark) => {
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
                                            {allBookmarks.map(({ id, title, url, isRead }, i) => (
                                                <Fragment key={id}>
                                                    <ListItem
                                                        component="a"
                                                        href={url}
                                                        className={classes.link}
                                                    >
                                                        <Checkbox
                                                            checked={isRead}
                                                            aria-label={
                                                                isRead ? 'Mark unread' : 'Mark read'
                                                            }
                                                            tabIndex={-1}
                                                            onChange={() => {
                                                                updateBookmark({
                                                                    variables: {
                                                                        id: id.toString(),
                                                                        isRead: !isRead,
                                                                    },
                                                                })
                                                            }}
                                                            disableRipple
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
            }}
        </Mutation>
    )
}

BookmarksList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BookmarksList)
