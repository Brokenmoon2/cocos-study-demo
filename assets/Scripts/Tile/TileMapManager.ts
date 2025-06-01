import { _decorator, Component, Node, Sprite, resources, SpriteFrame, UITransform, Layout } from 'cc'
const { ccclass, property } = _decorator
import { TileManager } from 'db://assets/Scripts/Tile/TileManager'
import { createUINode, randomByRange } from 'db://assets/Utils'
import DataManager from 'db://assets/Runtime/DataManager'
import ResourceManager from 'db://assets/Runtime/ResourceManager'

@ccclass('TileMapManager')
export class TileMapManager extends Component {
  async init() {
    const spriteFrames = await ResourceManager.Instance.loadDir('texture/tile/tile')
    const { mapInfo } = DataManager.Instance
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i]
      for (let j = 0; j < column.length; j++) {
        const item = column[j]
        if (item.src === null || item.type === null) {
          continue
        }

        //number为1、5、9的tile有多种图片，随机挑一张图来渲染
        //i%2和j%2仅仅是为了让随机的个数少一点，这样就保留更多的纯色砖块，地面看出来不会太突兀
        let number = item.src
        // 对特定规律的格子添加随机变化
        if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
          number += randomByRange(0, 4) // 随机增加 0~3
        }

        const imgSrc = `tile (${number})`

        const node = createUINode()
        const spriteFrame = spriteFrames.find(v => v.name === imgSrc) || spriteFrames[0]
        const tileManager = node.addComponent(TileManager)
        tileManager.init(spriteFrame, i, j)
        node.setParent(this.node)
      }
    }
  }
}
