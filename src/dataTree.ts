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
    title: '🏢 Values',
    type: 'doc',
    parent: 1,
  },
  {
    id: 3,
    title: '💬 Communication',
    type: 'doc',
    parent: 2,
  },
  {
    id: 4,
    title: '📄 Remote',
    type: 'doc',
    parent: 2,
  },
  {
    id: 5,
    title: '🛠 Expectations',
    type: 'doc',
    parent: 4,
  },
  {
    id: 6,
    title: '🔄 Working Async',
    type: 'doc',
    parent: 4,
  },
  {
    id: 7,
    title: '🔗 Glossary',
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

export const sampleTree = {
  "rootId": "1",
  "items": {
    "1": {
      "id": "1",
      "children": [
        "1-0",
        "1-1",
        "1-2",
        "1-3",
        "1-4",
        "1-5",
        "1-6",
        "1-7",
        "1-8"
      ],
      "hasChildren": true,
      "isExpanded": true,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1"
      }
    },
    "1-0": {
      "id": "1-0",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-0"
      }
    },
    "1-1": {
      "id": "1-1",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-1"
      }
    },
    "1-2": {
      "id": "1-2",
      "children": [
        "1-2-0",
        "1-2-1",
        "1-2-2",
        "1-2-3"
      ],
      "hasChildren": true,
      "isExpanded": true,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2"
      }
    },
    "1-2-0": {
      "id": "1-2-0",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-0"
      }
    },
    "1-2-1": {
      "id": "1-2-1",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-1"
      }
    },
    "1-2-2": {
      "id": "1-2-2",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-2"
      }
    },
    "1-2-3": {
      "id": "1-2-3",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-3"
      }
    },
    "1-3": {
      "id": "1-3",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-3"
      }
    },
    "1-4": {
      "id": "1-4",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-4"
      }
    },
    "1-5": {
      "id": "1-5",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-5"
      }
    },
    "1-6": {
      "id": "1-6",
      "children": [
        "1-6-0",
        "1-6-1",
        "1-6-2",
        "1-6-3",
        "1-6-4"
      ],
      "hasChildren": true,
      "isExpanded": true,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 6"
      }
    },
    "1-6-0": {
      "id": "1-6-0",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 6-0"
      }
    },
    "1-6-1": {
      "id": "1-6-1",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 6-1"
      }
    },
    "1-6-2": {
      "id": "1-6-2",
      "children": [
        "1-6-2-0",
        "1-6-2-1",
        "1-6-2-2"
      ],
      "hasChildren": true,
      "isExpanded": true,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2"
      }
    },
    "1-6-2-0": {
      "id": "1-6-2-0",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-0"
      }
    },
    "1-6-2-1": {
      "id": "1-6-2-1",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-1"
      }
    },
    "1-6-2-2": {
      "id": "1-6-2-2",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 2-2"
      }
    },
    "1-6-3": {
      "id": "1-6-3",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 6-3"
      }
    },
    "1-6-4": {
      "id": "1-6-4",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 6-4"
      }
    },
    "1-7": {
      "id": "1-7",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-7"
      }
    },
    "1-8": {
      "id": "1-8",
      "children": [],
      "hasChildren": false,
      "isExpanded": false,
      "isChildrenLoading": false,
      "data": {
        "title": "Title 1-8"
      }
    }
  }
}
