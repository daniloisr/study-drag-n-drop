import './App.css';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";

// fake data generator
const getItems = count =>
  Array.from({length: count}, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: "grey",

  ...(isDragging ? draggableStyle : {}),
  opacity: isDragging ? 0.25 : 1,
});

const getListStyle = () => ({
  background: "lightgrey",
  padding: grid,
  width: 250
});

function Dnd() {
  const [items, setItems] = useState(getItems(10))
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    console.log(result)

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    setItems(newItems)
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle()}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => {
                    console.log(item, snapshot.isDragging)
                    return (
                      <div>
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          {item.content}
                        </div>
                        {/*{snapshot.isDragging && (*/}
                        {/*  <div style={getItemStyle(false, provided.draggableProps.style)}>*/}
                        {/*    {item.content}*/}
                        {/*  </div>*/}
                        {/*)}*/}
                      </div>
                    )
                  }}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Dnd;
