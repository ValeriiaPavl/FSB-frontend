import { User } from "@/pages/users";
import Tag from "@/components/Tag";
import { TagType } from "@/components/Tag";

const backendUrl = process.env.NEXT_PUBLIC_REACT_APP_BACKEND_URL;

const UserCard = (props: User) => {
  return (
    <div key={props.username} className="user-card">
      <img
        className="user-avatar-small"
        src={`${backendUrl + props.user_avatar}`}
      />
      <div className="user-info">
        <p>Name: {props.username}</p>
        <p>Gender: {props.gender}</p>
        <p>Year of birth: {props.year_of_birth}</p>
        <p>User description: {props.user_description}</p>
        <div>
          {props.interest_hashtags &&
            props.interest_hashtags.map((tag: TagType) => (
              <Tag tag={tag}></Tag>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
