import { DeleteResult, EntityRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { Oauth } from "../entities/oauth.entity";

@EntityRepository(Oauth)
export class OauthRepository extends Repository<Oauth> {
    findAll(): Promise<Oauth[]> {
        return this.createQueryBuilder('oauth')
            .getMany();
    }

    findAllByUserId(id: number): Promise<Oauth[]> {
        return this.createQueryBuilder('oauth')
            .where('oauth.user_id = :id', { id })
            .getMany();
    }

    findSpecificOauthByUserId(userId: number, serviceId: number): Promise<Oauth> {
        return this.createQueryBuilder('oauth')
            .where('oauth.user_id = :userId AND oauth.service_id = :serviceId', {userId, serviceId})
            .getOne();
    }

    removeOauthFromUserId(userId: number, serviceId: number): Promise<DeleteResult> {
        return this.createQueryBuilder('oauth')
            .delete()
            .where('oauth.user_id = :userId AND oauth.service_id = :serviceId', {userId, serviceId})
            .execute();
    }

    updateOauthFromUserId(userId: number, serviceId: number, accessToken: string, refreshToken: string): Promise<UpdateResult> {
        return this.createQueryBuilder('oauth')
            .update()
            .set({ access_token: accessToken, refresh_token: refreshToken })
            .where('oauth.user_id = :userId AND oauth.service_id = :serviceId', { userId, serviceId })
            .execute();
    }

    insertOauth(userId: number, serviceId: number, accessToken: string, refreshToken: string): Promise<InsertResult> {
        return this.createQueryBuilder('oauth')
            .insert()
            .into(Oauth)
            .values({
                user_id: userId, service_id: serviceId, access_token: accessToken, refresh_token: refreshToken
            })
            .execute();
    }
}