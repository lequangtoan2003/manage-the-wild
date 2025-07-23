import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');
  if (error) {
    console.error('Error fetching cabins:', error);
    throw new Error('Cabins could not be fetched');
  }
  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  //https://lecnynvyzqecwagnlftj.supabase.co/storage/v1/object/public/cabin-images//bg.jpg
  //create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error('Error creating cabin:', error);
    throw new Error('Cabin could not be created');
  }

  //upload image
  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  //uploading error
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error('Error uploading cabin image:', storageError);
    throw new Error('Cabin image could not be uploaded');
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);
  if (error) {
    console.error('Error fetching cabins:', error);
    throw new Error('Cabins could not be deleted');
  }
  return data;
}
