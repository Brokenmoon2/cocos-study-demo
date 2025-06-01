import { TILE_TYPE_ENUM } from 'db://assets/Enums'
import level1 from 'db://assets/Levels/level1'
import level2 from 'db://assets/Levels/level2'

export interface ITile {
  src: number | null
  type: TILE_TYPE_ENUM | null
}

export interface ILevel {
  mapInfo: Array<Array<ITile>>
}

const Levels: Record<string, ILevel> = {
  level1,
  level2,
}

export default Levels
