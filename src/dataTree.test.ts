import { toTree } from 'src/dataTree'

test('parse data structure', () => {
  const res = toTree([
      {
        id: 1,
        title: 'n1',
        type: 'section',
        parent: null,
      },
      {
        id: 2,
        title: 'n2',
        type: 'doc',
        parent: 1,
      }
    ]
  )

  const expected = {
    rootId: 0,
    items: {
      0: {
        id: 0,
        children: [1],
        hasChildren: true,
        isExpanded: true,
        data: {}
      },
      1: {
        id: 1,
        children: [2],
        hasChildren: true,
        isExpanded: true,
        data: {
          id: 1,
          title: 'n1',
          type: 'section',
          parent: null,
        }
      },
      2: {
        id: 2,
        children: [],
        hasChildren: false,
        isExpanded: true,
        data: {
          id: 2,
          title: 'n2',
          type: 'doc',
          parent: 1,
        }
      }
    }
  }

  expect(res).toStrictEqual(expected)
})
