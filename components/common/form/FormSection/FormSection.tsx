type Props = {
  /** The page number of the section */
  page?: number;
  /** The active page of the form */
  current?: number;
  /** The name of a boolean field to use as a condition (evaluated by `FormWrapper`) */
  when?: string;
};

/**
 * Shows or hides a section of a form depending on the current page number or a
 * boolean field value. Required for a multi-page form. Meant to be used within
 * a `FormWrapper` component.
 */
export const FormSection: React.FC<Props> = ({ page, current, children }) => {
  const hasMultiplePages = typeof current === 'number';
  const pageIsVisible = page === current;

  return !hasMultiplePages || pageIsVisible ? <>{children}</> : null;
};
