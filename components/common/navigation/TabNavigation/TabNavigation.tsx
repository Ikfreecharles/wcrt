import { Box, Card, makeStyles, Tab, Tabs } from '@material-ui/core';

import { PageLayout } from 'types';
import { IconBadge, ConditionalWrapper } from 'components/common/misc';

type Props = PageLayout['tabNavigation'] & {
  /** Use an elevated card as container */
  elevated?: boolean;
};

const useStyles = makeStyles(({ spacing, palette, breakpoints }) => ({
  root: {
    position: 'relative',
    margin: spacing(-2, -2, 0),
    [breakpoints.up('sm')]: {
      margin: spacing(-2, -3, 0),
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      display: 'block',
      width: '100%',
      height: 1,
      backgroundColor: palette.divider,
    },
  },
}));

/** Renders a tab navigation bar top be used as secondary page navigation. */
export const TabNavigation: React.FC<Props> = ({
  value,
  setValue,
  tabs,
  elevated,
}) => {
  const classes = useStyles();

  const handleTabChange = (_event: React.ChangeEvent<unknown>, value: number) =>
    setValue(value);

  return (
    <ConditionalWrapper
      condition={elevated}
      wrap={(children) => <Card elevation={4}>{children}</Card>}
      alternative={(children) => <Box className={classes.root}>{children}</Box>}
    >
      <Tabs
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleTabChange}
      >
        {tabs.map(({ label, icon, hasActivity }, index) => (
          <Tab
            icon={
              icon ? (
                <IconBadge icon={icon} hasActivity={hasActivity} />
              ) : undefined
            }
            label={label}
            key={index}
          />
        ))}
      </Tabs>
    </ConditionalWrapper>
  );
};
