import { createContext } from 'react';
import { GridSize } from '@material-ui/core';

/** Shares the current column size between the grid item and the child components. */
export const ColumnContext = createContext<Exclude<GridSize, 'auto'>>(12);

export const ColumnProvider = ColumnContext.Provider;
