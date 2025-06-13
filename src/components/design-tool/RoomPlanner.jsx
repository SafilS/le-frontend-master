import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize, 
  RotateCcw, 
  Move, 
  Square, 
  Circle,
  Triangle,
  Ruler,
  Grid,
  Eye,
  EyeOff,
  Layers,
  Save,
  Download,
  Share2,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Home,
  Sofa,
  Bed,
  ChefHat,
  Monitor,
  Bath,
  Shirt,
  Settings,
  Camera,
  Play
} from 'lucide-react';

const RoomPlanner = ({ roomType = 'living-room', onSave, onClose }) => {
  const [selectedTool, setSelectedTool] = useState('wall');
  const [selectedRoom, setSelectedRoom] = useState(roomType);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [show3D, setShow3D] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [roomDimensions, setRoomDimensions] = useState({ width: 400, height: 300 });
  const canvasRef = useRef(null);
  const [walls, setWalls] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const roomTypes = [
    { id: 'living-room', name: 'Living Room', icon: Sofa },
    { id: 'bedroom', name: 'Bedroom', icon: Bed },
    { id: 'kitchen', name: 'Kitchen', icon: ChefHat },
    { id: 'bathroom', name: 'Bathroom', icon: Bath },
    { id: 'office', name: 'Office', icon: Monitor },
    { id: 'wardrobe', name: 'Wardrobe', icon: Shirt }
  ];

  const tools = [
    { id: 'wall', name: 'Wall', icon: Square },
    { id: 'door', name: 'Door', icon: Square },
    { id: 'window', name: 'Window', icon: Square },
    { id: 'furniture', name: 'Furniture', icon: Sofa },
    { id: 'measure', name: 'Measure', icon: Ruler },
    { id: 'move', name: 'Move', icon: Move }
  ];

  const furnitureLibrary = {
    'living-room': [
      { id: 'sofa-3seat', name: '3-Seat Sofa', width: 200, height: 80, color: '#8B4513', price: 45000 },
      { id: 'sofa-2seat', name: '2-Seat Sofa', width: 150, height: 80, color: '#8B4513', price: 32000 },
      { id: 'armchair', name: 'Armchair', width: 80, height: 80, color: '#A0522D', price: 18000 },
      { id: 'coffee-table', name: 'Coffee Table', width: 120, height: 60, color: '#D2691E', price: 15000 },
      { id: 'side-table', name: 'Side Table', width: 50, height: 50, color: '#D2691E', price: 8000 },
      { id: 'tv-unit', name: 'TV Unit', width: 180, height: 40, color: '#8B4513', price: 25000 },
      { id: 'bookshelf', name: 'Bookshelf', width: 80, height: 200, color: '#8B4513', price: 22000 }
    ],
    'bedroom': [
      { id: 'king-bed', name: 'King Bed', width: 180, height: 200, color: '#8B4513', price: 55000 },
      { id: 'queen-bed', name: 'Queen Bed', width: 150, height: 200, color: '#8B4513', price: 45000 },
      { id: 'nightstand', name: 'Nightstand', width: 50, height: 40, color: '#D2691E', price: 12000 },
      { id: 'dresser', name: 'Dresser', width: 120, height: 50, color: '#8B4513', price: 28000 },
      { id: 'wardrobe', name: 'Wardrobe', width: 120, height: 60, color: '#8B4513', price: 65000 },
      { id: 'study-table', name: 'Study Table', width: 120, height: 60, color: '#D2691E', price: 18000 }
    ],
    'kitchen': [
      { id: 'island', name: 'Kitchen Island', width: 200, height: 100, color: '#696969', price: 85000 },
      { id: 'dining-table', name: 'Dining Table', width: 160, height: 90, color: '#8B4513', price: 35000 },
      { id: 'dining-chair', name: 'Dining Chair', width: 45, height: 45, color: '#A0522D', price: 8000 },
      { id: 'cabinet', name: 'Cabinet', width: 80, height: 40, color: '#696969', price: 22000 },
      { id: 'refrigerator', name: 'Refrigerator', width: 60, height: 60, color: '#C0C0C0', price: 45000 }
    ],
    'bathroom': [
      { id: 'bathtub', name: 'Bathtub', width: 170, height: 80, color: '#FFFFFF', price: 35000 },
      { id: 'shower', name: 'Shower', width: 90, height: 90, color: '#E6E6FA', price: 25000 },
      { id: 'toilet', name: 'Toilet', width: 40, height: 60, color: '#FFFFFF', price: 15000 },
      { id: 'sink', name: 'Sink', width: 60, height: 40, color: '#FFFFFF', price: 12000 },
      { id: 'vanity', name: 'Vanity', width: 120, height: 50, color: '#8B4513', price: 28000 }
    ],
    'office': [
      { id: 'desk', name: 'Office Desk', width: 140, height: 70, color: '#8B4513', price: 25000 },
      { id: 'office-chair', name: 'Office Chair', width: 60, height: 60, color: '#000000', price: 15000 },
      { id: 'bookshelf', name: 'Bookshelf', width: 80, height: 200, color: '#8B4513', price: 22000 },
      { id: 'filing-cabinet', name: 'Filing Cabinet', width: 40, height: 60, color: '#696969', price: 18000 },
      { id: 'meeting-table', name: 'Meeting Table', width: 200, height: 100, color: '#8B4513', price: 45000 }
    ]
  };

  const addFurniture = (item) => {
    const newFurniture = {
      id: Date.now(),
      ...item,
      x: 100,
      y: 100,
      rotation: 0
    };
    setFurniture(prev => [...prev, newFurniture]);
  };

  const handleCanvasClick = (e) => {
    if (selectedTool === 'furniture') return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'wall') {
      // Add wall logic here
    }
  };

  const moveFurniture = (id, newX, newY) => {
    setFurniture(prev => prev.map(item => 
      item.id === id ? { ...item, x: newX, y: newY } : item
    ));
  };

  const rotateFurniture = (id) => {
    setFurniture(prev => prev.map(item => 
      item.id === id ? { ...item, rotation: (item.rotation + 90) % 360 } : item
    ));
  };

  const deleteFurniture = (id) => {
    setFurniture(prev => prev.filter(item => item.id !== id));
    setSelectedItem(null);
  };

  const calculateTotalPrice = () => {
    return furniture.reduce((total, item) => total + item.price, 0);
  };

  const saveRoom = () => {
    const roomData = {
      type: selectedRoom,
      dimensions: roomDimensions,
      walls,
      furniture,
      totalPrice: calculateTotalPrice(),
      timestamp: new Date().toISOString()
    };
    onSave && onSave(roomData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      {/* Left Sidebar - Tools and Furniture */}
      <div className="w-80 bg-white shadow-xl overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Room Planner</h2>
          <p className="text-sm text-gray-600">Design your space in 2D/3D</p>
        </div>

        {/* Room Type Selector */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">Room Type</h3>
          <div className="grid grid-cols-2 gap-2">
            {roomTypes.map(room => {
              const IconComponent = room.icon;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-colors text-sm ${
                    selectedRoom === room.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="font-medium">{room.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {tools.map(tool => {
              const IconComponent = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-colors text-sm ${
                    selectedTool === tool.id
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={16} />
                  <span className="font-medium">{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Furniture Library */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">Furniture</h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {furnitureLibrary[selectedRoom]?.map((item, idx) => (
              <button
                key={idx}
                onClick={() => addFurniture(item)}
                className="w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-600">{item.width}×{item.height} cm</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-green-600">₹{item.price.toLocaleString()}</p>
                    <div 
                      className="w-4 h-4 rounded border border-gray-300"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Room Dimensions */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Room Dimensions</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Width (cm)</label>
              <input
                type="number"
                value={roomDimensions.width}
                onChange={(e) => setRoomDimensions(prev => ({ ...prev, width: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">Height (cm)</label>
              <input
                type="number"
                value={roomDimensions.height}
                onChange={(e) => setRoomDimensions(prev => ({ ...prev, height: parseInt(e.target.value) }))}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Toolbar */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`p-2 rounded ${showGrid ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setShow3D(!show3D)}
              className={`p-2 rounded ${show3D ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}
            >
              {show3D ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <ZoomOut size={20} />
              </button>
              <span className="text-sm font-medium min-w-[60px] text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                className="p-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                <ZoomIn size={20} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Undo size={20} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Redo size={20} />
            </button>
            <button className="p-2 bg-gray-100 rounded hover:bg-gray-200">
              <Camera size={20} />
            </button>
            <button
              onClick={saveRoom}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <Save size={20} />
              Save Room
            </button>
            <button
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden bg-gray-100">
          <div
            ref={canvasRef}
            className="w-full h-full relative cursor-crosshair"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center'
            }}
            onClick={handleCanvasClick}
          >
            {/* Grid */}
            {showGrid && (
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, #000 1px, transparent 1px),
                    linear-gradient(to bottom, #000 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />
            )}

            {/* Room Outline */}
            <div
              className="absolute border-4 border-gray-800 bg-white/80"
              style={{
                left: '50%',
                top: '50%',
                width: roomDimensions.width,
                height: roomDimensions.height,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Room Label */}
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                {roomTypes.find(r => r.id === selectedRoom)?.name} - {roomDimensions.width}×{roomDimensions.height} cm
              </div>
            </div>

            {/* Furniture Items */}
            {furniture.map(item => (
              <div
                key={item.id}
                className={`absolute border-2 cursor-pointer transition-all ${
                  selectedItem?.id === item.id
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-400 hover:border-gray-600'
                }`}
                style={{
                  left: `calc(50% + ${item.x - roomDimensions.width/2}px)`,
                  top: `calc(50% + ${item.y - roomDimensions.height/2}px)`,
                  width: item.width,
                  height: item.height,
                  transform: `rotate(${item.rotation}deg)`,
                  backgroundColor: item.color,
                  borderRadius: '4px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedItem(item);
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-black/20 rounded">
                  {item.name}
                </div>
                
                {selectedItem?.id === item.id && (
                  <>
                    <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                      {item.name} - ₹{item.price.toLocaleString()}
                    </div>
                    <div className="absolute -top-2 -right-2 flex gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          rotateFurniture(item.id);
                        }}
                        className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700"
                      >
                        <RotateCcw size={12} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteFurniture(item.id);
                        }}
                        className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* 3D View Overlay */}
            {show3D && (
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                <div className="bg-white/90 p-8 rounded-xl text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">3D View</h3>
                  <p className="text-gray-600 mb-4">Experience your room in 3D perspective</p>
                  <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 flex items-center gap-2 mx-auto">
                    <Play size={16} />
                    Launch 3D View
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-white border-t p-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600">
              Furniture: {furniture.length} items
            </div>
            <div className="text-sm text-gray-600">
              Total Cost: ₹{calculateTotalPrice().toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              Room: {roomDimensions.width}×{roomDimensions.height} cm
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      {selectedItem && (
        <div className="w-80 bg-white shadow-xl border-l overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Item Properties</h3>
            <p className="text-sm text-gray-600">{selectedItem.name}</p>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">X</label>
                  <input
                    type="number"
                    value={selectedItem.x}
                    onChange={(e) => moveFurniture(selectedItem.id, parseInt(e.target.value), selectedItem.y)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Y</label>
                  <input
                    type="number"
                    value={selectedItem.y}
                    onChange={(e) => moveFurniture(selectedItem.id, selectedItem.x, parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">Width</label>
                  <input
                    type="number"
                    value={selectedItem.width}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Height</label>
                  <input
                    type="number"
                    value={selectedItem.height}
                    readOnly
                    className="w-full p-2 border border-gray-300 rounded text-sm bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="color"
                value={selectedItem.color}
                onChange={(e) => setFurniture(prev => prev.map(item => 
                  item.id === selectedItem.id ? { ...item, color: e.target.value } : item
                ))}
                className="w-full h-10 rounded border border-gray-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rotation</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="90"
                  value={selectedItem.rotation}
                  onChange={(e) => setFurniture(prev => prev.map(item => 
                    item.id === selectedItem.id ? { ...item, rotation: parseInt(e.target.value) } : item
                  ))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-[40px]">{selectedItem.rotation}°</span>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-lg font-semibold text-gray-800 mb-2">
                ₹{selectedItem.price.toLocaleString()}
              </div>
              <button
                onClick={() => deleteFurniture(selectedItem.id)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomPlanner;