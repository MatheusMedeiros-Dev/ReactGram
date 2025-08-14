import type { User } from "../types/user";
import { uploads } from "../utils/config";

interface ProfileCardProps {
  user: User | null;
}
const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="flex m-4">
      {user?.profileImage && (
        <img
          className="rounded-[50%] w-40"
          src={`${uploads}/users/${user.profileImage}`}
          alt={user.name}
        />
      )}
      <div className="ml-4 m-5">
        <h2 className="font-bold text-3xl mb-4">{user?.name}</h2>
        <p className="font-semibold">{user?.bio}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
