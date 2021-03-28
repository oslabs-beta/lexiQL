import React, { createContext, useContext } from 'react';

export const GeneralContext = createContext();
export const HomePageContext = createContext();
export const DataPageContext = createContext();

export const useGeneralContext = () => useContext(GeneralContext);
export const useHomePageContext = () => useContext(HomePageContext);
export const useDataPageContext = () => useContext(DataPageContext);
