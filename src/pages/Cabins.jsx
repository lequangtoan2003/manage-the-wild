// features/cabins/Cabins.jsx
import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import Modal from '../ui/Model'; // Import Modal component

export default function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>Cabin</div>
        <div>Filter/sort</div>
      </div>
      <div className="">
        <CabinTable />
        <Button onClick={() => setShowForm(true)}>Add new cabin</Button>
        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <CreateCabinForm
            onSuccess={() => setShowForm(false)} // Đóng modal sau khi submit thành công
          />
        </Modal>
      </div>
    </div>
  );
}
