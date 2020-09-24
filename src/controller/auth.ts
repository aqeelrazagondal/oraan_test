// Predefined Services
import { BaseContext } from "koa";
import bcrypt from "bcrypt";
import { request, tagsAll, body, summary } from "koa-swagger-decorator";
import { getManager, Repository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { User } from "../entity/user";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
// Validation
import { UserLogin } from "../validations/user";
@tagsAll(["User"])
export default class Auth {
    @request("post", "/signin")
    @summary("SignIn")
    @body({
        userName: { type: "string", required: true, example: "firstName.lastName@gmail.com" },
        password: { type: "string", required: true, example: "123abcABC!@#" }
    })
    public static async signin(ctx: BaseContext) {
        if (!ctx.request.body.userName ||!ctx.request.body.password) {
            return new BadRequestError("Required Fileds (email, password)");
        }
        if (!ctx.request.body.password) {
            return new BadRequestError("password required");
        }

        const userToBeLogin: UserLogin = new UserLogin();
        userToBeLogin.userName = ctx.request.body.name;
        userToBeLogin.password = ctx.request.body.email;

        // validate user entity
        const errors: ValidationError[] = await validate(userToBeLogin); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        }
        // get a user repository to perform operations with user
        const userRepository: Repository<User> = getManager().getRepository(User);
        // Get User detail
        const res: User = await userRepository.findOne({
            where: {
                userName: ctx.request.body.userName,
                password: ctx.request.body.password
            },
            relations: ["statusId"]
        });
        if (!res) {
            return new NotFoundError("Account Not Found");
        }
        const check: any = await bcrypt.compare(ctx.request.body.password, res.password);
        if (check) {
            // return Success status code and user detail
            ctx.status = 200;
            ctx.body = res;
        }
        return new BadRequestError("Password Incorrect (please try again)");
    }
}