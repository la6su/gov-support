import { observer } from 'mobx-react-lite';
import { useStores } from '@app/providers';
import { useEffect } from 'react';

export const HomePage = observer(() => {
  const { benefitStore } = useStores();

  useEffect(() => {
    benefitStore.loadBenefits();
  }, [benefitStore]);

  if (benefitStore.loading) return <div>Loading...</div>;
  if (benefitStore.error) return <div>Error: {benefitStore.error}</div>;

  return (
    <div>
      {benefitStore.allBenefits.map((b) => (
        <div key={b.id}>{b.title}</div>
      ))}
    </div>
  );
});
