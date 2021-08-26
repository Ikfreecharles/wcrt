import { Chip, Grid, SvgIcon, makeStyles, fade } from '@material-ui/core';
import { BiCheck } from 'react-icons/bi';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';

type Option = {
  name: string;
  value?: string;
};

type Props = {
  /** A list of labels (if present, a value will be preferred as key in interactive mode) */
  options: Option[];
  /** A list of active option keys (required for interactive mode) */
  activeOptions?: string[];
  /** A function to populate the current state (required for interactive mode) */
  setActiveOptions?: (options: string[]) => void;
  /** Use the option names as translation keys instead of label strings */
  translationNamespace?: string;
  /** Deactivate previous options when exceeding this limit (interactive mode only) */
  maxLength?: number;
  /** Disable interactivity while still showing the active options */
  disabled?: boolean;
  /** Mark the whole list as invalid */
  error?: boolean;
};

type StyleProps = Pick<Props, 'error'>;

const useStyles = makeStyles(({ palette }) => ({
  option: ({ error }: StyleProps) => ({
    color: error ? palette.error.main : undefined,
    borderColor: error ? palette.error.light : undefined,
  }),
  activeOption: ({ error }: StyleProps) => ({
    backgroundColor: fade(
      palette[error ? 'error' : 'primary'].main,
      palette.action.selectedOpacity
    ),
    color: palette[error ? 'error' : 'primary'].main,
  }),
}));

/**
 * Renders multiple text labels side-by-side. Can be used in an interactive mode
 * to allow selecting and deselecting the displayed options.
 */
export const OptionList: React.FC<Props> = ({
  options,
  activeOptions,
  setActiveOptions,
  translationNamespace,
  maxLength,
  disabled,
  error,
}) => {
  const { t } = useTranslation();
  const classes = useStyles({ error });

  const getPrimaryKey = (option: Option) => option.value ?? option.name;

  const isActive = (option: Option) =>
    !!activeOptions?.filter((item) => item === getPrimaryKey(option)).length;

  const getActivationHandler = (option: Option) =>
    activeOptions && setActiveOptions
      ? () => {
          if (isActive(option)) {
            setActiveOptions(
              [...activeOptions].filter(
                (item) => item !== getPrimaryKey(option)
              )
            );
          } else {
            setActiveOptions(
              [...activeOptions, getPrimaryKey(option)].slice(
                maxLength ? -maxLength : undefined
              )
            );
          }
        }
      : undefined;

  return (
    <Grid container spacing={1}>
      {options.map((option) => (
        <Grid item key={option.name}>
          <Chip
            variant="outlined"
            icon={
              isActive(option) ? <SvgIcon component={BiCheck} /> : undefined
            }
            color={isActive(option) ? 'primary' : undefined}
            label={
              translationNamespace
                ? t(`${translationNamespace}.${option.name}`)
                : option.name
            }
            onClick={getActivationHandler(option)}
            className={clsx(
              classes.option,
              isActive(option) && classes.activeOption
            )}
            disabled={disabled}
            role={setActiveOptions ? 'checkbox' : undefined}
            aria-checked={setActiveOptions ? isActive(option) : undefined}
            aria-invalid={
              setActiveOptions ? (error ? 'true' : 'false') : undefined
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};
