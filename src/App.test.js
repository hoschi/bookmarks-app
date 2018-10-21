import React from 'react'
import { shallow } from 'enzyme'
import App from './App'

test('render', function() {
    const actual = shallow(<App />).dive()
    expect(actual).toMatchSnapshot()
})
