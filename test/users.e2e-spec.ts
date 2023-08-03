import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import * as request from "supertest";

describe("User (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const response = await request(app.getHttpServer()).post("/user").send({
      name: "adminakajon1@gmail.com",
      username: "adminjon",
      password: "adminkajon123#",
    });
  });

  // it("users (GET) --> 200 OK", () => {
  //   return request(app.getHttpServer())
  //     .get("/user")
  //     .expect("Content-Type", /json/)
  //     .expect(200);
  // });

  it('users (GET) --> 401 "Unauthorized" error', () => {
    return request(app.getHttpServer())
      .get("/user")
      .expect("Content-Type", /json/)
      .expect(401);
  });

  // it("user/:id (POST) --> 200 ", () => {
  //   return request(app.getHttpServer())
  //     .post("/user")
  //     .send({
  //       name: "adminakajon1@gmail.com",
  //       username: "adminjon",
  //       password: "adminkajon123#",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(200);
  // });

  it("user (POST) --> 401 ", () => {
    return request(app.getHttpServer())
      .post("/user")
      .send({
        name: "adminakajon1@gmail.com",
        username: "adminjon",
        password: "adminkajon123#",
      })
      .expect("Content-Type", /json/)
      .expect(401);
  });

  

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
