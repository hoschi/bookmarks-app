import React from 'react'
import { shallow } from 'enzyme'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'
import { BookmarkItemStyled, adoptConfig } from './BookmarkItem'

test('render', function() {
    const updateBookmark = jest.fn()
    const removeBookmark = jest.fn()

    const actual = shallow(
        <BookmarkItemStyled
            id="123"
            title="my test title"
            url="https://medium.com/really-cool-article?campaign_id=45"
            isRead={false}
            updateBookmark={updateBookmark}
            removeBookmark={removeBookmark}
        />
    ).dive()
    expect(actual).toMatchSnapshot()

    expect(updateBookmark).toHaveBeenCalledTimes(0)
    expect(removeBookmark).toHaveBeenCalledTimes(0)

    actual.find(Checkbox).prop('onChange')()
    expect(updateBookmark).toHaveBeenCalledTimes(1)
    expect(removeBookmark).toHaveBeenCalledTimes(0)
    const updateParam = updateBookmark.mock.calls[0][0]
    expect(updateParam.variables).toEqual({
        id: '123',
        isRead: true,
    })
    expect(updateParam.optimisticResponse).toEqual({
        __typename: 'Mutation',
        updateBookmark: {
            __typename: 'Bookmark',
            id: '123',
            isRead: true,
        },
    })

    actual.find(IconButton).prop('onClick')()
    expect(updateBookmark).toHaveBeenCalledTimes(1)
    expect(removeBookmark).toHaveBeenCalledTimes(1)
    const removeParam = removeBookmark.mock.calls[0][0]
    expect(removeParam.variables).toEqual({
        id: '123',
    })
})

test('render with read item', function() {
    const updateBookmark = jest.fn()
    const removeBookmark = jest.fn()

    const actual = shallow(
        <BookmarkItemStyled
            id="123"
            title="my test title"
            url="https://medium.com/really-cool-article?campaign_id=45"
            isRead={true}
            updateBookmark={updateBookmark}
            removeBookmark={removeBookmark}
        />
    ).dive()
    expect(actual).toMatchSnapshot()
})

test('update Mutation', function() {
    const Component = adoptConfig.updateBookmark
    const actual = shallow(<Component render={jest.fn()} />)

    expect(actual).toMatchSnapshot()
})

test('remove Mutation', function() {
    const Component = adoptConfig.removeBookmark
    const actual = shallow(<Component render={jest.fn()} />)

    expect(actual).toMatchSnapshot()
})
