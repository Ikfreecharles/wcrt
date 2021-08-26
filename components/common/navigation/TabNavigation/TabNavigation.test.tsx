import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { TabNavigation } from './TabNavigation';

describe('<TabNavigation />', () => {
  const setValue = jest.fn();

  renderBeforeEach(
    <TabNavigation
      value={0}
      setValue={setValue}
      tabs={[{ label: 'Tab one' }, { label: 'Tab two' }]}
    />
  );

  it('should render the tabs', () => {
    expect(screen.getByRole('tab', { name: 'Tab one' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab two' })).toBeInTheDocument();
  });

  it('should highlight the active tab', () => {
    expect(screen.getByRole('tab', { name: 'Tab one' })).toHaveAttribute(
      'aria-selected',
      'true'
    );
  });

  it('should update the active tab on click', () => {
    userEvent.click(screen.getByRole('tab', { name: 'Tab two' }));
    expect(setValue).toHaveBeenCalledTimes(1);
    expect(setValue).toHaveBeenCalledWith(1);
  });
});
