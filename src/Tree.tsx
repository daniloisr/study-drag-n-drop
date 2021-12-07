import React, { useState } from 'react'
import styled from 'styled-components'
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '@atlaskit/tree'
import { dataTree } from './dataTree'
import { ReactComponent as Carat } from './carat.svg'

const Container = styled.div`
  display: flex;
`

const ItemContainer = styled.div`
  display: flex;
  border: 1px solid black;
  margin: 2px;
  opacity: ${(props: any) => props.dragging ? '0.25' : '1'};
`

function Item({
                item,
                onExpand,
                onCollapse,
                provided,
                snapshot,
              }: RenderItemParams) {
  return (
    <ItemContainer ref={provided.innerRef}
         dragging={snapshot.isDragging}
         {...provided.draggableProps}
         {...provided.dragHandleProps}
    >
      <StyledIcon
        item={item}
        onExpand={onExpand}
        onCollapse={onCollapse}
      />
      {item.data.title}
    </ItemContainer>
  )
}

function Icon({item, onExpand, onCollapse, className}: {
  item: TreeItem,
  onExpand: (itemId: ItemId) => void,
  onCollapse: (itemId: ItemId) => void,
  className?: string,
}) {
  if (!item.children || item.children.length === 0) return null

  const onClick = () => (item.isExpanded ? onCollapse : onExpand)(item.id)

  return (
    <button onClick={onClick} className={className}>
      <Carat style={!item.isExpanded ? {transform: 'rotate(-90deg)'} : {}}/>
    </button>
  )
}

const StyledIcon = styled(Icon)`
  border: none;
  background: none;
`

export default function HandbookIndex() {
  const [tree, setTree] = useState(dataTree)

  const onExpand = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, {isExpanded: true}))
  }

  const onCollapse = (itemId: ItemId) => {
    setTree(mutateTree(tree, itemId, {isExpanded: false}))
  }

  const onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    if (!destination) {
      return
    }

    // console.log(source, destination)
    setTree(moveItemOnTree(tree, source, destination))
  }

  return (
    <Container>
      <Tree
        tree={tree}
        renderItem={Item}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        isDragEnabled
        isNestingEnabled
      />
    </Container>
  )
}
