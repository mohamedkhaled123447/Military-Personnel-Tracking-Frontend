import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MDBListGroup, MDBListGroupItem } from "mdb-react-ui-kit";
import "../style/MultiTransferList.css"; // Import the CSS file

const ItemType = "ITEM";
const departments = ["ليبي", "سوداني", "خطة", "عبري", "رصد"];
// Draggable item component
const DraggableItem = ({ item, listName }) => {
  const [, ref] = useDrag({
    type: ItemType,
    item: { item, listName },
  });

  return (
    <MDBListGroupItem ref={ref} className="draggable-item">
      {item}
    </MDBListGroupItem>
  );
};

// Drop target list component
const DropTargetList = ({ list, listName, moveItem }) => {
  const [, ref] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      if (draggedItem.listName !== listName) {
        moveItem(draggedItem.item, draggedItem.listName, listName);
      }
    },
  });

  return (
    <MDBListGroup ref={ref} className="drop-target-list">
      {list.map((item, index) => (
        <DraggableItem key={index} item={item} listName={listName} />
      ))}
    </MDBListGroup>
  );
};

// Main component
const MultiTransferList = () => {
  const [listA, setListA] = useState(["Item 1", "Item 2", "Item 3"]);
  const [listB, setListB] = useState(["Item 4", "Item 5", "Item 6"]);
  const [listC, setListC] = useState(["Item 7", "Item 8", "Item 9"]);
  const [listD, setListD] = useState(["Item 10", "Item 11", "Item 12"]);

  const moveItem = (item, fromListName, toListName) => {
    // Helper to remove an item from a list
    const removeItem = (list, item) => list.filter((i) => i !== item);

    // Helper to add an item to a list
    const addItem = (list, item) => [...list, item];

    // Handle moving items between lists
    if (fromListName === "A") setListA((prev) => removeItem(prev, item));
    if (fromListName === "B") setListB((prev) => removeItem(prev, item));
    if (fromListName === "C") setListC((prev) => removeItem(prev, item));
    if (fromListName === "D") setListD((prev) => removeItem(prev, item));

    if (toListName === "A") setListA((prev) => addItem(prev, item));
    if (toListName === "B") setListB((prev) => addItem(prev, item));
    if (toListName === "C") setListC((prev) => addItem(prev, item));
    if (toListName === "D") setListD((prev) => addItem(prev, item));
  };

  return (
    <div className="transferlist-container">
      <select className="filter-select" name="department">
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <DndProvider backend={HTML5Backend}>
        <div className="d-flex justify-content-around flex-wrap">
          <div className="w-25 text-center">
            <h5>قوة</h5>
            <DropTargetList list={listA} listName="A" moveItem={moveItem} />
          </div>

          <div className="w-25 text-center">
            <h5>موجود</h5>
            <DropTargetList list={listB} listName="B" moveItem={moveItem} />
          </div>

          <div className="w-25 text-center">
            <h5>اجازة</h5>
            <DropTargetList list={listD} listName="D" moveItem={moveItem} />
          </div>

          <div className="w-25 text-center">
            <h5>خارج</h5>
            <DropTargetList list={listC} listName="C" moveItem={moveItem} />
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default MultiTransferList;
