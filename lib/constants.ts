/**
 * The height of the mobile navigation must be constant so that other components
 * can adjust their positions.
 */
export const MOBILE_NAV_HEIGHT = 56;

/** We always want to add those properties to external links for security and SEO reasons. */
export const EXTERNAL_LINK_PROPS = {
  target: '_blank',
  rel: 'noopener nofollow',
} as const;

/** The email address we use for support buttons. */
export const SUPPORT_EMAIL = 'support@wecreate.world';

/** The URL to the knowledge base of our helpdesk. */
export const SUPPORT_URL = `${process.env.NEXT_PUBLIC_HELPDESK_URL}/help`;

/** A specific link to a general intro article. */
export const LEARN_MORE_URL = `${SUPPORT_URL}/de-de/1-uber-wecreate`;

/** The URL of our company website. */
export const WEBSITE_URL = 'https://about.wecreate.world';

/** A map to link common group roles to specific `Role` entities. */
export const GROUP_ROLE_NAMES = {
  admin: 'groupAdmin',
  member: 'groupMember',
} as const;
