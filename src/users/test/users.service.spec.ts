import { UsersService } from "../users.service";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { RolesService } from "../../roles/roles.service";
import { Role } from "../../roles/models/role.model";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../model/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";

describe("Users service", () => {
  let usersService: UsersService;

  const mockUsersRepository = {
    create: jest.fn().mockImplementation(userStub),
  };

  const mockRolesRepository = {
    findOne: jest.fn().mockResolvedValue({ name: "ADMIN" }),
  };

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersRepository,
        },
        {
          provide: getModelToken(Role),
          useValue: mockRolesRepository,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it("should be defined", () => {
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
        (mockUsersRepository.create as jest.Mock).mockResolvedValue({
          ...userStub(),
          roles: ["ADMIN"],
        });
        user = await usersService.create(createUserDto);
        console.log(user);
      });
      it("should be create user", async () => {
        expect(user).toMatchObject({
          ...userStub(),
          roles: ["ADMIN"],
        });
      });
    });
  });
});
