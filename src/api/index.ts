export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

const apiURL = "https://jsonplaceholder.typicode.com";

export const api = {
  getUsers: (filterQuery: string) => {
    return fetch(`${apiURL}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json() as Promise<User[]>;
      })
      .then((users: User[]) =>
        // filter users based on the query - would be better if the api could
        // return filtered users than getting all users and filtering them here,
        // for this case we could simply cache the response, because the response
        // will be the same every time
        users.filter((user) =>
          user.name
            .toLocaleLowerCase()
            .includes(filterQuery.toLocaleLowerCase())
        )
      );
  },
};
