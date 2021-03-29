import React, { createContext, useContext } from 'react';

// export const GeneralContext = createContext();
// export const HomePageContext = createContext();
export const VisualizerContext = createContext();
export const CodeContext = createContext();

// export const useGeneralContext = () => useContext(GeneralContext);
// export const useHomePageContext = () => useContext(HomePageContext);
export const useVisualizerContext = () => useContext(VisualizerContext);
export const useCodeContext = () => useContext(CodeContext);