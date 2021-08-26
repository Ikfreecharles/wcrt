import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { OptionList } from './OptionList';

const setActiveOptions = jest.fn();

const options = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
const activeNames = ['a', 'b'];

const valueOptions = [
  { name: 'a', value: '1' },
  { name: 'b', value: '2' },
  { name: 'c', value: '3' },
];
const activeValues = ['1', '2'];

describe('<OptionList />', () => {
  describe('static', () => {
    renderBeforeEach(<OptionList options={options} />);

    it('should render the name of each option', () => {
      options.forEach((option) => {
        expect(screen.getByText(option.name)).toBeInTheDocument();
      });
    });
  });

  describe('static with translation', () => {
    renderBeforeEach(
      <OptionList options={options} translationNamespace="sample.namespace" />
    );

    it('should render the translated name of each option', () => {
      options.forEach((option) => {
        expect(
          screen.getByText(`sample.namespace.${option.name}`)
        ).toBeInTheDocument();
      });
    });
  });

  describe('interactive', () => {
    renderBeforeEach(
      <OptionList
        options={options}
        activeOptions={activeNames}
        setActiveOptions={setActiveOptions}
      />
    );

    it('should render a button for each option', () => {
      options.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toBeInTheDocument();
      });
    });

    it('should highlight its active options', () => {
      activeNames.forEach((name) => {
        expect(screen.getByRole('checkbox', { name })).toHaveAttribute(
          'aria-checked',
          'true'
        );
      });
    });

    it('should activate its options on click', () => {
      userEvent.click(screen.getByRole('checkbox', { name: 'c' }));
      expect(setActiveOptions).toHaveBeenCalledTimes(1);
      expect(setActiveOptions).toHaveBeenCalledWith(['a', 'b', 'c']);
    });

    it('should deactivate its options on click', () => {
      userEvent.click(screen.getByRole('checkbox', { name: 'b' }));
      expect(setActiveOptions).toHaveBeenCalledTimes(1);
      expect(setActiveOptions).toHaveBeenCalledWith(['a']);
    });
  });

  describe('interactive with custom values', () => {
    renderBeforeEach(
      <OptionList
        options={valueOptions}
        activeOptions={activeValues}
        setActiveOptions={setActiveOptions}
      />
    );

    it('should render a button for each option', () => {
      valueOptions.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toBeInTheDocument();
      });
    });

    it('should highlight its active options', () => {
      activeValues.forEach((value) => {
        expect(
          screen.getByRole('checkbox', {
            name: valueOptions.filter((option) => option.value === value)[0]
              .name,
          })
        ).toHaveAttribute('aria-checked', 'true');
      });
    });

    it('should activate its options on click', () => {
      userEvent.click(screen.getByRole('checkbox', { name: 'c' }));
      expect(setActiveOptions).toHaveBeenCalledTimes(1);
      expect(setActiveOptions).toHaveBeenCalledWith(['1', '2', '3']);
    });

    it('should deactivate its options on click', () => {
      userEvent.click(screen.getByRole('checkbox', { name: 'b' }));
      expect(setActiveOptions).toHaveBeenCalledTimes(1);
      expect(setActiveOptions).toHaveBeenCalledWith(['1']);
    });
  });

  describe('interactive with restricted length', () => {
    renderBeforeEach(
      <OptionList
        options={options}
        activeOptions={activeNames}
        setActiveOptions={setActiveOptions}
        maxLength={2}
      />
    );

    it('should update its activated options on click', () => {
      userEvent.click(screen.getByRole('checkbox', { name: 'c' }));
      expect(setActiveOptions).toHaveBeenCalledTimes(1);
      expect(setActiveOptions).toHaveBeenCalledWith(['b', 'c']);
    });
  });

  describe('interactive with error', () => {
    renderBeforeEach(
      <OptionList
        options={options}
        activeOptions={activeNames}
        setActiveOptions={setActiveOptions}
        error
      />
    );

    it('should render its options as invalid', () => {
      options.forEach((option) => {
        expect(
          screen.getByRole('checkbox', { name: option.name })
        ).toHaveAttribute('aria-invalid', 'true');
      });
    });
  });
});
