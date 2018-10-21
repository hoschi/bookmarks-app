import React from 'react'
import { shallow } from 'enzyme'
import { Mutation } from 'react-apollo'
import BookmarkAdd from './BookmarkAdd'

test('render', function() {
    const actual = shallow(<BookmarkAdd />)
    expect(actual).toMatchSnapshot()
})

describe('createBookmark Mutation', function() {
    const actual = shallow(<BookmarkAdd />)
        .find(Mutation)
        .prop('children')

    const createBookmark = jest.fn()
    const bookmarkAddForm = shallow(actual(createBookmark))
    expect(bookmarkAddForm).toMatchSnapshot()
    expect(bookmarkAddForm.prop('createBookmark')).toBe(createBookmark)
})
