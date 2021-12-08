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

const MainContainer = styled.div<{ alignSections?: boolean }>`
  display: flex;
  margin: 1em;
  
  .section {
    padding-left: ${props => props.alignSections ? '40px' : '20px'};
  }
`

const TreeContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  min-height: 500px;
  height: 100%;
  overflow-y: auto;
`

const ItemWrapper = styled.div`
  min-width: 300px;
  
  &&:hover {
    background: #F7F8F9;
  }
  
  && + && div.section {
    margin-top: 1em;
  }
`

const ItemContainer = styled.div<{ dragging: boolean, isExpanded?: boolean }>`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  height: 28px;
  margin: 1px;
  padding: 4px 20px;
  color: #757C8A;
  opacity: ${props => props.dragging ? '0.25' : '1'};
  
  &&.section {
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
                onCollapse,
                provided,
                snapshot,
              }: RenderItemParams) {
  const toggle = item.isExpanded ? onCollapse : onExpand
  const onClick = item.data.type === 'section' ? toggle : () => {}

  return (
    <ItemWrapper
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onClick(item.id)}
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
    </ItemWrapper>
  )
}

const CaratBtn = styled.div<{ isExpanded?: boolean }>`
  width: 20px;
  height: 20px;
  text-align: center;
  margin-left: -20px;
  cursor: pointer;
  transition: transform 0.1s;
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
      <CaratIcon/>
    </CaratBtn>
  )
}


export default function TreeApp() {
  const [tree, setTree] = useState(dataTree)
  const [alignSections, setAlignSections] = useState(false)

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

    setTree(moveItemOnTree(tree, source, destination))
  }

  return (
    <MainContainer alignSections={alignSections}>
      <TreeContainer>
        <Tree
          tree={tree}
          renderItem={Item}
          onExpand={onExpand}
          onCollapse={onCollapse}
          onDragEnd={onDragEnd}
          offsetPerLevel={20}
          isDragEnabled
          isNestingEnabled
        />
      </TreeContainer>

      <div style={{ marginLeft: '5em' }}>
        <p>
          Based on <a href="https://atlaskit.atlassian.com/packages/confluence/tree">@atlaskit/tree</a>, which is referenced
          on <a href="https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/combining.md">React Beautiful DnD docs</a>
        </p>

        <h3>Settings</h3>

        <p>
          <input type="checkbox" checked={alignSections} onChange={() => setAlignSections(!alignSections)} />
          Change Sections alignment
        </p>
      </div>
    </MainContainer>
  )
}
