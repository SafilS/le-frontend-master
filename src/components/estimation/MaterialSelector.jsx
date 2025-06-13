import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Star, Award } from 'lucide-react';

const MaterialSelector = ({ selectedMaterial, onMaterialChange, category, title }) => {
  const [showDetails, setShowDetails] = useState(null);

  const materials = {
    wood: [
      {
        id: 'plywood',
        name: 'Plywood',
        price: '₹150/sq ft',
        quality: 'Good',
        description: 'BWR grade plywood, moisture resistant',
        features: ['Moisture resistant', 'Good strength', 'Cost effective', 'Easy to work with'],
        image: '/assets/materials/plywood.jpg',
        color: '#D2B48C',
        rating: 4.2,
        warranty: '5 years',
        pros: ['Durable', 'Affordable', 'Versatile'],
        cons: ['Visible layers', 'Limited finishes']
      },
      {
        id: 'mdf',
        name: 'MDF',
        price: '₹120/sq ft',
        quality: 'Standard',
        description: 'Medium Density Fiberboard, smooth finish',
        features: ['Smooth surface', 'Paint-friendly', 'Uniform density', 'No grain pattern'],
        image: '/assets/materials/mdf.jpg',
        color: '#F5DEB3',
        rating: 3.8,
        warranty: '3 years',
        pros: ['Smooth finish', 'Easy to paint', 'Consistent'],
        cons: ['Not moisture resistant', 'Heavy weight']
      },
      {
        id: 'particle',
        name: 'Particle Board',
        price: '₹80/sq ft',
        quality: 'Basic',
        description: 'Particle board, budget-friendly',
        features: ['Budget option', 'Light weight', 'Smooth surface', 'Good for laminates'],
        image: '/assets/materials/particle.jpg',
        color: '#DDD',
        rating: 3.2,
        warranty: '2 years',
        pros: ['Very affordable', 'Lightweight', 'Smooth'],
        cons: ['Low durability', 'Moisture sensitive']
      },
      {
        id: 'solid',
        name: 'Solid Wood',
        price: '₹300/sq ft',
        quality: 'Premium',
        description: 'Solid wood, natural grain',
        features: ['Natural beauty', 'Long lasting', 'Repairable', 'Premium feel'],
        image: '/assets/materials/solid-wood.jpg',
        color: '#8B4513',
        rating: 4.8,
        warranty: '10 years',
        pros: ['Natural beauty', 'Very durable', 'Repairable'],
        cons: ['Expensive', 'Requires maintenance']
      }
    ],
    finishes: [
      {
        id: 'laminate',
        name: 'Laminate',
        price: '₹50/sq ft',
        description: 'High-pressure laminate, durable',
        features: ['Scratch resistant', 'Easy maintenance', 'Wide variety', 'Cost effective'],
        image: '/assets/finishes/laminate.jpg',
        color: '#E6E6FA',
        rating: 4.3,
        warranty: '5 years',
        pros: ['Durable', 'Easy to clean', 'Many designs'],
        cons: ['Can chip', 'Repair difficult']
      },
      {
        id: 'veneer',
        name: 'Wood Veneer',
        price: '₹120/sq ft',
        description: 'Natural wood veneer, premium look',
        features: ['Natural wood look', 'Premium appearance', 'Repairable', 'Unique grain'],
        image: '/assets/finishes/veneer.jpg',
        color: '#DEB887',
        rating: 4.6,
        warranty: '7 years',
        pros: ['Natural look', 'Premium feel', 'Repairable'],
        cons: ['Requires care', 'More expensive']
      },
      {
        id: 'paint',
        name: 'Paint Finish',
        price: '₹30/sq ft',
        description: 'Premium paint finish, multiple coats',
        features: ['Custom colors', 'Easy touch-up', 'Cost effective', 'Quick application'],
        image: '/assets/finishes/paint.jpg',
        color: '#F0F8FF',
        rating: 3.9,
        warranty: '3 years',
        pros: ['Any color', 'Easy touch-up', 'Affordable'],
        cons: ['Shows wear', 'Regular maintenance']
      },
      {
        id: 'lacquer',
        name: 'Lacquer Finish',
        price: '₹80/sq ft',
        description: 'High-gloss lacquer finish',
        features: ['High gloss', 'Smooth finish', 'Durable', 'Premium look'],
        image: '/assets/finishes/lacquer.jpg',
        color: '#FFFAF0',
        rating: 4.4,
        warranty: '6 years',
        pros: ['High gloss', 'Smooth', 'Durable'],
        cons: ['Shows fingerprints', 'Expensive']
      }
    ],
    hardware: [
      {
        id: 'basic',
        name: 'Basic Hardware',
        price: '₹2,000/set',
        description: 'Standard hinges, handles, and fittings',
        features: ['Standard hinges', 'Basic handles', 'Drawer slides', 'Essential locks'],
        image: '/assets/hardware/basic.jpg',
        color: '#C0C0C0',
        rating: 3.5,
        warranty: '2 years',
        items: ['Hinges', 'Handles', 'Drawer slides', 'Locks']
      },
      {
        id: 'premium',
        name: 'Premium Hardware',
        price: '₹5,000/set',
        description: 'Soft-close mechanisms, premium handles',
        features: ['Soft-close hinges', 'Designer handles', 'Premium slides', 'Push-to-open'],
        image: '/assets/hardware/premium.jpg',
        color: '#B8860B',
        rating: 4.3,
        warranty: '5 years',
        items: ['Soft-close hinges', 'Designer handles', 'Premium slides', 'Push-to-open']
      },
      {
        id: 'luxury',
        name: 'Luxury Hardware',
        price: '₹10,000/set',
        description: 'Designer hardware, imported fittings',
        features: ['Imported hinges', 'Luxury handles', 'Servo drives', 'Smart locks'],
        image: '/assets/hardware/luxury.jpg',
        color: '#FFD700',
        rating: 4.8,
        warranty: '10 years',
        items: ['Imported hinges', 'Luxury handles', 'Servo drives', 'Smart locks']
      }
    ]
  };

  const categoryMaterials = materials[category] || [];

  const getQualityColor = (quality) => {
    switch (quality) {
      case 'Basic': return 'text-orange-600 bg-orange-100';
      case 'Standard': return 'text-blue-600 bg-blue-100';
      case 'Good': return 'text-green-600 bg-green-100';
      case 'Premium': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categoryMaterials.map((material) => (
          <motion.div
            key={material.id}
            whileHover={{ scale: 1.02 }}
            className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
              selectedMaterial === material.id 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            }`}
            onClick={() => onMaterialChange(material.id)}
          >
            {/* Selection indicator */}
            {selectedMaterial === material.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <Check size={14} className="text-white" />
              </div>
            )}

            {/* Material preview */}
            <div className="flex items-start space-x-4 mb-4">
              <div 
                className="w-16 h-16 rounded-lg border-2 border-gray-200 flex-shrink-0"
                style={{ backgroundColor: material.color }}
              >
                {/* Placeholder for material texture/image */}
                <div className="w-full h-full rounded-lg bg-gradient-to-br from-white/20 to-black/10"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900 truncate">{material.name}</h4>
                  <span className="text-sm font-medium text-blue-600 whitespace-nowrap ml-2">
                    {material.price}
                  </span>
                </div>
                
                {material.quality && (
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(material.quality)}`}>
                    {material.quality}
                  </span>
                )}
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-2">
                    {renderStars(material.rating)}
                  </div>
                  <span className="text-xs text-gray-600">{material.rating}</span>
                  {material.warranty && (
                    <span className="text-xs text-gray-500 ml-2">• {material.warranty} warranty</span>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3">{material.description}</p>

            {/* Features */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">Key Features:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(showDetails === material.id ? null : material.id);
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  <Info size={14} />
                </button>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {material.features.slice(0, 2).map((feature, index) => (
                  <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
                {material.features.length > 2 && (
                  <span className="text-xs text-gray-500">+{material.features.length - 2} more</span>
                )}
              </div>
            </div>

            {/* Detailed info popup */}
            {showDetails === material.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">All Features:</h5>
                    <div className="grid grid-cols-2 gap-1">
                      {material.features.map((feature, index) => (
                        <div key={index} className="text-xs text-gray-600 flex items-center">
                          <div className="w-1 h-1 bg-blue-500 rounded-full mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {material.pros && (
                    <div>
                      <h5 className="font-medium text-green-700 mb-1">Pros:</h5>
                      <div className="space-y-1">
                        {material.pros.map((pro, index) => (
                          <div key={index} className="text-xs text-green-600 flex items-center">
                            <Check size={10} className="mr-1" />
                            {pro}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {material.cons && (
                    <div>
                      <h5 className="font-medium text-red-700 mb-1">Considerations:</h5>
                      <div className="space-y-1">
                        {material.cons.map((con, index) => (
                          <div key={index} className="text-xs text-red-600 flex items-center">
                            <Info size={10} className="mr-1" />
                            {con}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {material.items && (
                    <div>
                      <h5 className="font-medium text-gray-700 mb-1">Includes:</h5>
                      <div className="grid grid-cols-2 gap-1">
                        {material.items.map((item, index) => (
                          <div key={index} className="text-xs text-gray-600">• {item}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MaterialSelector;