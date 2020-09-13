import {
  Resolver,
  Ctx,
  Arg,
  Mutation,
  InputType,
  Field,
  ObjectType,
} from 'type-graphql';
import {MyContext} from '../types';
import {User} from '../entities/User';
import * as argon2 from 'argon2';

@InputType()
class UsernamePasswordInput {
  @Field(() => String)
  password: string;
  @Field(() => String)
  userName: string;
}
@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[];
  @Field(() => User, {nullable: true})
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() {em}: MyContext
  ) {
    if (options.userName.length <= 2) {
      return {
        errors: [
          {
            field: 'userName',
            message: 'username should be longer than 3 letters',
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = await em.create(User, {
      userName: options.userName,
      password: hashedPassword,
    });
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'userName',
              message: 'username already taken',
            },
          ],
        };
      }
      console.log('message', err.message);
    }
    return {user};
  }
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() {em, req}: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, {
      userName: options.userName,
    });

    if (!user) {
      return {
        errors: [
          {
            field: 'userName',
            message: 'that user name dese not exist',
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'incorrect info',
          },
        ],
      };
    }

    req.session!.userId = user.id;
    return {user};
  }
}
