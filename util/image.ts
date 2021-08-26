/** Our image sizes (the less we use the better we can cache). */
export const imageSizes = {
  avatarSmall: [48, 48],
  avatarMedium: [80, 80],
  avatarLarge: [208, 208],
  avatarExtra: [320, 320],
  content: [1200, 675],
  contentPreview: [512, 288],
};

/** Adds the CDN host name in case of relative image URLs. */
export const getFullImageUrl = (imageUrl: string | undefined) => {
  if (typeof imageUrl !== 'string' || imageUrl.substr(0, 4) === 'http')
    return imageUrl;

  if (imageUrl.substr(0, 1) === '/')
    return process.env.NEXT_PUBLIC_CDN_URL + imageUrl;

  return `${process.env.NEXT_PUBLIC_CDN_URL}/${imageUrl}`;
};

/** Adds Thumbor arguments for resizing and optimizing images. */
export const getResizedImageUrl = (
  imageUrl: string | undefined,
  size: keyof typeof imageSizes
) => {
  const filters: Record<string, unknown> = {
    format: 'jpeg',
    max_bytes: 100000,
    background_color: 'white',
  };

  const sizeArgument = imageSizes[size].join('x');
  const filterArgument = Object.keys(filters)
    .map((key) => `${key}(${filters[key]})`)
    .join(':');

  return getFullImageUrl(imageUrl)?.replace(
    '/images/',
    `/images/${sizeArgument}/smart/filters:${filterArgument}/`
  );
};
