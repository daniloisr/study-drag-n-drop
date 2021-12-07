import { TreeData, TreeItem } from '@atlaskit/tree'

interface Node {
  id: number,
  title: string,
  type: string,
  parent: number | null
}

const nodes = [
  {
    id: 1,
    title: 'GENERAL',
    type: 'section',
    parent: null,
  },
  {
    id: 2,
    title: 'Values',
    icon: '🏢',
    type: 'doc',
    parent: 1,
  },
  {
    id: 3,
    title: 'Communication',
    icon: '💬',
    type: 'doc',
    parent: 2,
  },
  {
    id: 4,
    title: 'Remote',
    icon: '📄',
    type: 'doc',
    parent: 2,
  },
  {
    id: 5,
    title: 'Expectations',
    icon: '🛠',
    type: 'doc',
    parent: 4,
  },
  {
    id: 6,
    title: 'Working Async',
    icon: '🔄',
    type: 'doc',
    parent: 4,
  },
  {
    id: 7,
    title: 'Glossary',
    icon: '🔗',
    type: 'doc',
    parent: 4,
  },
]

export function toTree(nodes: Node[]): TreeData {
  const rootId = 0
  const node2item = (node: Node) => buildItem(node.id, node, parentMap.get(node.id) || [])
  const buildItem = (id: number, data: any, children: number[]): TreeItem => ({
    id,
    children,
    hasChildren: children.length > 0,
    isExpanded: true,
    data
  })

  // get a map of id => children
  const parentMap = new Map<number, number[]>()

  nodes.forEach(node => {
    // default parent is 0
    const parent = node.parent || rootId
    const children = parentMap.get(parent) || []
    parentMap.set(parent, children.concat([node.id]))
  })

  const root = buildItem(rootId, {}, parentMap.get(rootId)!)

  return {
    rootId: 0,
    items: {
      [root.id]: root,
      ...nodes.reduce((acc, i) => Object.assign(acc, { [i.id]: node2item(i) }), {})
    }
  }
}

export const dataTree = toTree(nodes)
