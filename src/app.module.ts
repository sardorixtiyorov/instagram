import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { PhotosModule } from "./photos/photos.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { User } from "./users/model/user.model";
import { Photo } from "./photos/models/photo.model";
import { UserPhoto } from "./photos/models/user-photo.model";
import { JwtModule } from "@nestjs/jwt";
import { RolesModule } from "./roles/roles.module";
import { CommentModule } from "./comment/comment.module";
import { Role } from "./roles/models/role.model";
import { Comment } from "./comment/models/comment.model";
import { UserRoles } from "./roles/models/user-role.model";
import { AssetsModule } from "./assets/assets.module";
import { Asset } from "./assets/model/asset.model";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { FollowerModule } from "./follower/follower.module";
import { Follower } from "./follower/model/follower.model";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "public"),
    }),
    ConfigModule.forRoot({
      envFilePath: ".env",
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Photo,
        UserPhoto,
        UserRoles,
        Role,
        Comment,
        Asset,
        Follower,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TIME },
    }),
    UsersModule,
    PhotosModule,
    AuthModule,
    RolesModule,
    CommentModule,
    AssetsModule,
    FollowerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
