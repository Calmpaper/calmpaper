import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direcion: row;
  flex-wrap: wrap;
  max-width: 622px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const Book = styled.div`
  background: white;
  border: 1px solid #e0e0e0;

  margin-bottom: 16px;
  margin-right: 8px;

  min-width: 200px;

  :nth-child(3n) {
    margin-right: 0px;
  }

  :hover {
    cursor: pointer;
    border-color: #ae00ff;
  }

  // @media (max-width: 768px) {
  //   width: 90vw;
  // }
`

export const Details = styled.div`
  padding: 12px 12px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 92px;
  padding: 12px 12px 8px;
`

export const Image = styled.img`
  height: 300px;
  min-height: 300px;
  width: 200px;
  min-width: 200px;
  object-fit: contain;
`

export const Name = styled.h2`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 8px;

  max-width: 176px;
  line-height: 18px;
`

export const Description = styled.p`
  margin-top: 0px;
  margin-bottom: 8px;
`
