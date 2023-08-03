import { UsersService } from "../users.service";
import { UsersController } from "../users.controller";
import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";
import { User } from "../model/user.model";

jest.mock("../users.service");
describe("User controller", () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });
  it("should be defined usersController", () => {
    expect(usersController).toBeDefined();
  });
  it("should be defined usersService", () => {
    expect(usersService).toBeDefined();
  });

  describe("createUser", () => {
    describe("when createUser is called", () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name,
          username: userStub().username,
          password: userStub().password,
        };
        user = await usersController.create(createUserDto);
        console.log(user);
      });
      it("then it should call usersService", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
      it("then it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("getOneUser", () => {
    describe("when getOneUser is called", () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.findOne(userStub().id);
      });
      it("then it should call UsersService ", () => {
        expect(usersService.findOne).toBeCalledWith(Number(userStub().id));
      });
      it("it should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("getAllUsers", () => {
    describe("when getAllUsers is called", () => {
      let users: User[];
      beforeEach(async () => {
        users = await usersController.findAll();
      });
      it("then it should call UsersService ", () => {
        expect(usersService.findAll).toBeCalled();
      });
      it("it should return user", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });
  describe("deleteUser", () => {
    describe("when deletelUser is called", () => {
      let res: Object;
      beforeEach(async () => {
        res = await usersController.remove(userStub().id);
      });
      it("then it should call UsersService ", () => {
        expect(usersService.remove).toBeCalledWith(Number(userStub().id));
      });
      it("it should return user", () => {
        expect(res).toEqual({ msg: "deleted successfully" });
      });
    });
  });
});
