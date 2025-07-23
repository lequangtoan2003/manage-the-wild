import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

export default function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>Cabin</div>
        <div>Filter/sort</div>
      </div>
      <div className="space-y-4">
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </div>
    </div>
  );
}
