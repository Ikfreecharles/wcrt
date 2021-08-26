import NextImage from 'next/dist/client/image';

const Image = ({
  src,
  alt,
  onLoad,
  onError,
}: Parameters<typeof NextImage>[0]) => (
  <img src={src.toString()} alt={alt} onLoad={onLoad} onError={onError} />
);

export default Image;
