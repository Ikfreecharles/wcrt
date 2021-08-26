import { Dispatch, SetStateAction } from 'react';
import { IconType } from 'react-icons';

/** Shared settings between the local state and cookies. Used for interface preferences. */
export type Settings = {
  /** The UI language */
  language: string;
  /** The palette type of the UI */
  paletteType: 'light' | 'dark';
  /** The state of the mobile header */
  headerState: 'expanded' | 'collapsed';
};

/** Layout elements depending on pages, but placed outside the content column. */
export type PageLayout = {
  /** Sidebar content and mobile placement */
  sidebar?: {
    content: React.ReactNode;
    displayOnSmallScreens: 'pageStart' | 'pageEnd' | null;
  };
  /** Options to use a tab navigation as sub-page navigation */
  tabNavigation?: {
    value: number;
    setValue: Dispatch<SetStateAction<number>>;
    tabs: {
      label: string;
      icon?: IconType;
      hasActivity?: boolean;
    }[];
  };
};

/** The custom form state options. */
export type FormStatus =
  | 'invalid'
  | 'valid'
  | 'submitting'
  | 'completed'
  | undefined;

/** The custom form result options. */
export type FormResult =
  | {
      /** An server-side validation message */
      error?: string;
      /** Resulting data (e.g. the ID of a created entity) */
      data?: Record<string, string | undefined>;
    }
  | undefined;

/** Filter settings for feed components. */
export type FeedFilters = Record<
  'type' | 'category' | 'location',
  string[] | undefined
>;

/** Information to supply about an video meeting. */
export type VideoMeeting = {
  /** The human-readable title of an video meeting */
  title: string;
  /** The room name used as unique identification */
  room: string;
};
