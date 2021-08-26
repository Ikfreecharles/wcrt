import { useRouter } from 'next/router';
import { IconType } from 'react-icons';
import {
  BiNetworkChart,
  BiVideo,
  BiGroup,
  BiHeart,
  BiSearch,
  BiChat,
  BiCalendar,
  BiTask,
  BiFile,
  BiPaperclip,
  BiPoll,
  BiArch,
} from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useSession } from 'lib/auth';
import { useMessagingCount } from 'hooks/messaging';
import {
  comparePaths,
  createAbsoluteUrl,
  getInternalPath,
  raisePathLevel,
} from 'util/url';
import { evalFeatureFlag } from 'util/feature';

type NavigationItem = {
  icon: IconType;
  label: string;
  path: string;
  isActive?: boolean;
  hasMessages?: boolean;
};

/** Returns a list of the main navigation items. */
export const useMainNavigation = (includeSearch = false) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();
  const [session] = useSession();
  const unreadMessages = useMessagingCount();

  const items: NavigationItem[] = [];

  items.push({
    icon: BiNetworkChart,
    label: t('page.index.title'),
    path: '/',
    isActive: comparePaths(asPath, [
      '/',
      '/article/*',
      '/impulse/*',
      '/topic/*',
      '/profile/*',
      '/group/*',
    ]),
  });

  items.push({
    icon: BiGroup,
    label: t('page.groups.title'),
    path: '/groups',
    isActive: comparePaths(asPath, ['/groups', '/groups/*']),
    hasMessages: !!unreadMessages,
  });

  items.push({
    icon: BiHeart,
    label: t('page.personal.title'),
    path: session ? '/personal/data' : '/personal',
    isActive: comparePaths(asPath, ['/personal', '/personal/*']),
  });

  if (includeSearch && evalFeatureFlag('showGlobalSearchPage'))
    items.push({
      icon: BiSearch,
      label: t('page.search.title'),
      path: '/search',
      isActive: comparePaths(asPath, ['/search']),
    });

  return items;
};

/** Returns a list of the internal group navigation items. */
export const useGroupNavigation = (id: string) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  const basePath = getInternalPath(id);

  const items: (NavigationItem & { disabled?: boolean })[] = [];

  items.push({
    icon: BiChat,
    label: t('group:tool.chat.title'),
    path: basePath,
    isActive: comparePaths(asPath, [basePath]),
  });

  items.push({
    icon: BiVideo,
    label: t('group:tool.meetings.title'),
    path: `${basePath}/meetings`,
    isActive: comparePaths(asPath, [
      `${basePath}/meetings`,
      `${basePath}/meetings/*`,
    ]),
  });

  items.push({
    icon: BiGroup,
    label: t('group:tool.members.title'),
    path: `${basePath}/members`,
    isActive: comparePaths(asPath, [
      `${basePath}/members`,
      `${basePath}/members/*`,
    ]),
  });

  items.push({
    icon: BiNetworkChart,
    label: t('group:tool.contents.title'),
    path: `${basePath}/contents`,
    isActive: comparePaths(asPath, [
      `${basePath}/contents`,
      `${basePath}/contents/*`,
    ]),
  });

  items.push({
    icon: BiTask,
    label: t('group:tool.tasks.title'),
    path: `${basePath}/tasks`,
    isActive: comparePaths(asPath, [
      `${basePath}/tasks`,
      `${basePath}/tasks/*`,
    ]),
  });

  items.push({
    icon: BiCalendar,
    label: t('group:tool.calendar.title'),
    path: `${basePath}/calendar`,
    isActive: comparePaths(asPath, [`${basePath}/calendar`]),
    disabled: true,
  });

  items.push({
    icon: BiFile,
    label: t('group:tool.documents.title'),
    path: `${basePath}/documents`,
    isActive: comparePaths(asPath, [`${basePath}/documents`]),
    disabled: true,
  });

  items.push({
    icon: BiPaperclip,
    label: t('group:tool.files.title'),
    path: `${basePath}/files`,
    isActive: comparePaths(asPath, [`${basePath}/files`]),
    disabled: true,
  });

  items.push({
    icon: BiPoll,
    label: t('group:tool.polls.title'),
    path: `${basePath}/polls`,
    isActive: comparePaths(asPath, [`${basePath}/polls`]),
    disabled: true,
  });

  items.push({
    icon: BiArch,
    label: t('group:tool.applications.title'),
    path: `${basePath}/applications`,
    isActive: comparePaths(asPath, [`${basePath}/applications`]),
    disabled: true,
  });

  return items;
};

/** Returns a function to navigate back and a variable to determine the nesting level. */
export const useRelativeNavigation = (basePath = '/') => {
  const { asPath, push, back } = useRouter();

  const parentPath = raisePathLevel(asPath);
  const isDeeplyNested = ![asPath, parentPath].includes(basePath);

  const navigateBack = () => {
    if (isDeeplyNested) {
      back();
    } else {
      push(parentPath);
    }
  };

  return {
    isDeeplyNested,
    navigateBack,
  };
};

/** Returns a function to create an absolute URL for the current path. */
export const useCanonicalUrl = () => {
  const { asPath, defaultLocale } = useRouter();

  return (pageLocale?: string) => {
    const path = asPath !== '/' ? asPath : '';
    const localizedPath =
      pageLocale && pageLocale !== defaultLocale
        ? `/${pageLocale}${path}`
        : path;

    return createAbsoluteUrl(localizedPath, true).toString();
  };
};

/** Returns a function to create sharing URLs for several social media platforms. */
export const useSharingUrl = () => {
  const url = useCanonicalUrl()();

  const serviceUrls = {
    Facebook: 'https://www.facebook.com/sharer.php?display=page&u=',
    Twitter: 'https://twitter.com/intent/tweet?url=',
    LinkedIn: 'https://www.linkedin.com/sharing/share-offsite/?url=',
  };

  return (service?: keyof typeof serviceUrls) =>
    service ? serviceUrls[service] + encodeURIComponent(url) : url;
};
