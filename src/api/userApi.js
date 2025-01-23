import useAxiosPublic from "../Hooks/useAxiosPublic"

const axiosPublic = useAxiosPublic();

export const saveUser = async user => {
 
    await axiosPublic.post(`/user/${user.email}`, {
    name: user.displayName,
    email: user.email
        })
}