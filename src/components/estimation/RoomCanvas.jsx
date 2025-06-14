import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const RoomCanvas = ({ dimensions, roomType, onDimensionChange }) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPoint, setDragPoint] = useState(null);
  const [scale, setScale] = useState(1);

  const { length = 12, width = 10, height = 9 } = dimensions;

  useEffect(() => {
    drawRoom();
  }, [length, width, height, scale]);

  const drawRoom = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Calculate room dimensions for drawing
    const maxDimension = Math.max(length, width);
    const roomScale = Math.min(canvasWidth * 0.6, canvasHeight * 0.6) / maxDimension;
    
    const roomWidth = width * roomScale * scale;
    const roomLength = length * roomScale * scale;
    
    const startX = (canvasWidth - roomWidth) / 2;
    const startY = (canvasHeight - roomLength) / 2;

    // Draw room outline
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 3;
    ctx.setLineDash([]);
    ctx.strokeRect(startX, startY, roomWidth, roomLength);

    // Fill room with light color
    ctx.fillStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.fillRect(startX, startY, roomWidth, roomLength);

    // Draw grid
    ctx.strokeStyle = '#E5E7EB';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    const gridSize = roomScale;
    for (let x = startX; x <= startX + roomWidth; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, startY + roomLength);
      ctx.stroke();
    }
    
    for (let y = startY; y <= startY + roomLength; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(startX + roomWidth, y);
      ctx.stroke();
    }

    // Draw dimensions
    ctx.fillStyle = '#374151';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';

    // Width dimension (top)
    ctx.fillText(`${width} ft`, startX + roomWidth / 2, startY - 10);
    
    // Length dimension (right)
    ctx.save();
    ctx.translate(startX + roomWidth + 20, startY + roomLength / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText(`${length} ft`, 0, 0);
    ctx.restore();

    // Height dimension (corner)
    ctx.fillStyle = '#059669';
    ctx.fillText(`H: ${height} ft`, startX + roomWidth - 40, startY + 25);

    // Draw furniture based on room type
    drawFurniture(ctx, startX, startY, roomWidth, roomLength, roomType);

    // Draw resize handles
    drawResizeHandles(ctx, startX, startY, roomWidth, roomLength);
  };

  const drawFurniture = (ctx, startX, startY, roomWidth, roomLength, type) => {
    ctx.fillStyle = '#F59E0B';
    ctx.strokeStyle = '#D97706';
    ctx.lineWidth = 2;

    // Determine the room category based on the room type
    let roomCategory = 'generic';
    
    if (type === 'kitchen') {
      roomCategory = 'kitchen';
    } else if (type === 'living_room') {
      roomCategory = 'living_room';
    } else if (type === 'dining_room') {
      roomCategory = 'dining_room';
    } else if (type.includes('bedroom') || type.includes('master')) {
      roomCategory = 'bedroom';
    } else if (type.includes('bathroom')) {
      roomCategory = 'bathroom';
    } else if (type.includes('office') || type.includes('study')) {
      roomCategory = 'office';
    } else if (type.includes('balcony') || type.includes('terrace')) {
      roomCategory = 'balcony';
    }

    switch (roomCategory) {
      case 'kitchen':
        // Draw kitchen cabinets
        // Upper cabinets
        ctx.fillRect(startX + 10, startY + 10, roomWidth - 20, 30);
        ctx.strokeRect(startX + 10, startY + 10, roomWidth - 20, 30);
        
        // Lower cabinets
        ctx.fillRect(startX + 10, startY + roomLength - 40, roomWidth - 20, 30);
        ctx.strokeRect(startX + 10, startY + roomLength - 40, roomWidth - 20, 30);
        
        // Island (if room is large enough)
        if (roomWidth > 200 && roomLength > 200) {
          ctx.fillRect(startX + roomWidth/2 - 40, startY + roomLength/2 - 20, 80, 40);
          ctx.strokeRect(startX + roomWidth/2 - 40, startY + roomLength/2 - 20, 80, 40);
        }
        break;
        
      case 'living_room':
        // Sofa
        ctx.fillRect(startX + 20, startY + roomLength - 60, roomWidth - 40, 40);
        ctx.strokeRect(startX + 20, startY + roomLength - 60, roomWidth - 40, 40);
        
        // Coffee table
        ctx.fillRect(startX + roomWidth/2 - 30, startY + roomLength/2 - 15, 60, 30);
        ctx.strokeRect(startX + roomWidth/2 - 30, startY + roomLength/2 - 15, 60, 30);
        
        // TV unit
        ctx.fillRect(startX + 20, startY + 20, roomWidth - 40, 20);
        ctx.strokeRect(startX + 20, startY + 20, roomWidth - 40, 20);
        break;

      case 'dining_room':
        // Dining table
        ctx.fillRect(startX + roomWidth/2 - 50, startY + roomLength/2 - 30, 100, 60);
        ctx.strokeRect(startX + roomWidth/2 - 50, startY + roomLength/2 - 30, 100, 60);
        
        // Dining cabinet
        ctx.fillRect(startX + 10, startY + 10, roomWidth - 20, 25);
        ctx.strokeRect(startX + 10, startY + 10, roomWidth - 20, 25);
        break;
        
      case 'bedroom':
        // Bed
        ctx.fillRect(startX + roomWidth/2 - 40, startY + roomLength/2 - 30, 80, 60);
        ctx.strokeRect(startX + roomWidth/2 - 40, startY + roomLength/2 - 30, 80, 60);
        
        // Wardrobe
        ctx.fillRect(startX + 10, startY + 10, 30, roomLength - 20);
        ctx.strokeRect(startX + 10, startY + 10, 30, roomLength - 20);
        
        // Study table (for master bedroom)
        if (type.includes('master')) {
          ctx.fillRect(startX + roomWidth - 60, startY + 20, 50, 25);
          ctx.strokeRect(startX + roomWidth - 60, startY + 20, 50, 25);
        }
        break;

      case 'bathroom':
        // Vanity
        ctx.fillRect(startX + 10, startY + 10, roomWidth - 20, 20);
        ctx.strokeRect(startX + 10, startY + 10, roomWidth - 20, 20);
        
        // Shower area
        ctx.fillRect(startX + 10, startY + roomLength - 50, 40, 40);
        ctx.strokeRect(startX + 10, startY + roomLength - 50, 40, 40);
        
        // WC
        ctx.fillRect(startX + roomWidth - 30, startY + roomLength - 50, 20, 20);
        ctx.strokeRect(startX + roomWidth - 30, startY + roomLength - 50, 20, 20);
        break;

      case 'office':
        // Desk
        ctx.fillRect(startX + 20, startY + 20, roomWidth - 40, 30);
        ctx.strokeRect(startX + 20, startY + 20, roomWidth - 40, 30);
        
        // Bookshelf
        ctx.fillRect(startX + 10, startY + 60, 25, roomLength - 80);
        ctx.strokeRect(startX + 10, startY + 60, 25, roomLength - 80);
        
        // Chair area
        ctx.fillRect(startX + roomWidth/2 - 15, startY + 60, 30, 30);
        ctx.strokeRect(startX + roomWidth/2 - 15, startY + 60, 30, 30);
        break;

      case 'balcony':
        // Seating area
        ctx.fillRect(startX + 20, startY + roomLength - 40, roomWidth - 40, 30);
        ctx.strokeRect(startX + 20, startY + roomLength - 40, roomWidth - 40, 30);
        
        // Planter boxes
        ctx.fillRect(startX + 10, startY + 10, 20, roomLength - 60);
        ctx.strokeRect(startX + 10, startY + 10, 20, roomLength - 60);
        break;
        
      default:
        // Generic furniture - for custom room types
        // Simple table
        ctx.fillRect(startX + roomWidth/2 - 30, startY + roomLength/2 - 20, 60, 40);
        ctx.strokeRect(startX + roomWidth/2 - 30, startY + roomLength/2 - 20, 60, 40);
        
        // Simple storage
        ctx.fillRect(startX + 15, startY + 15, 30, roomWidth/4);
        ctx.strokeRect(startX + 15, startY + 15, 30, roomWidth/4);
    }
  };

  const drawResizeHandles = (ctx, startX, startY, roomWidth, roomLength) => {
    ctx.fillStyle = '#EF4444';
    ctx.strokeStyle = '#DC2626';
    ctx.lineWidth = 2;

    const handleSize = 8;
    
    // Corner handles
    const handles = [
      { x: startX + roomWidth, y: startY, cursor: 'ne-resize', type: 'corner' },
      { x: startX + roomWidth, y: startY + roomLength, cursor: 'se-resize', type: 'corner' },
      { x: startX, y: startY + roomLength, cursor: 'sw-resize', type: 'corner' },
      { x: startX, y: startY, cursor: 'nw-resize', type: 'corner' }
    ];

    handles.forEach(handle => {
      ctx.fillRect(handle.x - handleSize/2, handle.y - handleSize/2, handleSize, handleSize);
      ctx.strokeRect(handle.x - handleSize/2, handle.y - handleSize/2, handleSize, handleSize);
    });
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on resize handles
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const maxDimension = Math.max(length, width);
    const roomScale = Math.min(canvasWidth * 0.6, canvasHeight * 0.6) / maxDimension;
    
    const roomWidth = width * roomScale * scale;
    const roomLength = length * roomScale * scale;
    const startX = (canvasWidth - roomWidth) / 2;
    const startY = (canvasHeight - roomLength) / 2;

    const handleSize = 8;
    const handles = [
      { x: startX + roomWidth, y: startY, type: 'width-length' },
      { x: startX + roomWidth, y: startY + roomLength, type: 'width-length' },
    ];

    for (let handle of handles) {
      if (Math.abs(x - handle.x) < handleSize && Math.abs(y - handle.y) < handleSize) {
        setIsDragging(true);
        setDragPoint({ x, y, type: handle.type, startWidth: width, startLength: length });
        break;
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !dragPoint) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const deltaX = x - dragPoint.x;
    const deltaY = y - dragPoint.y;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const maxDimension = Math.max(dragPoint.startLength, dragPoint.startWidth);
    const roomScale = Math.min(canvasWidth * 0.6, canvasHeight * 0.6) / maxDimension;

    if (dragPoint.type === 'width-length') {
      const newWidth = Math.max(6, dragPoint.startWidth + deltaX / (roomScale * scale));
      const newLength = Math.max(6, dragPoint.startLength + deltaY / (roomScale * scale));
      
      onDimensionChange('width', Math.round(newWidth * 10) / 10);
      onDimensionChange('length', Math.round(newLength * 10) / 10);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragPoint(null);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{roomType.includes('_') ? roomType.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : roomType.charAt(0).toUpperCase() + roomType.slice(1)} Visualizer</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setScale(Math.max(0.5, scale - 0.1))}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-sm">Zoom</span>
          <button
            onClick={() => setScale(Math.min(2, scale + 0.1))}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
      </div>
      
      <motion.canvas
        ref={canvasRef}
        width={400}
        height={300}
        className="border border-gray-300 rounded cursor-crosshair w-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="mt-4 text-sm text-gray-600">
        <p>• Drag the red corners to resize the room</p>
        <p>• Use zoom controls to get a better view</p>
        <p>• Furniture layout is automatically optimized</p>
      </div>
    </div>
  );
};

export default RoomCanvas;