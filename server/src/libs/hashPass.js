import bcrypt from "bcrypt";
export const hashpassword = async (data) =>{
    return bcrypt.hash(data,10);

}
export const comparePassword = async (password , hashpassword)=>{
    return bcrypt.compare(password , hashpassword);
    
}
