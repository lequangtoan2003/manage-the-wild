import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { updateCurrrentUser } from '../../services/apiAuth';

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrrentUser,
    onSuccess: () => {
      toast.success('User account updated successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Error creating cabin');
    },
  });
  return { updateUser, isUpdating };
}
