import { useCategoriesQuery } from 'lib/graphql';
import { InlineProgress } from 'components/common/misc';
import { OptionInput } from 'components/common/input';

type Props = Omit<React.ComponentProps<typeof OptionInput>, 'listProps'>;

/** Renders an `OptionInput` prepopulated with the available categories. */
export const CategoryInput: React.FC<Props> = (props) => {
  const { data, loading } = useCategoriesQuery({ fetchPolicy: 'cache-first' });

  const categories =
    data?.categories.edges
      .map((edge) => edge.node)
      .map(({ id, name }) => ({ name, value: id })) || [];

  return loading ? (
    <InlineProgress />
  ) : (
    <OptionInput
      {...props}
      listProps={{
        options: categories,
        translationNamespace: 'content.category',
      }}
    />
  );
};
