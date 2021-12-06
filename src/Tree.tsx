import React, { Component } from 'react';
import styled from 'styled-components';
import Navigation, { AkNavigationItem } from '@atlaskit/navigation';
import ChevronDownIcon from '@atlaskit/icon/glyph/chevron-down';
import ChevronRightIcon from '@atlaskit/icon/glyph/chevron-right';
import Button from '@atlaskit/button/standard-button';
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

const Container = styled.div`
  display: flex;
`;

const Dot = styled.span`
  display: flex;
  width: 24px;
  height: 32px;
  justify-content: center;
  font-size: 12px;
  line-height: 32px;
`;

type State = {
  tree: TreeData;
};

const tree = {
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

export default class DragDropWithNestingTree extends Component<void, State> {
  state = {
    tree: tree,
  };

  static getIcon(
    item: TreeItem,
    onExpand: (itemId: ItemId) => void,
    onCollapse: (itemId: ItemId) => void,
  ) {
    if (item.children && item.children.length > 0) {
      return item.isExpanded ? (
        <Button
          css=""
          spacing="none"
          appearance="subtle-link"
          onClick={() => onCollapse(item.id)}
        >
          <ChevronDownIcon label="" size="medium"/>
        </Button>
      ) : (
        <Button
          css=""
          spacing="none"
          appearance="subtle-link"
          onClick={() => onExpand(item.id)}
        >
          <ChevronRightIcon label="" size="medium"/>
        </Button>
      );
    }
    return <Dot>&bull;</Dot>;
  }

  renderItem = ({
                  item,
                  onExpand,
                  onCollapse,
                  provided,
                  snapshot,
                }: RenderItemParams) => {
    return (
      <div ref={provided.innerRef} {...provided.draggableProps}>
        <AkNavigationItem
          isDragging={snapshot.isDragging}
          text={item.data ? item.data.title : ''}
          icon={DragDropWithNestingTree.getIcon(item, onExpand, onCollapse)}
          dnd={{dragHandleProps: provided.dragHandleProps}}
        />
      </div>
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

    const newTree = moveItemOnTree(tree, source, destination);
    this.setState({
      tree: newTree,
    });
  };

  render() {
    const {tree} = this.state;

    return (
      <Container>
        <Navigation>
          <Tree
            tree={tree}
            renderItem={this.renderItem}
            onExpand={this.onExpand}
            onCollapse={this.onCollapse}
            onDragEnd={this.onDragEnd}
            isDragEnabled
            isNestingEnabled
          />
        </Navigation>
      </Container>
    );
  }
}
