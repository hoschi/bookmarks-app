import * as R from 'ramda'
import React from 'react'
import { shallow } from 'enzyme'
import { BookmarkAddFormStyled, validate, handleSubmit } from './BookmarkAddForm'

function render(props) {
    return shallow(<BookmarkAddFormStyled {...props} />).dive()
}

test('valid, submitting', function() {
    const actual = render({
        isValid: true,
        isSubmitting: true,
        values: { title: 'my title', url: 'http://foo.com' },
        touched: { title: true, url: true },
        errors: {},
    })
    expect(actual).toMatchSnapshot()
})

test('valid, not submitting', function() {
    const actual = render({
        isValid: true,
        isSubmitting: false,
        values: { title: 'my title', url: 'http://foo.com' },
        touched: { title: true, url: true },
        errors: {},
    })
    expect(actual).toMatchSnapshot()
})

test('not valid, not submitting', function() {
    const actual = render({
        isValid: false,
        isSubmitting: true,
        values: { title: '', url: '' },
        touched: { title: true, url: true },
        errors: {},
    })
    expect(actual).toMatchSnapshot()
})

test('initial errors', function() {
    const actual = render({
        isValid: false,
        isSubmitting: false,
        values: { title: '', url: '' },
        touched: { title: false, url: false },
        errors: { title: 'Required!', url: 'Required!' },
    })
    expect(actual).toMatchSnapshot()
})

test('show errors', function() {
    const actual = render({
        isValid: false,
        isSubmitting: false,
        values: { title: '', url: '' },
        touched: { title: true, url: true },
        errors: { title: 'Required!', url: 'Required!' },
    })
    expect(actual).toMatchSnapshot()
})

test('validate', function() {
    expect(validate({ title: '', url: '' })).toEqual({
        title: 'Required',
        url: 'Required',
    })
    expect(validate({ title: 'my title' })).toEqual({
        url: 'Required',
    })
    expect(validate({ url: 'http://foo-bar.com' })).toEqual({
        title: 'Required',
    })
    expect(validate({ title: 'my title', url: 'http://foo-bar.com' })).toEqual({})
})

describe('handleSubmit', function() {
    const valuesIn = {
        title: 'my title',
        url: 'https://you.rock',
    }
    const badge = {
        setSubmitting: jest.fn(),
        resetForm: jest.fn(),
        setErrors: jest.fn(),
    }

    beforeEach(function() {
        badge.setSubmitting.mockClear()
        badge.resetForm.mockClear()
        badge.setErrors.mockClear()
    })

    it('happy case', function() {
        expect.assertions(5)
        return handleSubmit(valuesIn, {
            ...badge,
            props: {
                createBookmark: (mutationParams) => {
                    expect(badge.setSubmitting).toHaveBeenLastCalledWith(true)
                    expect(R.omit(['id'], mutationParams.variables)).toEqual(valuesIn)
                    return new Promise((resolve) => {
                        resolve()
                    })
                },
            },
        }).then(() => {
            expect(badge.resetForm).toHaveBeenCalled()
            expect(badge.setErrors).not.toHaveBeenCalled()
            expect(badge.setSubmitting).toHaveBeenLastCalledWith(false)
        })
    })

    it('error from server', function() {
        expect.assertions(5)
        const msg = 'Uh oh!'
        return handleSubmit(valuesIn, {
            ...badge,
            props: {
                createBookmark: (mutationParams) => {
                    expect(badge.setSubmitting).toHaveBeenLastCalledWith(true)
                    expect(R.omit(['id'], mutationParams.variables)).toEqual(valuesIn)
                    return new Promise((resolve, reject) => {
                        reject(new Error(msg))
                    })
                },
            },
        }).then(() => {
            expect(badge.resetForm).not.toHaveBeenCalled()
            expect(badge.setErrors).toHaveBeenLastCalledWith({
                title: msg,
                url: msg,
            })
            expect(badge.setSubmitting).toHaveBeenLastCalledWith(false)
        })
    })
})
