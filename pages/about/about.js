// pages/about.js
import React, { useState, useEffect } from 'react';


import Layout from '/layouts/layout';

const About = () => {
  const [nodesMatrix, setNodesMatrix] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [linkingNode, setLinkingNode] = useState(null);
  const [isDraggingClone, setDraggingClone] = useState(false);
  const [clonePosition, setClonePosition] = useState({ x: 0, y: 0 });
  const [clickOccurred, setClickOccurred] = useState(false);
  const [loading, setLoading] = useState(true);
  const [targetNode, setTargetNode] = useState(null);

  const fetchMindMapNodes = async () => {
    try {
      const response = await fetch('/api/about/getMindMap');
      const data = await response.json();
  
      console.log('Raw data from the server:', data);
  
      // Ensure that data is an array before setting it to the state
      if (Array.isArray(data)) {
        setNodesMatrix(data);
        setLoading(false); // Set loading to false after fetching
      } else {
        console.error('Invalid data format received from the server:', data);
      }
    } catch (error) {
      console.error('Error fetching mind map nodes:', error);
      setLoading(false); // Set loading to false if there's an error
    }
  };
  
  
  // Add this function to handle clicks outside the context menu
  const handleOutsideClick = () => {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
    document.removeEventListener('click', handleOutsideClick);
  
    // Reset linkingNode to null
    setLinkingNode(null);
  };

  useEffect(() => {
    console.log('Component mounted. Fetching mind map nodes...');
    // Fetch mind map nodes when the component mounts
    fetchMindMapNodes();

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  useEffect(() => {
    console.log('Nodes Matrix updated:', nodesMatrix);
    if (clickOccurred) {
      console.log('Nodes Matrix:', nodesMatrix);
      setClickOccurred(false);
    }
    // ... (rest of your existing useEffect logic)
  }, [nodesMatrix]);

  if (loading) {
    return <p>Loading...</p>; // Render a loading message while fetching data
  }

 

  const handleAddCircle = async () => {
    // Declare centerX and centerY variables
    let centerX, centerY;
  
    // Calculate the center coordinates of the screen
    centerX = window.innerWidth / 2;
    centerY = window.innerHeight / 2;
  
    // Create a new circle object with center coordinates
    const newCircle = {
      id: `NewCircle${nodesMatrix.length + 1}`,
      x: centerX,
      y: centerY,
      radius: 40,
      text: 'DefaultText', // Add a default text value
      size: 40, // Add a default size value
    };
  
    // Log information about the added circle
    console.log(`Context Menu: ${newCircle.id}`);
    console.log('Text: ');
  
    // Log the clonedNodeInfo in a tabular format
    const clonedNodeInfo = {
      id: newCircle.id,
      position: { x: newCircle.x, y: newCircle.y },
      text: newCircle.text,
      size: newCircle.size,
    };
    console.table([clonedNodeInfo]);
  
    // Update the state with the new circle
    setNodesMatrix([...nodesMatrix, newCircle]);
  
    try {
      // Send a POST request to the postMindMap.js API
      const response = await fetch('/api/about/postMindMap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clonedNodeInfo),
      });
  
      if (response.ok) {
        console.log('Node data uploaded successfully to Redis API');
      } else {
        console.error('Failed to upload node data to Redis API');
      }
    } catch (error) {
      console.error('An error occurred while sending data to Redis API:', error);
    }
  };
  

  
 
  
  const handleRadiusChange = (newRadius) => {
    const updatedNodes = nodesMatrix.map((node) =>
      node.id === selectedNode ? { ...node, size: newRadius } : node
    );
    setNodesMatrix(updatedNodes);
  };

  const handleMouseMove = (e) => {
    if (isDraggingClone) {
      console.log('Dragging Clone', e.clientX, e.clientY);
      setClonePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseLeave = () => {
    // Remove the temporary line when the mouse leaves the SVG
    if (linkingNode) {
      setLinkingNode(null);
    }
  };

  
  
  const handleCloneMouseUp = async () => {
    if (isDraggingClone) {
      console.log('Clone Released at:', clonePosition);
  
      const clonedNode = nodesMatrix.find((node) => node.id === selectedNode);
  
      // Ensure that the clonedNode is found before proceeding
      if (!clonedNode) {
        console.error('Cloned node not found');
        return;
      }
  
      const updatedNodes = nodesMatrix.map((node) =>
        node.id === selectedNode
          ? { ...node, x: clonePosition.x, y: clonePosition.y, text: clonedNode.text, size: clonedNode.size }
          : node
      );
  
      console.log('Updated Nodes Matrix:', updatedNodes);
  
      const clonedNodeInfo = {
        id: selectedNode, // Use selectedNode instead of clonedNodeId for consistency
        position: { x: clonePosition.x, y: clonePosition.y },
        text: clonedNode.text,
        size: clonedNode.size,
        links: [], // Include links information
      };
  
      try {
        const response = await fetch('/api/about/postMindMap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(clonedNodeInfo),
        });
  
        if (response.ok) {
          console.log('Node position and data updated successfully in Redis API');
        } else {
          console.error('Failed to update node position and data in Redis API');
        }
      } catch (error) {
        console.error('An error occurred while sending data to Redis API:', error);
      }
  
      setNodesMatrix(updatedNodes);
      setClickOccurred(true);
  
      setDraggingClone(false);
      setClonePosition({ x: 0, y: 0 });
  
      window.location.reload();
    }
  };
  

  const handleContextMenu = (e, nodeId) => {
    e.preventDefault();

    const selectedNode = nodesMatrix.find((node) => node.id === nodeId);

    // Update the linkingNode state
    setLinkingNode(selectedNode);

    // Display the context menu
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'block';
    contextMenu.style.top = `${e.clientY}px`;
    contextMenu.style.left = `${e.clientX}px`;

    // Adding an event listener to close the context menu on a click outside
    document.addEventListener('click', handleOutsideClick);

    // Set the selected node
    setSelectedNode(nodeId);

    // Reset linkingNode to null
    setLinkingNode(null);
  };
  



  const handleContextMenuItemClick = (action) => {
    if (action === 'size') {
      // Handle resizing logic
      const newRadius = prompt('Enter new radius:');
      if (newRadius !== null && !isNaN(newRadius)) {
        handleRadiusChange(Number(newRadius));
      }
    } else if (action === 'move') {
      // Handle moving logic
      setDraggingClone(true);
      setClonePosition({
        x: nodesMatrix.find((node) => node.id === selectedNode)?.x || 0,
        y: nodesMatrix.find((node) => node.id === selectedNode)?.y || 0,
      });
    } else if (action === 'link') {
      // Handle linking logic
      // Don't set the linkingNode here, let the user left-click to set the target node
    }

    // Hide the context menu
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
  };

  const handleNodeClick = async (e, nodeId) => {
    e.preventDefault();
  
    console.log('handleNodeClick called for node:', nodeId);
  
    // Handle the case where the user left-clicks to establish a link
    if (linkingNode && linkingNode.id !== nodeId) {
      setTargetNode(nodesMatrix.find((node) => node.id === nodeId));
  
      // Find the source and target nodes
      const sourceNode = nodesMatrix.find((node) => node.id === linkingNode.id);
      const targetNode = nodesMatrix.find((node) => node.id === nodeId);
  
      // Update the source node's links array with the target node's information
      const updatedNodes = nodesMatrix.map((node) =>
        node.id === linkingNode.id
          ? { ...node, links: [...(node.links || []), { id: nodeId, position: targetNode.position }] }
          : node
      );
  
      setNodesMatrix(updatedNodes);
  
      // Reset linkingNode and targetNode after processing the click
      setLinkingNode(null);
      setTargetNode(null);
  
      // Update links in the database
      try {
        const response = await fetch('/api/about/postMindMap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: linkingNode.id, links: updatedNodes.find(node => node.id === linkingNode.id).links }),
        });
  
        if (response.ok) {
          console.log('Links updated successfully in the database');
        } else {
          console.error('Failed to update links in the database');
        }
      } catch (error) {
        console.error('An error occurred while updating links in the database:', error);
      }
    }
  };
  

  const Circle = ({ id, x, y, radius, position, size, selected, onContextMenu, onClick }) => {
    const circleX = x !== undefined ? x : (position && position.x) || 0;
    const circleY = y !== undefined ? y : (position && position.y) || 0;
    const circleRadius = radius !== undefined ? radius : size || 0;
  
    return (
      <g>
        <circle
          cx={circleX}
          cy={circleY}
          r={circleRadius}
          stroke={selected ? 'blue' : 'black'}
          strokeWidth="2"
          fill="lightgreen"
          cursor={isDraggingClone && selected ? 'grabbing' : 'grab'}
          onContextMenu={(e) => onContextMenu(e, id)}
          onClick={(e) => onClick(e)}  // Pass the event here
        
        />
        {isDraggingClone && selected && (
          <circle
            cx={clonePosition.x}
            cy={clonePosition.y}
            r={circleRadius}
            fill="lightgreen"
            opacity="0.5"
            style={{ cursor: 'grabbing' }}
          />
        )}
        {linkingNode && linkingNode.position && targetNode && selected && (
          <line
            x1={circleX}
            y1={circleY}
            x2={targetNode.position.x}
            y2={targetNode.position.y}
            stroke="black"
          />
        )}
      </g>
    );
  };
  
  

  return (
    <Layout>
      <h1></h1>
      <button onClick={handleAddCircle} style={{ position: 'absolute', top: '10px', right: '10px' }}>
        Add Circle
      </button>
      <div
        id="contextMenu"
        style={{
          display: 'none',
          position: 'absolute',
          background: 'white',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          padding: '8px',
          zIndex: '1000',
        }}
      >
        <div onClick={() => handleContextMenuItemClick('size')}>Size</div>
        <div onClick={() => handleContextMenuItemClick('move')}>Move</div>
        <div onClick={() => handleContextMenuItemClick('link')}>Link</div>
      </div>
      
      {nodesMatrix.length > 0 && (
        <svg
          height="100vh"
          width="220vh"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleCloneMouseUp}
          style={{ border: '1px solid black' }}
        >
          {/* ... (other SVG elements) */}
          {nodesMatrix.map((node) => (
            <Circle
              key={node.id}
              x={node.position?.x}
              y={node.position?.y}
              radius={node.size}
              selected={selectedNode === node.id}
              onContextMenu={(e) => handleContextMenu(e, node.id)}
              onClick={(e) => handleNodeClick(e, node.id)} // Pass the event here
              isDraggingClone={isDraggingClone}
              clonePosition={clonePosition}
              linkingNode={linkingNode}
              targetNode={targetNode}
            />
          ))}
        </svg>
      )}

      {selectedNode && (
        <div style={{ marginTop: '20px' }}>
          <label>
  Radius:
  <input
    type="number"
    value={nodesMatrix.find((node) => node.id === selectedNode)?.radius || ''}
    onChange={(e) => handleRadiusChange(Number(e.target.value))}
  />
</label>
        </div>
      )}
    </Layout>
  );
};

export default About;

