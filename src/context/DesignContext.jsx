import React, { createContext, useContext, useReducer, useEffect } from 'react';

const DesignContext = createContext();

const initialState = {
  savedDesigns: [],
  currentDesign: null,
  favorites: [],
  recentlyViewed: [],
  designHistory: [],
  userPreferences: {
    style: 'modern',
    colorScheme: 'neutral',
    budget: { min: 100000, max: 500000 },
    roomTypes: []
  }
};

const designReducer = (state, action) => {
  switch (action.type) {
    case 'SAVE_DESIGN':
      const newDesign = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return {
        ...state,
        savedDesigns: [...state.savedDesigns, newDesign],
        currentDesign: newDesign
      };

    case 'UPDATE_DESIGN':
      return {
        ...state,
        savedDesigns: state.savedDesigns.map(design =>
          design.id === action.payload.id
            ? { ...design, ...action.payload, updatedAt: new Date().toISOString() }
            : design
        ),
        currentDesign: action.payload.id === state.currentDesign?.id
          ? { ...state.currentDesign, ...action.payload }
          : state.currentDesign
      };

    case 'DELETE_DESIGN':
      return {
        ...state,
        savedDesigns: state.savedDesigns.filter(design => design.id !== action.payload),
        currentDesign: state.currentDesign?.id === action.payload ? null : state.currentDesign
      };

    case 'SET_CURRENT_DESIGN':
      return {
        ...state,
        currentDesign: action.payload
      };

    case 'ADD_TO_FAVORITES':
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload)
      };

    case 'ADD_TO_RECENTLY_VIEWED':
      const filtered = state.recentlyViewed.filter(id => id !== action.payload);
      return {
        ...state,
        recentlyViewed: [action.payload, ...filtered].slice(0, 10) // Keep only last 10
      };

    case 'UPDATE_USER_PREFERENCES':
      return {
        ...state,
        userPreferences: { ...state.userPreferences, ...action.payload }
      };

    case 'ADD_TO_HISTORY':
      return {
        ...state,
        designHistory: [action.payload, ...state.designHistory].slice(0, 50) // Keep only last 50
      };

    case 'LOAD_SAVED_DATA':
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

export const DesignProvider = ({ children }) => {
  const [state, dispatch] = useReducer(designReducer, initialState);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('crownDesignData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved design data:', error);
      }
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('crownDesignData', JSON.stringify(state));
  }, [state]);

  const saveDesign = (designData) => {
    dispatch({ type: 'SAVE_DESIGN', payload: designData });
    dispatch({ type: 'ADD_TO_HISTORY', payload: { action: 'save', designId: designData.id, timestamp: new Date().toISOString() } });
  };

  const updateDesign = (designData) => {
    dispatch({ type: 'UPDATE_DESIGN', payload: designData });
    dispatch({ type: 'ADD_TO_HISTORY', payload: { action: 'update', designId: designData.id, timestamp: new Date().toISOString() } });
  };

  const deleteDesign = (designId) => {
    dispatch({ type: 'DELETE_DESIGN', payload: designId });
    dispatch({ type: 'ADD_TO_HISTORY', payload: { action: 'delete', designId, timestamp: new Date().toISOString() } });
  };

  const setCurrentDesign = (design) => {
    dispatch({ type: 'SET_CURRENT_DESIGN', payload: design });
    if (design?.id) {
      dispatch({ type: 'ADD_TO_RECENTLY_VIEWED', payload: design.id });
    }
  };

  const toggleFavorite = (designId) => {
    if (state.favorites.includes(designId)) {
      dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: designId });
    } else {
      dispatch({ type: 'ADD_TO_FAVORITES', payload: designId });
    }
  };

  const updateUserPreferences = (preferences) => {
    dispatch({ type: 'UPDATE_USER_PREFERENCES', payload: preferences });
  };

  const getDesignById = (id) => {
    return state.savedDesigns.find(design => design.id === id);
  };

  const getDesignsByCategory = (category) => {
    return state.savedDesigns.filter(design => design.category === category);
  };

  const getDesignsByStyle = (style) => {
    return state.savedDesigns.filter(design => design.style === style);
  };

  const getFavoriteDesigns = () => {
    return state.savedDesigns.filter(design => state.favorites.includes(design.id));
  };

  const getRecentlyViewedDesigns = () => {
    return state.recentlyViewed
      .map(id => state.savedDesigns.find(design => design.id === id))
      .filter(Boolean);
  };

  const searchDesigns = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return state.savedDesigns.filter(design =>
      design.title?.toLowerCase().includes(lowercaseQuery) ||
      design.description?.toLowerCase().includes(lowercaseQuery) ||
      design.style?.toLowerCase().includes(lowercaseQuery) ||
      design.category?.toLowerCase().includes(lowercaseQuery) ||
      design.features?.some(feature => feature.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getDesignStats = () => {
    return {
      totalDesigns: state.savedDesigns.length,
      favoriteCount: state.favorites.length,
      categoryCounts: state.savedDesigns.reduce((acc, design) => {
        acc[design.category] = (acc[design.category] || 0) + 1;
        return acc;
      }, {}),
      styleCounts: state.savedDesigns.reduce((acc, design) => {
        acc[design.style] = (acc[design.style] || 0) + 1;
        return acc;
      }, {}),
      totalValue: state.savedDesigns.reduce((total, design) => total + (design.totalPrice || 0), 0)
    };
  };

  const exportDesigns = () => {
    const exportData = {
      designs: state.savedDesigns,
      favorites: state.favorites,
      preferences: state.userPreferences,
      exportDate: new Date().toISOString()
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importDesigns = (importData) => {
    try {
      const parsedData = typeof importData === 'string' ? JSON.parse(importData) : importData;
      dispatch({ type: 'LOAD_SAVED_DATA', payload: parsedData });
      return true;
    } catch (error) {
      console.error('Error importing design data:', error);
      return false;
    }
  };

  const value = {
    // State
    ...state,
    
    // Actions
    saveDesign,
    updateDesign,
    deleteDesign,
    setCurrentDesign,
    toggleFavorite,
    updateUserPreferences,
    
    // Getters
    getDesignById,
    getDesignsByCategory,
    getDesignsByStyle,
    getFavoriteDesigns,
    getRecentlyViewedDesigns,
    searchDesigns,
    getDesignStats,
    
    // Utils
    exportDesigns,
    importDesigns
  };

  return (
    <DesignContext.Provider value={value}>
      {children}
    </DesignContext.Provider>
  );
};

export const useDesign = () => {
  const context = useContext(DesignContext);
  if (!context) {
    throw new Error('useDesign must be used within a DesignProvider');
  }
  return context;
};

export default DesignContext;