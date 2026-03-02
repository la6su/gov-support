import { observer } from 'mobx-react-lite';
import { useLoadBenefits } from '@features/load-benefits/model/use-load-benefits';
import { useStores } from '@app/providers';
import { CreateBenefitForm } from '@features/create-benefit';

export const BenefitsPage = observer(() => {
  const { loading, error } = useLoadBenefits();
  const { benefitStore } = useStores();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Benefits</h1>
      <CreateBenefitForm />

      <ul>
        {benefitStore.allBenefits.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  );
});
