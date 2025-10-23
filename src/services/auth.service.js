import bcrypt from 'bcryptjs';

export const hashPasswordBcrypt = async password => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (err) {
    throw err;
  }
};

export const comparePasswordBcrypt = async (password, hash) =>{
    try{
        return await bcrypt.compare(password, hash);
    }catch(err){
        throw err;
    }
}