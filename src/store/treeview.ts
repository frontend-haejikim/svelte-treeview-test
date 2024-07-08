import { derived, writable, type Writable } from 'svelte/store'

import { TOOTH_NUMBER_TYPE } from '$/const'
import treeMap from '../tree.json'

export interface TreeNode {
  key: string
  name: string
  displayName: string
  isShowChildren?: boolean
  path: string
  type?: string
  parent?: string
  sortOrder: number
  fileUuid?: string
  opacity?: number
  visible?: boolean
  isFolder?: boolean
  showOnTreeview: boolean
  occlusionGroupNumber?: number
  isNotUploaded?: boolean
  hasChildren?: boolean
  displayNameRule?: string
  postfix?: string
  dataObjectDefaultDisplayName?: string
  fileName?: string
  viewRoot?: string
  isPreviewAble?: boolean
  mediaType?: number
}

export interface ITree {
  default: {
    nodes: TreeNode[]
    nodeMap: { [key: string]: { [key: string]: string | number | boolean } }
  }
}

export interface TreeviewStore {
  tree: ITree
  toothNumberType: number
  showHideAll: boolean
}

const store: Writable<TreeviewStore> = writable({
  tree: { default: treeMap } as ITree,
  toothNumberType: TOOTH_NUMBER_TYPE.FDI,
  showHideAll: true,
})

export const rootNodes = derived(store, ($_) =>
  $_.tree.default.nodes.filter((node) => !node.parent)
)

export const toggleShowHideAll = () => {
  store.update((_) => {
    const newShowHideAll = !_.showHideAll

    return {
      ..._,
      showHideAll: newShowHideAll,
      tree: {
        default: {
          ..._.tree.default,
          nodes: _.tree.default.nodes.map((node) => {
            if ('isShowChildren' in node) return { ...node, isShowChildren: !newShowHideAll }

            return node
          }),
        },
      },
    }
  })
}

export const findShownChildrenNodes = (path: string) => {
  let nodes: TreeNode[] = []
  store.subscribe((_) => (nodes = _.tree.default.nodes))

  return nodes.filter((_) => _.path !== path && _.parent === path)
}

export const toggleShowChildren = (path: string) => {
  store.update((_) => {
    return {
      ..._,
      tree: {
        default: {
          nodes: _.tree.default.nodes.map((_) => {
            if (_.path === path) return { ..._, isShowChildren: !_.isShowChildren }

            return _
          }),
          nodeMap: _.tree.default.nodeMap,
        },
      },
    }
  })
}

export default store
