import constant from '../constant.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";


//Password Services
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


//JWT Auth Token Services
//Split token & Bearer from req-headers
const getToken = authHeader => authHeader.split(' ')[1];

// generate JWT token with user _id as data
const generateJwtToken = SECRET => ({ _id, role }) => jwt.sign({ _id, role }, SECRET);


const verifyJwtToken = SECRET => (req, res, next) => {
	const authHeader = req.headers.authorization
	if (!authHeader) return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'invalid-user' })
	const token = getToken(authHeader)
	jwt.verify(token, SECRET, (err, data) => {
		if (err) return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'token-expired' })
		if (!data?._id) return res.status(constant.RESPONSE.UNAUTHORIZED.STATUS).json({ message: 'invalid-user' })
		req['user'] = data
		next()
	})
}







const useJwt = SECRET => [generateJwtToken(SECRET), verifyJwtToken(SECRET)];
export const [generateAuthToken, verifyAuthToken] = useJwt(constant.JWT_SECRET)