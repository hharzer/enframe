import React from 'react'
import { App } from './App'
import { shallow, configure } from 'enzyme'
import chai, { expect } from 'chai'
import Adapter from 'enzyme-adapter-react-16'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())
configure({ adapter: new Adapter() })

describe('App', () => {
  it('greets the user', () => {
    const wrapper = shallow(<App />)
    expect(wrapper).to.contain.text('Example Todo App')
  })
})
