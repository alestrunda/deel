import { ChangeEvent, useState } from "react";
import ListUsers from "./components/ListUsers";
import { useUsers } from "./hooks/useUsers";

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { error, isLoading, loadUsers, users } = useUsers();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setSearchQuery(searchQuery);
    loadUsers(searchQuery);
  };

  const hasEmptyResults = !error && !isLoading && searchQuery && !users.length;

  return (
    <div className="app">
      <h1>Search users</h1>
      <div className="loader">
        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div
          className={`loader__content text-gray ${isLoading ? "active" : ""}`}
        >
          Loading...
        </div>
      </div>
      {error && <p className="text-red">{error}</p>}
      {hasEmptyResults && (
        <p className="text-gray">No users fit the search query</p>
      )}
      {users.length > 0 && (
        <ListUsers searchQuery={searchQuery} users={users} />
      )}
    </div>
  );
}

export default App;
