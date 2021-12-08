import { EntityRepository, InsertResult, Repository } from "typeorm";
import { Authentication } from "../entities/authentication.entity";

@EntityRepository(Authentication)
export class AuthenticationRepository extends Repository<Authentication> {

    getByUsernameAndPassword(username: string, password: string): Promise<Authentication> {
        return this.createQueryBuilder('authentication')
            .where('authentication.username = :username AND authentication.password = :password', { username, password })
            .getOne();
    }

    getByApiLogin(username: string, authType: number, authId: number): Promise<Authentication> {
        return this.createQueryBuilder('authentication')
            .where('authentication.username = :username AND authentication.auth_type = :authType AND authentication.auth_id = :authId', { username, authType, authId })
            .getOne();
    }

    insertUsernamePassword(username: string, password: string): Promise<InsertResult> {
        return this.createQueryBuilder('authentication')
            .insert()
            .into(Authentication)
            .values({username: username, password: password})
            .execute();
    }

    insertApi(username: string, authType: number, authId: string): Promise<InsertResult> {
        return this.createQueryBuilder('authentication')
            .insert()
            .into(Authentication)
            .values({username: username, auth_id: authId, auth_type: authType})
            .execute();
    }

};