import AddIcon from '@mui/icons-material/Add'
import { Paper, Fab, Stack } from '@mui/material'
import { ComponentProps, useState } from 'react'
import * as R from 'ramda'
import { createBookmark as createBookmarkMutation, queryAllBookmarks } from './gql'
import { TextFieldElement as TextFieldElementBase, useForm } from 'react-hook-form-mui'
import { useMutation } from '@apollo/client'

interface FormValues {
    url: string
    title: string
}
const TextFieldElement = TextFieldElementBase<FormValues>

const TEXT_FIELD_PROPS: Partial<ComponentProps<typeof TextFieldElement>> = {
    required: true,
    fullWidth: true,
    margin: 'normal',
} as const

export const BookmarkAddForm: React.FC = () => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false)
    const [createBookmark, { error: mutationError }] = useMutation(createBookmarkMutation, {
        refetchQueries: [queryAllBookmarks],
    })

    if (mutationError) throw new Error(mutationError.message)
    const { control, handleSubmit, reset, setError } = useForm<FormValues>({
        defaultValues: {
            url: '',
            title: '',
        },
    })

    return (
        <Paper sx={{ mt: 2, mb: 10, p: 2, pt: 0, position: 'relative' }}>
            <form
                noValidate
                onSubmit={handleSubmit(async (values: FormValues) => {
                    setSubmitting(true)
                    try {
                        await createBookmark({
                            variables: values,
                        })

                        reset()
                        setSubmitting(false)
                    } catch (e: unknown) {
                        const err: object = e || {}
                        const errorMessage: string =
                            'message' in err && err.message instanceof String
                                ? err.message.toString()
                                : 'Unknown error'
                        R.forEach(
                            (key: keyof FormValues) =>
                                setError(key, { type: 'validate', message: errorMessage }),
                            R.keys(values)
                        )
                        setSubmitting(false)
                    }
                })}
            >
                <Stack>
                    <TextFieldElement
                        {...TEXT_FIELD_PROPS}
                        control={control}
                        name="url"
                        label="URL"
                    />
                    <TextFieldElement
                        {...TEXT_FIELD_PROPS}
                        control={control}
                        name="title"
                        label="Title"
                    />
                </Stack>
                <Fab
                    color="primary"
                    type="submit"
                    aria-label="Add"
                    disabled={isSubmitting}
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bottom: -68,
                    }}
                >
                    <AddIcon />
                </Fab>
            </form>
        </Paper>
    )
}
