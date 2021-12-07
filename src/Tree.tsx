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
import { ReactComponent as CaratIcon } from './carat.svg'

const Container = styled.div`
  display: flex;
  min-height: 500px;
`

const ItemContainer = styled.div<{ dragging: boolean, isExpanded?: boolean }>`
  display: flex;
  margin: 2px;
  padding: 6px 20px;
  opacity: ${props => props.dragging ? '0.25' : '1'};
  &&:hover {
    background: #F7F8F9;
    .carat {
      opacity: 1;
    }
  }
  &&.section {
    padding-left: 40px;
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #A3AAB8;
    
    .carat {
      opacity: ${props => props.isExpanded ? 0 : 1};
    }
    
    &&:hover {
      .carat {
        opacity: 1;
      }
    }
  }
`

const Icon = styled.span`
  margin-right: 6px;
`

function Item({
                item,
                onExpand,
                depth,
                onCollapse,
                provided,
                snapshot,
              }: RenderItemParams) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        ...provided.draggableProps.style,
        paddingLeft: `${(depth + 1) * 20}px`
      }}
    >
      <ItemContainer
        dragging={snapshot.isDragging}
        className={item.data.type}
        isExpanded={item.isExpanded}
      >
        <Carat
          item={item}
          onExpand={onExpand}
          onCollapse={onCollapse}
        />
        {item.data.icon && <Icon>{item.data.icon}</Icon>}
        {item.data.title}
      </ItemContainer>
    </div>
  )
}

const CaratBtn = styled.button<{ isExpanded?: boolean }>`
  margin-left: -20px;
  border: none;
  background: none;
  cursor: pointer;
  transform: ${props => !props.isExpanded ? 'rotate(-90deg)' : 1};
`

function Carat({item, onExpand, onCollapse}: {
  item: TreeItem,
  onExpand: (itemId: ItemId) => void,
  onCollapse: (itemId: ItemId) => void,
}) {
  if (!item.children || item.children.length === 0) return null

  const onClick = () => (item.isExpanded ? onCollapse : onExpand)(item.id)

  return (
    <CaratBtn onClick={onClick} className="carat" isExpanded={item.isExpanded}>
      <CaratIcon />
    </CaratBtn>
  )
}


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
