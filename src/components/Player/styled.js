import styled from 'styled-components'
import { ReactComponent as PlayIconComponent } from 'assets/icons/play.svg'
import { ReactComponent as StopIconComponent } from 'assets/icons/stop.svg'

export const Play = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  :hover {
    background: white;
    border-color: blue;
  }
`

export const Stop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  :hover {
    background: white;
    border-color: blue;
  }
`

export const PlayIcon = styled(PlayIconComponent)`
  width: 32px;
  height: 32px;
  fill: blue;
  margin-left: 5px;
`

export const StopIcon = styled(StopIconComponent)`
  width: 32px;
  height: 32px;
  fill: blue;
`
