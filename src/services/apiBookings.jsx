import supabase from './supabase';

export async function getBookings({ filter, sortBy }) {
  let query = supabase
    .from('bookings')
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)'
    );
  //filter
  if (filter) query = query.eq(filter.field, filter.value);
  //sort
  if (sortBy)
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === 'asc',
    });
  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }
  return data;
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be loaded');
  }
  return data;
}
