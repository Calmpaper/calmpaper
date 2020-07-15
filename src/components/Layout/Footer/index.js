import React from 'react'
import FullWidthFooter from './FullWidth'
import HalfWidthFooter from './HalfWidth'

export default ({ centered = false }) =>
  centered ? <FullWidthFooter /> : <HalfWidthFooter />
