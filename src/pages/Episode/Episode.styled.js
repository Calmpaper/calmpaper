import styled from 'styled-components'
import Flex from 'components/Flex'

export const Container = styled.div`
  width: 622px;
`

export const Episode = styled(Flex)`
  background: white;
  border: 1px solid #e0e0e0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  min-height: 128px;
`

export const Title = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 6px;
`
