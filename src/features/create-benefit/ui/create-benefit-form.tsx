import { useState } from 'react';
import { useCreateBenefit } from '../model/use-create-benefit';

export const CreateBenefitForm = () => {
  const { createBenefit, loading, error } = useCreateBenefit();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createBenefit({
      title,
      description,
      category,
      isActive: true,
    });

    setTitle('');
    setDescription('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Benefit</h2>

      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};
