import { Grid, Button, TextField, withStyles, Paper } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { Form, withFormik } from 'formik'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import React from 'react'
import { setPropTypes } from 'recompose'
import { getNewBookmarkId } from './gql'

export const getTextFieldDefaultProps = (
    id,
    { handleChange, handleBlur, values, errors, touched }
) => ({
    id,
    margin: 'normal',
    onChange: handleChange,
    onBlur: handleBlur,
    value: R.propOr('', id, values),
    error: !!(touched[id] && errors[id]),
    helperText: touched[id] && errors[id] ? errors[id] : undefined,
    fullWidth: true,
})

const styles = (theme) => ({
    root: {
        marginTop: 16,
        marginBottom: 80,
        position: 'relative',
        padding: '0 16px 16px 16px',
    },
    fields: {
        flex: 1,
    },
    buttonContainer: {
        width: 80,
        paddingLeft: 16,
        [theme.breakpoints.up('sm')]: {
            width: 88,
            paddingLeft: 24,
        },
    },
    button: {
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        bottom: -68,
    },
})

function BookmarkAddForm(props) {
    const { classes, isValid, isSubmitting } = props
    return (
        <Paper className={classes.root}>
            <Form>
                <Grid container>
                    <Grid item className={classes.fields}>
                        <TextField {...getTextFieldDefaultProps('url', props)} label="URL" />
                        <TextField {...getTextFieldDefaultProps('title', props)} label="Title" />
                    </Grid>
                </Grid>
                <Button
                    color="primary"
                    variant="fab"
                    type="submit"
                    aria-label="Add"
                    className={classes.button}
                    disabled={!isValid || isSubmitting}
                >
                    <AddIcon />
                </Button>
            </Form>
        </Paper>
    )
}

BookmarkAddForm.propTypes = {
    classes: PropTypes.object.isRequired,
}

export const BookmarkAddFormStyled = withStyles(styles)(BookmarkAddForm)

export function validate(values) {
    let errors = {}
    if (!values.title) {
        errors.title = 'Required'
    }
    if (!values.url) {
        errors.url = 'Required'
    }
    return errors
}

export function handleSubmit(values, { setSubmitting, resetForm, setErrors, props }) {
    setSubmitting(true)
    const { createBookmark } = props
    return createBookmark({
        variables: {
            ...values,
            id: getNewBookmarkId(),
        },
    })
        .then(() => {
            resetForm()
            setSubmitting(false)
        })
        .catch((err) => {
            const valuesKeys = R.keys(values)
            setErrors(R.zipObj(valuesKeys, R.times(R.always(err.message), valuesKeys.length)))
            setSubmitting(false)
        })
}

export default R.pipe(
    withFormik({
        validate,
        handleSubmit,
    }),
    setPropTypes({
        createBookmark: PropTypes.func.isRequired,
    })
)(BookmarkAddFormStyled)
