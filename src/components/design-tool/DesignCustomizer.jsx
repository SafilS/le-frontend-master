import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Palette, 
  Move, 
  RotateCcw, 
  Save, 
  Share2, 
  Download, 
  Eye, 
  EyeOff,
  Layers,
  Settings,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  Grid,
  Ruler,
  Camera,
  Heart,
  ShoppingCart,
  Calculator
} from 'lucide-react';

const DesignCustomizer = ({ designData, onSave, onClose }) => {
  const [selectedTool, setSelectedTool] = useState('move');
  const [selectedElement, setSelectedElement] = useState(null);
  const [showLayers, setShowLayers] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const canvasRef = useRef(null);

  const [roomElements, setRoomElements] = useState([
    {
      id: 1,
      type: 'furniture',
      name: 'Sofa',
      category: 'seating',
      x: 100,
      y: 150,
      width: 200,
      height: 80,
      rotation: 0,
      color: '#8B4513',
      material: 'Leather',
      price: 45000,
      image: '/assets/furniture/sofa.png'
    },
    {
      id: 2,
      type: 'furniture',
      name: 'Coffee Table',
      category: 'table',
      x: 150,
      y: 250,
      width: 100,
      height: 60,
      rotation: 0,
      color: '#D2691E',
      material: 'Wood',
      price: 15000,
      image: '/assets/furniture/coffee-table.png'
    },
    {
      id: 3,
      type: 'decor',
      name: 'Floor Lamp',
      category: 'lighting',
      x: 50,
      y: 100,
      width: 30,
      height: 120,
      rotation: 0,
      color: '#FFD700',
      material: 'Metal',
      price: 8000,
      image: '/assets/decor/floor-lamp.png'
    }
  ]);

  const [roomSettings, setRoomSettings] = useState({
    wallColor: '#F5F5F5',
    floorType: 'hardwood',
    floorColor: '#DEB887',
    lighting: 'warm',
    style: 'modern'
  });

  const tools = [
    { id: 'move', name: 'Move', icon: Move },
    { id: 'rotate', name: 'Rotate', icon: RotateCcw },
    { id: 'color', name: 'Color', icon: Palette },
    { id: 'measure', name: 'Measure', icon: Ruler }
  ];

  const furnitureCategories = [
    {
      name: 'Seating',
      items: [
        { name: 'Sofa', price: 45000, image: '/assets/furniture/sofa.png' },
        { name: 'Armchair', price: 25000, image: '/assets/furniture/armchair.png' },
        { name: 'Ottoman', price: 12000, image: '/assets/furniture/ottoman.png' }
      ]
    },
    {
      name: 'Tables',
      items: [
        { name: 'Coffee Table', price: 15000, image: '/assets/furniture/coffee-table.png' },
        { name: 'Side Table', price: 8000, image: '/assets/furniture/side-table.png' },
        { name: 'Dining Table', price: 65000, image: '/assets/furniture/dining-table.png' }
      ]
    },
    {
      name: 'Storage',
      items: [
        { name: 'Bookshelf', price: 35000, image: '/assets/furniture/bookshelf.png' },
        { name: 'TV Unit', price: 28000, image: '/assets/furniture/tv-unit.png' },
        { name: 'Cabinet', price: 22000, image: '/assets/furniture/cabinet.png' }
      ]
    },
    {
      name: 'Lighting',
      items: [
        { name: 'Floor Lamp', price: 8000, image: '/assets/decor/floor-lamp.png' },
        { name: 'Table Lamp', price: 4500, image: '/assets/decor/table-lamp.png' },
        { name: 'Pendant Light', price: 12000, image: '/assets/decor/pendant.png' }
      ]
    }
  ];

  const colorPalettes = [
    { name: 'Warm Neutrals', colors: ['#F5F5DC', '#DEB887', '#D2691E', '#8B4513'] },
    { name: 'Cool Blues', colors: ['#F0F8FF', '#87CEEB', '#4682B4', '#2F4F4F'] },
    { name: 'Earth Tones', colors: ['#F4A460', '#CD853F', '#A0522D', '#8B4513'] },
    { name: 'Modern Grays', colors: ['#F8F8FF', '#DCDCDC', '#696969', '#2F2F2F'] }
  ];

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleElementMove = (elementId, newX, newY) => {
    setRoomElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, x: newX, y: newY } : el
    ));
  };

  const handleElementRotate = (elementId, rotation) => {
    setRoomElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, rotation: rotation + 90 } : el
    ));
  };

  const handleColorChange = (elementId, color) => {
    setRoomElements(prev => prev.map(el => 
      el.id === elementId ? { ...el, color } : el
    ));
  };

  const addFurniture = (item) => {
    const newElement = {
      id: Date.now(),
      type: 'furniture',
      name: item.name,
      category: item.name.toLowerCase().replace(' ', '-'),
      x: 200,
      y: 200,
      width: 100,
      height: 80,
      rotation: 0,
      color: '#8B4513',
      material: 'Wood',
      price: item.price,
      image: item.image
    };
    setRoomElements(prev => [...prev, newElement]);
  };

  const removeElement = (elementId) => {
    setRoomElements(prev => prev.filter(el => el.id !== elementId));
    setSelectedElement(null);
  };

  const calculateTotalPrice = () => {
    return roomElements.reduce((total, element) => total + element.price, 0);
  };

  const saveDesign = () => {
    const designData = {
      elements: roomElements,
      settings: roomSettings,
      timestamp: new Date().toISOString(),
      totalPrice: calculateTotalPrice()
    };
    onSave(designData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex">
      {/* Left Sidebar - Tools and Elements */}
      <div className="w-80 bg-white shadow-xl overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Design Studio</h2>
          <p className="text-sm text-gray-600">Customize your interior design</p>
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
                  className={`flex items-center gap-2 p-3 rounded-lg transition-colors ${
                    selectedTool === tool.id
                      ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm font-medium">{tool.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Furniture Library */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">Furniture Library</h3>
          <div className="space-y-4">
            {furnitureCategories.map((category, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-medium text-gray-600 mb-2">{category.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {category.items.map((item, itemIdx) => (
                    <button
                      key={itemIdx}
                      onClick={() => addFurniture(item)}
                      className="p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <div className="w-full h-16 bg-gray-200 rounded mb-2 flex items-center justify-center">
                        <span className="text-xs text-gray-500">{item.name}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-800">{item.name}</p>
                      <p className="text-xs text-yellow-600">₹{item.price.toLocaleString()}</p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palettes */}
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-800 mb-3">Color Palettes</h3>
          <div className="space-y-3">
            {colorPalettes.map((palette, idx) => (
              <div key={idx}>
                <p className="text-sm text-gray-600 mb-2">{palette.name}</p>
                <div className="flex gap-2">
                  {palette.colors.map((color, colorIdx) => (
                    <button
                      key={colorIdx}
                      onClick={() => selectedElement && handleColorChange(selectedElement.id, color)}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Settings */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-800 mb-3">Room Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wall Color</label>
              <input
                type="color"
                value={roomSettings.wallColor}
                onChange={(e) => setRoomSettings(prev => ({ ...prev, wallColor: e.target.value }))}
                className="w-full h-10 rounded border border-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Floor Type</label>
              <select
                value={roomSettings.floorType}
                onChange={(e) => setRoomSettings(prev => ({ ...prev, floorType: e.target.value }))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="hardwood">Hardwood</option>
                <option value="tile">Tile</option>
                <option value="carpet">Carpet</option>
                <option value="laminate">Laminate</option>
              </select>
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
              className={`p-2 rounded ${showGrid ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid size={20} />
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
            <button
              onClick={() => setShowLayers(!showLayers)}
              className={`p-2 rounded ${showLayers ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-600'}`}
            >
              <Layers size={20} />
            </button>
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
              onClick={saveDesign}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 flex items-center gap-2"
            >
              <Save size={20} />
              Save Design
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
            className="w-full h-full relative"
            style={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'center center',
              backgroundColor: roomSettings.wallColor
            }}
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

            {/* Room Elements */}
            {roomElements.map(element => (
              <div
                key={element.id}
                className={`absolute border-2 cursor-pointer transition-all ${
                  selectedElement?.id === element.id
                    ? 'border-yellow-500 shadow-lg'
                    : 'border-transparent hover:border-gray-400'
                }`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: `rotate(${element.rotation}deg)`,
                  backgroundColor: element.color,
                  borderRadius: '4px'
                }}
                onClick={() => handleElementClick(element)}
              >
                <div className="w-full h-full flex items-center justify-center text-white text-xs font-medium bg-black/20 rounded">
                  {element.name}
                </div>
                
                {selectedElement?.id === element.id && (
                  <div className="absolute -top-8 left-0 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    {element.name} - ₹{element.price.toLocaleString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="bg-white border-t p-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-sm text-gray-600">
              Elements: {roomElements.length}
            </div>
            <div className="text-sm text-gray-600">
              Total Cost: ₹{calculateTotalPrice().toLocaleString()}
            </div>
            {selectedElement && (
              <div className="text-sm text-gray-600">
                Selected: {selectedElement.name}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 flex items-center gap-2">
              <Calculator size={16} />
              Get Estimate
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Properties */}
      {selectedElement && (
        <div className="w-80 bg-white shadow-xl border-l overflow-y-auto">
          <div className="p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Properties</h3>
            <p className="text-sm text-gray-600">{selectedElement.name}</p>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">X</label>
                  <input
                    type="number"
                    value={selectedElement.x}
                    onChange={(e) => handleElementMove(selectedElement.id, parseInt(e.target.value), selectedElement.y)}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Y</label>
                  <input
                    type="number"
                    value={selectedElement.y}
                    onChange={(e) => handleElementMove(selectedElement.id, selectedElement.x, parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-500">Width</label>
                  <input
                    type="number"
                    value={selectedElement.width}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500">Height</label>
                  <input
                    type="number"
                    value={selectedElement.height}
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <input
                type="color"
                value={selectedElement.color}
                onChange={(e) => handleColorChange(selectedElement.id, e.target.value)}
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
                  value={selectedElement.rotation}
                  onChange={(e) => setRoomElements(prev => prev.map(el => 
                    el.id === selectedElement.id ? { ...el, rotation: parseInt(e.target.value) } : el
                  ))}
                  className="flex-1"
                />
                <span className="text-sm text-gray-600 min-w-[40px]">{selectedElement.rotation}°</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
              <select
                value={selectedElement.material}
                onChange={(e) => setRoomElements(prev => prev.map(el => 
                  el.id === selectedElement.id ? { ...el, material: e.target.value } : el
                ))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="Wood">Wood</option>
                <option value="Metal">Metal</option>
                <option value="Leather">Leather</option>
                <option value="Fabric">Fabric</option>
                <option value="Glass">Glass</option>
              </select>
            </div>

            <div className="pt-4 border-t">
              <div className="text-lg font-semibold text-gray-800 mb-2">
                ₹{selectedElement.price.toLocaleString()}
              </div>
              <button
                onClick={() => removeElement(selectedElement.id)}
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                Remove Element
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignCustomizer;