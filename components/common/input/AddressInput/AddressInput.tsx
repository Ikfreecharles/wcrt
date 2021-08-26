import { useAddressesQuery } from 'lib/graphql';
import { InlineProgress } from 'components/common/misc';
import { OptionInput } from 'components/common/input';

type Props = Omit<React.ComponentProps<typeof OptionInput>, 'listProps'>;

/** Renders an `OptionInput` prepopulated with the available addresses. */
export const AddressInput: React.FC<Props> = (props) => {
  const { data, loading } = useAddressesQuery({ fetchPolicy: 'cache-first' });

  const addresses =
    data?.addresses.edges
      .map((edge) => edge.node)
      .map(({ id, addressLocality }) => ({
        name: addressLocality,
        value: id,
      })) || [];

  return loading ? (
    <InlineProgress />
  ) : (
    <OptionInput
      {...props}
      listProps={{
        options: addresses,
      }}
    />
  );
};
