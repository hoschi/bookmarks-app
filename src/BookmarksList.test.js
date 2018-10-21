import React from 'react'
import { shallow } from 'enzyme'
import { Query } from 'react-apollo'
import { bookmarksList } from './testData'
import BookmarksList from './BookmarksList'

test('render', function() {
    const actual = shallow(<BookmarksList />)
    expect(actual).toMatchSnapshot()
})

describe('Query queryAllBookmarks', function() {
    const actual = shallow(<BookmarksList />)
        .find(Query)
        .prop('children')

    it('loading', function() {
        const queried = shallow(actual({ loading: true }))
        expect(queried).toMatchSnapshot()
    })

    it('error', function() {
        const queried = shallow(actual({ error: new Error('uh oh') }))
        expect(queried).toMatchSnapshot()
    })

    it('with data', function() {
        const queried = shallow(actual({ data: { allBookmarks: bookmarksList } }))
        expect(queried).toMatchSnapshot()
    })
})
