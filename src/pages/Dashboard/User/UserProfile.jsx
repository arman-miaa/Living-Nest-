import useAuth from "../../../Hooks/useAuth";


const UserProfile = () => {
    const { user } = useAuth();
    console.log(user);
    return (
      <div>
        user profile
        <div className="bg-blue-300 w-1/2 min-h-[500px]  flex justify-center items-center">
          <div className="flex flex-col items-center">
            <img src={user.photoURL} alt="" />
            <h1>{user.displayName}</h1>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    );
};

export default UserProfile;