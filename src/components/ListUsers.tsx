import { User } from "../api";
import TextHighlight from "./TextHighlight";

interface Props {
  searchQuery: string;
  users: User[];
}

const ListUsers = ({ searchQuery, users }: Props) => (
  <ul className="autocomplete-list">
    {users.map((user) => (
      <li className="autocomplete-list__item" key={user.id}>
        <TextHighlight content={user.name} toHighlight={searchQuery} />
      </li>
    ))}
  </ul>
);

export default ListUsers;
