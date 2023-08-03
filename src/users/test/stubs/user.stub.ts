import { User } from "../../model/user.model";

export const userStub = (): Partial<User> => {
  return {
    id: "1",
    name: "user1",
    password: "123456qwer$S",
    username: "user123",
  };
};
