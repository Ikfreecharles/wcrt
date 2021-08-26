import { renderBeforeEach, screen } from 'testing/util';

import { ConditionalWrapper } from './ConditionalWrapper';

const primaryWrapperElement = (children: React.ReactNode) => (
  <div data-testid="primary-wrapper">{children}</div>
);

const secondaryWrapperElement = (children: React.ReactNode) => (
  <div data-testid="secondary-wrapper">{children}</div>
);

describe('<ConditionalWrapper />', () => {
  describe('without alternative', () => {
    describe('true condition', () => {
      renderBeforeEach(
        <ConditionalWrapper condition={true} wrap={primaryWrapperElement}>
          Sample content
        </ConditionalWrapper>
      );

      it('should render its content', () => {
        expect(screen.getByText('Sample content')).toBeInTheDocument();
      });

      it('should render the wrapper', () => {
        expect(screen.getByTestId('primary-wrapper')).toBeInTheDocument();
      });
    });

    describe('false condition', () => {
      renderBeforeEach(
        <ConditionalWrapper condition={false} wrap={primaryWrapperElement}>
          Sample content
        </ConditionalWrapper>
      );

      it('should render its content', () => {
        expect(screen.getByText('Sample content')).toBeInTheDocument();
      });

      it('should not render the wrapper', () => {
        expect(screen.queryByTestId('primary-wrapper')).not.toBeInTheDocument();
      });
    });
  });

  describe('with alternative', () => {
    describe('true condition', () => {
      renderBeforeEach(
        <ConditionalWrapper
          condition={true}
          wrap={primaryWrapperElement}
          alternative={secondaryWrapperElement}
        >
          Sample content
        </ConditionalWrapper>
      );

      it('should render its content', () => {
        expect(screen.getByText('Sample content')).toBeInTheDocument();
      });

      it('should render the primary wrapper', () => {
        expect(screen.getByTestId('primary-wrapper')).toBeInTheDocument();
      });

      it('should not render the secondary wrapper', () => {
        expect(
          screen.queryByTestId('secondary-wrapper')
        ).not.toBeInTheDocument();
      });
    });

    describe('false condition', () => {
      renderBeforeEach(
        <ConditionalWrapper
          condition={false}
          wrap={primaryWrapperElement}
          alternative={secondaryWrapperElement}
        >
          Sample content
        </ConditionalWrapper>
      );

      it('should render its content', () => {
        expect(screen.getByText('Sample content')).toBeInTheDocument();
      });

      it('should not render the wrapper', () => {
        expect(screen.queryByTestId('primary-wrapper')).not.toBeInTheDocument();
      });

      it('should render the secondary wrapper', () => {
        expect(screen.getByTestId('secondary-wrapper')).toBeInTheDocument();
      });
    });
  });
});
