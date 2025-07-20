import { useEffect } from 'react';
import { getCabins } from '../services/apiCabins';

export default function Cabins() {
  useEffect(function () {
    getCabins()
      .then((data) => {
        console.log('Cabins data:', data);
      })
      .catch((error) => {
        console.error('Error fetching cabins:', error);
      });
  }, []);
  return <div>Cabins</div>;
}
