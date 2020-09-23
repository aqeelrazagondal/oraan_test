// Predefined Services
import { BaseContext } from 'koa';
import bcrypt from 'bcrypt';
import { request, responsesAll, tagsAll, body, summary } from 'koa-swagger-decorator';
import { getManager, Repository, Not, Equal, Like } from "typeorm";
import { User } from '../entity/user';
import { BadRequestError } from '../errors/BadRequestError';
import { NotFoundError } from '../errors/NotFoundError';
// Validation
import { UserLogin } from '../validations/user';
// ResponsesAllSchema
// import { responsesAllSchema } from '../../responsesAllSchema';
// @responsesAll(responsesAllSchema)
@tagsAll(['User'])
export default class Auth {
 @request('post', '/signin')
 @summary('SignIn')
 @body({
 email: { type: 'string', required: true, example: 'firstName.lastName@gmail.com' },
 password: { type: 'string', required: true, example: '123abcABC!@#' }
 })
 public static async signin(ctx: BaseContext) {
 const basicValidation: UserLogin = new UserLogin();
    if (!ctx.request.body.user_name ||!ctx.request.body.password) {
        return new BadRequestError('Required Fileds (email, password)');
    }
    if (!ctx.request.body.password) {
        return new BadRequestError('password required');
    }

    // get a user repository to perform operations with user
    const userRepository: Repository<User> = getManager().getRepository(User);
    // Get User detail
    const res: User = await userRepository.findOne({
        where: {
            user_name: ctx.request.body.user_name,
            password: ctx.request.body.password
        },
        relations: ['statusId']
    });
    if (!res) {
        return new NotFoundError('Account Not Found');
    }
    const check: any = await bcrypt.compare(ctx.request.body.password, res.password);
    if (check) {
        return {
            user: res
        }
    }
    return new BadRequestError('Password Incorrect (please try again)');
}
}