import { Dispatch, SetStateAction } from 'react';
import { NormalizedCacheObject } from '@apollo/client';
import {
  Mode,
  RegisterOptions,
  UseFormReturn,
  Validate,
} from 'react-hook-form';

import { PageLayout, FormResult, FormStatus } from 'types/misc';

/** Shared properties for page components. */
export type CommonPageProps = {
  /** The i18n namespaces to load on the page */
  namespacesRequired?: string[];
  /** The prepared cache state from SSR */
  initialApolloState?: NormalizedCacheObject;
  /** A function to populate layout elements outside of the page */
  setPageLayout?: Dispatch<SetStateAction<PageLayout | null>>;
};

/** Shared properties for pagination support. */
export type CommonPaginationProps = {
  /** Indicate further pagination possibilities */
  hasMore?: boolean;
  /** A function to request the next page */
  fetchMore: () => void;
  /** Communicate the loading state */
  loading?: boolean;
};

/** Shared properties for feed components. */
export type CommonFeedProps = {
  /** The feed pagination */
  pagination?: CommonPaginationProps;
  /** An element to show as a custom empty state */
  emptyState?: JSX.Element;
  /** A function to reset feed filters */
  reset?: () => void;
};

/** Shared properties for dialog components. */
export type CommonDialogProps = {
  /** Communicate the visibility status */
  open: boolean;
  /** A function to open or close the dialog */
  setOpen: (value: boolean) => void;
  /** A callback to run after the dialog was closed */
  onExited?: () => void;
};

/** Shared properties for form components. */
export type CommonFormProps = {
  /** The validation mode of `react-hook-form` */
  mode: Mode;
  /** A function to communicate the form status to the outside */
  setStatus: Dispatch<SetStateAction<FormStatus>>;
  /** A function to communicate the form result to the outside */
  setResult?: Dispatch<SetStateAction<FormResult>>;
  /** The element ID of the form (used for submitting from the outside) */
  id: string;
};

/** Shared properties for input components. */
export type CommonInputProps = {
  name: string;
  rules?: Pick<RegisterOptions, 'required' | 'pattern'> & {
    minLength?: number;
    maxLength?: number;
    validate?: Validate<unknown>;
    matchField?: string;
  };
  label?: string;
  helperText?: string;
  disabled?: boolean;
  disableSpacing?: boolean;
  use?: UseFormReturn<any>;
};

/** Shared properties for accordion components. */
export type CommonAccordionProps = {
  /** The title of the accordion preview */
  title: string;
  /** An additional information used as preview */
  preview: React.ReactNode;
  /** The visibility status */
  expanded: boolean;
  /** A function to toggle the accordion visibility */
  toggle: () => void;
  /** Deactivate interactivity */
  disabled?: boolean;
};
