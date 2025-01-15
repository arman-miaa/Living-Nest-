import useAxiosPublic from "../Hooks/useAxiosPublic"

const axiosPublic = useAxiosPublic();

export const saveUser = async user => {
    console.log(user.displayName, user.email);
    await axiosPublic.post(`/user/${user.email}`, {
    name: user.displayName,
    email: user.email
        })
}