import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import { VisualizerContext } from "../state/contexts";

import dagre from "dagre";
// import { FlowChartWithState } from "@mrblenny/react-flow-chart";

const chart = {
  offset: {
    x: 0,
    y: 0,
  },
  // nodes: {
  //   node1: {
  //     id: 'node1',
  //     type: 'Data 1',
  //     ports: {
  //       port1: {
  //         id: 'port1',
  //         type: 'output',
  //         properties: {
  //           value: 'no'
  //         }
  //       },
  //       port2: {
  //         id: 'port2',
  //         type: 'output',
  //         properties: {
  //           value: 'yes'
  //         }
  //       }
  //     }
  //   },
  //   node2: {
  //     id: 'node2',
  //     type: 'Data 2',
  //     ports: {
  //       port1: {
  //         id: 'port1',
  //         type: 'input'
  //       },
  //       port2: {
  //         id: 'port2',
  //         type: 'output'
  //       }
  //     }
  //   },
  //   node3: {
  //     id: "node3",
  //     type: "Data 3",
  //     ports: {
  //       port1: {
  //         id: "port1",
  //         type: "input"
  //       },
  //       port2: {
  //         id: "port2",
  //         type: "output"
  //       }
  //     }
  //   },
  //   node4: {
  //     id: "node4",
  //     type: "Data 4",
  //     ports: {
  //       port1: {
  //         id: "port1",
  //         type: "input"
  //       },
  //       port2: {
  //         id: "port2",
  //         type: "output"
  //       }
  //     }
  //   },
  //   node5: {
  //     id: "node5",
  //     type: "Data 5 mofo",
  //     ports: {
  //       port1: {
  //         id: "port1",
  //         type: "input"
  //       },
  //       port2: {
  //         id: "port2",
  //         type: "output"
  //       }
  //     }
  //   }
  // },
  links: {
    link1: {
      id: "link1",
      from: {
        nodeId: "node1",
        portId: "port1",
      },
      to: {
        nodeId: "node2",
        portId: "port1",
      },
    },
    link2: {
      id: "link2",
      from: {
        nodeId: "node1",
        portId: "port2",
      },
      to: {
        nodeId: "node3",
        portId: "port1",
      },
    },
    link3: {
      id: "link3",
      from: {
        nodeId: "node2",
        portId: "port2",
      },
      to: {
        nodeId: "node4",
        portId: "port1",
      },
    },
    link4: {
      id: "link4",
      from: {
        nodeId: "node2",
        portId: "port2",
      },
      to: {
        nodeId: "node5",
        portId: "port1",
      },
    },
    link5: {
      id: "link5",
      from: {
        nodeId: "node3",
        portId: "port2",
      },
      to: {
        nodeId: "node6",
        portId: "port1",
      },
    },
    link6: {
      id: "link6",
      from: {
        nodeId: "node9",
        portId: "port2",
      },
      to: {
        nodeId: "node10",
        portId: "port1",
      },
    },
    link7: {
      id: "link7",
      from: {
        nodeId: "node7",
        portId: "port2",
      },
      to: {
        nodeId: "node8",
        portId: "port1",
      },
    },
  },
  selected: {},
  hovered: {},
};

const nodes = {};

export default function Canvas() {
  const { visualizerState } = useContext(VisualizerContext);

  const dataArray = visualizerState.sqlSchema;

  const nodes = {};
  for (let i = 0; i < dataArray.length; i++) {
    const table = dataArray[i];

    const newNode = {};
    const nodeId = `node${i}`;
    // console.log('nodeId:', nodeId);

    // PULL DATA OUT OF THE DEEPLY NESTED OBJECT:
    const tableName = Object.keys(table)[0];
    console.log("tableName:", tableName);

    // all columns for one table, stored in an array:
    // const columnsArr = table[tableName].columns;
    // console.log('columns:', columns);

    nodes[nodeId] = {
      id: nodeId,
      type: tableName,
      // name: tableName,
      ports: {
        port1: {
          id: "port1",
          type: "input",
        },
        port2: {
          id: "port2",
          type: "output",
        },
      },
      position: {
        x: Math.random() * 1500,
        y: Math.random() * 1500,
      },
    };

    // console.log('nodes[nodeId]:', nodes[nodeId])
    // console.log('NODES AFTER:', nodes);
  }

  chart.nodes = nodes;
  console.log("CHART AFTER:", chart);

  /*
  create a new dagre graph
  */
  const dagreGraph = new dagre.graphlib.Graph();

  // set an object for the graph label
  dagreGraph.setGraph({
    // nodesep: 30,
    // ranksep: 150,
    rankdir: "LR",
    // marginX: 100,
    // marginY: 100
  });

  // default to assigning a new object as a label for each edge
  dagreGraph.setDefaultEdgeLabel(function () {
    return {};
  });

  const nodeAccess = Object.keys(nodes);

  for (let i = 0; i < nodeAccess.length; i++) {
    const node = nodeAccess[i];
    console.log("node:", node);
    const fullObj = chart.nodes[node];
    console.log("fullObj:", fullObj);
    console.log("fullObj.type:", fullObj.type);
    console.log("fullObj.name:", fullObj.name);

    dagreGraph.setNode(i, {
      width: 200,
      height: 100,
    });
  }

  // add edges to the graph
  // for (let k in chart.links) {
  //   dagreGraph.setEdge(chart.links[k].from.nodeId, chart.links[k].to.nodeId);
  // }

  // ask dagre to do the layout for these nodes and edges
  dagre.layout(dagreGraph);

  return (
    <div className="visualizerContainer">
      <FlowChartWithState initialValue={chart} />
    </div>
  );
}
