import React from 'react'
import { Link } from 'react-router-dom'
import Flex from 'components/atoms/flex'

export default () => (
  <Flex>
    Page not found.
    <Link to="/" style={{ marginLeft: 4 }}>
      Home
    </Link>
  </Flex>
)
