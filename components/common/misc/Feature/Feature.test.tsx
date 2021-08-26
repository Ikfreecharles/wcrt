import { render, screen } from 'testing/util';
import { FeatureProvider } from 'context/feature';

import { Feature } from './Feature';

const FeatureContext: React.FC = ({ children }) => (
  <FeatureProvider
    value={{
      // @ts-ignore
      activeFeature: true,
      disabledFeature: false,
    }}
  >
    {children}
  </FeatureProvider>
);

describe('<Feature />', () => {
  describe('single flag', () => {
    it('should not render content when undefined', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature">Sample content</Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should render content when active', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature">Sample content</Feature>
        </FeatureContext>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });

    it('should not render content when disabled', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="disabledFeature">Sample content</Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });
  });

  describe('two flags combined (logical and)', () => {
    it('should not render content when undefined and undefined', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature" and="undefinedFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should not render content when undefined and active', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature" and="activeFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should not render content when undefined and disabled', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature" and="disabledFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should not render content when active and undefined', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature" and="undefinedFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should render content when active and active', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature" and="activeFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });

    it('should not render content when active and disabled', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature" and="disabledFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });
  });

  describe('two flags combined (logical or)', () => {
    it('should not render content when undefined or undefined', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature" or="undefinedFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should render content when undefined or active', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature" or="activeFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });

    it('should not render content when undefined or disabled', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="undefinedFeature" or="disabledFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });

    it('should render content when active or undefined', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature" or="undefinedFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });

    it('should render content when active or active', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature" or="activeFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });

    it('should render content when active or disabled', () => {
      render(
        <FeatureContext>
          {/* @ts-ignore */}
          <Feature flag="activeFeature" or="disabledFeature">
            Sample content
          </Feature>
        </FeatureContext>
      );
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });
});
