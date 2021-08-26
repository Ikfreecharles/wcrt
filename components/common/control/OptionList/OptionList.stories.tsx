import { useState } from 'react';
import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { OptionList } from './OptionList';

export default {
  title: 'Secondary/OptionList',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => (
  <OptionList
    options={[
      { name: 'culture' },
      { name: 'administration' },
      { name: 'environment' },
    ]}
    translationNamespace="content.category"
  />
);

export const Interactive = () => {
  const [filters, setFilters] = useState([] as string[]);

  return (
    <OptionList
      options={[
        { name: 'culture' },
        { name: 'administration' },
        { name: 'environment' },
      ]}
      activeOptions={filters}
      setActiveOptions={(options) => setFilters(options)}
      translationNamespace="content.category"
    />
  );
};
