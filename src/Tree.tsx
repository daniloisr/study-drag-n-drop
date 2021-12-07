import React, { Component } from 'react';
import styled from 'styled-components';
import Tree, {
  mutateTree,
  moveItemOnTree,
  RenderItemParams,
  TreeItem,
  TreeData,
  ItemId,
  TreeSourcePosition,
  TreeDestinationPosition,
} from '@atlaskit/tree';
import { tree, designTree } from './treeData'
import { ReactComponent as Carat } from './carat.svg'

const Container = styled.div`
  display: flex;
`;

const Item = styled.div`
  display: flex;
  border: 1px solid black;
  margin: 2px;
  opacity: ${(props: any) => props.dragging ? '0.25' : '1'}
`

type State = {
  tree: TreeData;
};

function Icon({item, onExpand, onCollapse, className}: {
  item: TreeItem,
  onExpand: (itemId: ItemId) => void,
  onCollapse: (itemId: ItemId) => void,
  className?: string,
}) {
  if (!item.children || item.children.length === 0) {
    return null
  }

  const onClick = () => {
    item.isExpanded ? onCollapse(item.id) : onExpand(item.id)
  }

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

export default class DragDropWithNestingTree extends Component<void, State> {
  state = {
    tree: designTree,
  };

  renderItem = ({
                  item,
                  onExpand,
                  onCollapse,
                  provided,
                  snapshot,
                }: RenderItemParams) => {
    // console.log(provided.draggableProps)
    return (
      <Item ref={provided.innerRef}
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
      </Item>
    );
  };

  onExpand = (itemId: ItemId) => {
    const {tree}: State = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, {isExpanded: true}),
    });
  };

  onCollapse = (itemId: ItemId) => {
    const {tree}: State = this.state;
    this.setState({
      tree: mutateTree(tree, itemId, {isExpanded: false}),
    });
  };

  onDragEnd = (
    source: TreeSourcePosition,
    destination?: TreeDestinationPosition,
  ) => {
    const {tree} = this.state;

    if (!destination) {
      return;
    }

    // console.log(source, destination)
    const newTree = moveItemOnTree(tree, source, destination);
    this.setState({
      tree: newTree,
    });
  };

  render() {
    const {tree} = this.state;

    return (
      <Container>
        <Tree
          tree={tree}
          renderItem={this.renderItem}
          onExpand={this.onExpand}
          onCollapse={this.onCollapse}
          onDragEnd={this.onDragEnd}
          isDragEnabled
          isNestingEnabled
        />
      </Container>
    );
  }
}
