import { BaseContext } from "koa";
import { getManager, Repository } from "typeorm";
import { validate, ValidationError } from "class-validator";
import { request, summary, path, body, responsesAll, tagsAll } from "koa-swagger-decorator";
import { Instalment, installmentSchema } from "../entity/instalments";

@responsesAll({ 200: { description: "success"}, 400: { description: "bad request"}, 401: { description: "unauthorized, missing/wrong jwt token"}})
@tagsAll(["Instalment"])
export default class InstalmentController {

    @request("get", "/Instalments")
    @summary("Find all Instalments")
    public static async getInstalments(ctx: BaseContext): Promise<void> {

        // get a Instalment repository to perform operations with Instalment
        const instalmentRepository: Repository<Instalment> = getManager().getRepository(Instalment);

        // load all Instalments
        const Instalments: Instalment[] = await instalmentRepository.find();

        // return OK status code and loaded Instalments array
        ctx.status = 200;
        ctx.body = Instalments;
    }

    @request("get", "/Instalments/{id}")
    @summary("Find Instalment by id")
    @path({
        id: { type: "number", required: true, description: "id of Instalment" }
    })
    public static async getInstalment(ctx: BaseContext): Promise<void> {

        // get a Instalment repository to perform operations with Instalment
        const instalmentRepository: Repository<Instalment> = getManager().getRepository(Instalment);

        // load Instalment by id
        const instalment: Instalment | undefined = await instalmentRepository.findOne(+ctx.params.id || 0);

        if (instalment) {
            // return OK status code and loaded Instalment object
            ctx.status = 200;
            ctx.body = instalment;
        } else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = "The Instalment you are trying to retrieve doesn't exist in the db";
        }

    }

    @request("post", "/Instalments")
    @summary("Create a Instalment")
    @body(installmentSchema)
    public static async createInstalment(ctx: BaseContext): Promise<void> {

        // get a Instalment repository to perform operations with Instalment
        const instalmentRepository: Repository<Instalment> = getManager().getRepository(Instalment);

        // build up entity Instalment to be saved
        const instalmentToBeSaved: Instalment = new Instalment();
        instalmentToBeSaved.userId = ctx.request.body.userId;
        instalmentToBeSaved.paymentDate = ctx.request.body.paymentDate;
        instalmentToBeSaved.instalmentDate = ctx.request.body.instalmentDate;
        instalmentToBeSaved.instalmentAmount = ctx.request.body.instalmentAmount;
        instalmentToBeSaved.paymentMethodId = ctx.request.body.paymentMethodId;

        // validate Instalment entity
        const errors: ValidationError[] = await validate(instalmentToBeSaved); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else {
            // save the Instalment contained in the POST body
            const Instalment = await instalmentRepository.save(instalmentToBeSaved);
            // return CREATED status code and updated Instalment
            ctx.status = 201;
            ctx.body = Instalment;
        }
    }

    @request("put", "/Instalments/{id}")
    @summary("Update a Instalment")
    @path({
        id: { type: "number", required: true, description: "id of Instalment" }
    })
    @body(installmentSchema)
    public static async updateInstalment(ctx: BaseContext): Promise<void> {

        // get a Instalment repository to perform operations with Instalment
        const instalmentRepository: Repository<Instalment> = getManager().getRepository(Instalment);

        // update the Instalment by specified id
        // build up entity Instalment to be updated
        const instalmentToBeUpdated: Instalment = new Instalment();
        instalmentToBeUpdated.userId = +ctx.request.body.userId || 0; // will always have a number, this will avoid errors
        instalmentToBeUpdated.paymentDate = ctx.request.body.paymentDate;
        instalmentToBeUpdated.instalmentDate = ctx.request.body.instalmentDate;
        instalmentToBeUpdated.instalmentAmount = ctx.request.body.instalmentAmount;
        instalmentToBeUpdated.paymentMethodId = ctx.request.body.paymentMethodId;

        // validate Instalment entity
        const errors: ValidationError[] = await validate(instalmentToBeUpdated); // errors is an array of validation errors

        if (errors.length > 0) {
            // return BAD REQUEST status code and errors array
            ctx.status = 400;
            ctx.body = errors;
        } else if (!await instalmentRepository.findOne(instalmentToBeUpdated.id)) {
            // check if a Instalment with the specified id exists
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = "The Instalment you are trying to update doesn't exist in the db";
        } else {
            // save the Instalment contained in the PUT body
            const Instalment = await instalmentRepository.save(instalmentToBeUpdated);
            // return CREATED status code and updated Instalment
            ctx.status = 201;
            ctx.body = Instalment;
        }

    }

    @request("delete", "/Instalments/{id}")
    @summary("Delete Instalment by id")
    @path({
        id: { type: "number", required: true, description: "id of Instalment" }
    })
    public static async deleteInstalment(ctx: BaseContext): Promise<void> {

        // get a Instalment repository to perform operations with Instalment
        const instalmentRepository = getManager().getRepository(Instalment);

        // find the Instalment by specified id
        const instalmentToRemove: Instalment | undefined = await instalmentRepository.findOne(+ctx.params.id || 0);
        if (!instalmentToRemove) {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = "The Instalment you are trying to delete doesn't exist in the db";
        } else {
            // the Instalment is there so can be removed
            await instalmentRepository.remove(instalmentToRemove);
            // return a NO CONTENT status code
            ctx.status = 204;
        }

    }

    @request("get", "/Instalments/{id}")
    @summary("Find Instalment by User Id")
    @path({
        id: { type: "number", required: true, description: "id of User" }
    })
    public static async getInstalmentByUserId(ctx: BaseContext): Promise<void> {

        // get a Instalment repository to perform operations with Instalment
        const instalmentRepository: Repository<Instalment> = getManager().getRepository(Instalment);

        // load Instalment by User id
        const instalments: Instalment[] | undefined = await instalmentRepository.find({userId: +ctx.params.id || 0});

        if (instalments) {
            // return OK status code and loaded Instalment object
            ctx.status = 200;
            ctx.body = instalments;
        } else {
            // return a BAD REQUEST status code and error message
            ctx.status = 400;
            ctx.body = "The Instalment you are trying to retrieve doesn't exist in the db";
        }

    }

}
