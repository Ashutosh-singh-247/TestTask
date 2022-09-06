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

// import { defaultNodes, defaultEdges } from "./defaultData";

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const OverviewFlow = () => {
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
            <strong>END</strong>
          </>
        ),
      },
      position: { x: 250, y: 325 },
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
      target: "5",
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
  );
};

export default OverviewFlow;