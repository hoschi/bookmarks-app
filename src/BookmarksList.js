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
import Paper from '@material-ui/core/Paper'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

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
        <Query
            query={gql`
                {
                    allBookmarks(sortField: "isRead", sortOrder: "ASC") {
                        id
                        title
                        url
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
                            <List disablePadding>
                                {allBookmarks.map(({ id, title, url, isRead }, i) => (
                                    <Fragment key={id}>
                                        <ListItem component="a" href={url} className={classes.link}>
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
}

BookmarksList.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(BookmarksList)
