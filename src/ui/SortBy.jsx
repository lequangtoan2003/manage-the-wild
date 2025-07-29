import { useSearchParams } from 'react-router-dom';
import Select from './Select';

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sort-by') || '';

  function handleChange(e) {
    const value = e.target.value;
    searchParams.set('sort-by', value);
    if (searchParams.get('page')) searchParams.set('page', 1);
    setSearchParams(searchParams);
  }
  return <Select options={options} value={sortBy} onChange={handleChange} />;
}
