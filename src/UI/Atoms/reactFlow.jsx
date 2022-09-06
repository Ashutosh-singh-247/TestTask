import React, { useState, useCallback } from "react";

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  ControlButton,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackDropWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const CardTitle = styled.h2`
  margin: 0;
`;

const CardModal = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  max-width: 600px;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
`;

const CardHeader = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
`;

const CardBody = styled.div`
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
`;

const CardCloseButton = styled.button`
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  cursor: pointer;
  padding: 0.25em 0.25em;
  color: #000;
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  opacity: 0.5;
`;

// import { defaultNodes, defaultEdges } from "./defaultData";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const OverviewFlow = () => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  }

  const defaultNodes = [
    {
      id: "1",
      type: "input",
      data: {
        label: (
          <>
            <strong>Start When</strong>
            <select>
              <option value="USER_SUBSCRIBES">USER_SUBSCRIBES</option>
              <option value="USER_ORDERED">USER_ORDERED</option>
            </select>
          </>
        ),
      },
      position: { x: 250, y: 0 },
    },
    {
      id: "2",
      data: {
        label: (
          <>
            <strong>IF</strong>
            <br />
            <select>
              <option value="WHEN_ORDERS">USER_ORDERS</option>
              <option value="NO_ORDERS">USER_ABANDONS_CX</option>
              <option value="ORDER_COMPLETED">ORDER_COMPLETED</option>
            </select>
          </>
        ),
      },
      position: { x: 250, y: 100 },
    },
    {
      id: "3",
      data: {
        label: (
          <>
            <strong>WHAT'S NEXT</strong>
            <br />
            <input
              type="text"
              value="RUN ABANDONED CHECKOUT"
              style={{ width: "100%" }}
            />
          </>
        ),
      },
      position: { x: 400, y: 200 },
      style: {
        background: "#D6D5E6",
        color: "#333",
        border: "1px solid #222138",
        width: 180,
      },
    },
    {
      id: "4",
      position: { x: 100, y: 200 },
      data: {
        label: (
          <>
            <strong>THEN</strong>
            <br />
            <select>
              <option value="TAG_USER">TAG_USER</option>
              <option value="SEND_SMS">SEND_SMS</option>
              <option value="SEND_FLOW">SEND_FLOW</option>
              <option value="SEND_ABAN_CX_FLOW">SEND_ABAN_CX_FLOW</option>
            </select>
          </>
        ),
      },
    },
    {
      id: "5",
      data: {
        label: (
          <>
            <p onClick={toggleModal}>
              <strong>END</strong>
            </p>
          </>
        ),
      },
      position: { x: 100, y: 325 },
    },
    {
      id: "6",
      data: {
        label: (
          <>
            <p onClick={toggleModal}>
              <strong>END</strong>
            </p>
          </>
        ),
      },
      position: { x: 400, y: 325 },
    },
  ];

  const defaultEdges = [
    {
      id: "e1-2",
      source: "1",
      target: "2",
      arrowHeadType: "arrowclosed",
      // label: "this is an edge label",
      style: {
        // stroke: "black",
        // strokeWidth: 2
        strokeDasharray: "4 ",
      },
    },
    { id: "e2-3", source: "2", label: "NO", target: "3" },
    {
      id: "e2-4",
      source: "2",
      target: "4",
      animated: true,
      style: { stroke: "#f6ab6c" },
      label: "YES",
      labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
    },
    {
      id: "e4-5",
      source: "4",
      target: "5",
      arrowHeadType: "arrowclosed",
      animated: true,
      style: { stroke: "#f6ab6c" },
      label: "YES",
      labelStyle: { fill: "#f6ab6c", fontWeight: 700 },
    },
    {
      id: "e3-5",
      source: "3",
      target: "6",
      arrowHeadType: "arrowclosed",
      label: "NO",
    },
  ];

  const [elements, setElements] = useState(defaultNodes);
  const [edges, setEdges] = useState(defaultEdges);

  const onNodesChange = useCallback(
    (changes) => setElements((nds) => applyNodeChanges(changes, nds)),
    [setElements]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, eds)
      ),
    []
  );

  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <BackDropWrapper />
          <CardModal>
            <CardHeader>
              <CardTitle>Action UI</CardTitle>
              <CardCloseButton onClick={toggleModal} />
            </CardHeader>
            <CardBody>
              <div>
                <h3>Send Flow</h3>
                <p>Send a flow to the user</p>
              </div>
            </CardBody>
          </CardModal>
        </ModalWrapper>
      )}
      <ReactFlow
        nodes={elements}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        onConnect={onConnect}
        onLoad={onLoad}
        snapToGrid={true}
        snapGrid={[15, 15]}
        onMove={(e) => {}}
      >
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />
        <Controls onZoomIn={() => console.log("zoom in pressed")}>
          <ControlButton onClick={() => console.log("action")}>h</ControlButton>
        </Controls>
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </>
  );
};

export default OverviewFlow;
