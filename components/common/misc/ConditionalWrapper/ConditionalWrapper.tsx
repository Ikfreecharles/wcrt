type Props = {
  /** Use the wrapper if `true` */
  condition: boolean | undefined;
  /** The wrapping element structure */
  wrap: (children: React.ReactNode) => JSX.Element;
  /** An alternative wrapping if the condition is `false` */
  alternative?: (children: React.ReactNode) => JSX.Element;
};

/** Renders wrapping elements based on a certain condition. */
export const ConditionalWrapper: React.FC<Props> = ({
  condition,
  wrap,
  alternative,
  children,
}) => {
  if (condition) return wrap(children);
  if (alternative) return alternative(children);
  return <>{children}</>;
};
