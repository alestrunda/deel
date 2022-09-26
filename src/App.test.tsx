import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import * as useUsersModule from "./hooks/useUsers";

describe("App", () => {
  describe("structure", () => {
    test("renders search input", () => {
      render(<App />);
      const input = screen.getByPlaceholderText("Search users");
      expect(input).toBeInTheDocument();
    });
    test("renders heading", () => {
      render(<App />);
      const heading = screen.getByText("Search users");
      expect(heading).toBeInTheDocument();
      expect(heading.nodeName).toBe("H1");
    });
  });

  describe("users", () => {
    test("when search query set then loads users by that query", () => {
      const mockedUseUsers = jest.fn();
      jest.spyOn(useUsersModule, "useUsers").mockReturnValue({
        error: "",
        isLoading: false,
        loadUsers: mockedUseUsers,
        users: [],
      });
      render(<App />);
      const input = screen.getByPlaceholderText("Search users");
      fireEvent.change(input, {
        target: { value: "John Doe" },
      });
      expect(mockedUseUsers).toHaveBeenCalledWith("John Doe");
    });

    test("when loading users fails with an error then prints the error", () => {
      jest.spyOn(useUsersModule, "useUsers").mockReturnValue({
        error: "Something's not right",
        isLoading: false,
        loadUsers: jest.fn(),
        users: [],
      });
      render(<App />);
      expect(screen.getByText("Something's not right")).toBeInTheDocument();
    });

    test("when users loaded then prints them", () => {
      jest.spyOn(useUsersModule, "useUsers").mockReturnValue({
        error: "",
        isLoading: false,
        loadUsers: jest.fn(),
        users: [
          {
            id: 1,
            name: "Leanne Graham",
            username: "Bret",
            email: "Sincere@april.biz",
            address: {
              street: "Kulas Light",
              suite: "Apt. 556",
              city: "Gwenborough",
              zipcode: "92998-3874",
              geo: {
                lat: "-37.3159",
                lng: "81.1496",
              },
            },
            phone: "1-770-736-8031 x56442",
            website: "hildegard.org",
            company: {
              name: "Romaguera-Crona",
              catchPhrase: "Multi-layered client-server neural-net",
              bs: "harness real-time e-markets",
            },
          },
        ],
      });
      render(<App />);
      expect(screen.getByText("Leanne Graham")).toBeInTheDocument();
    });
  });
});
