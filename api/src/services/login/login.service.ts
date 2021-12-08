import { createHmac } from "crypto";
import { Authentication } from "src/database/entities/authentication.entity";
import { AuthenticationRepository } from "src/database/repositories/authentication.repository";
import { createConnection  } from 'typeorm';

export class LoginService {

    private salt: string = "DashboardMattisCyril";
    private iterations: number = 1000;
    private connection;

    constructor() {
        this.makeConnection();
    }

    private async makeConnection() {
        this.connection = await createConnection({
            type: 'postgres',
            url: 'postgres://user:password@postgres:5432/postgres',
            entities: [Authentication],
        });
    }

    public async login(username: string, password: string, authType: number, authId: string): Promise<Object> {
        const authenticationRepository = this.connection.getCustomRepository(AuthenticationRepository);
        if (password != "") {
            const hash = createHmac('sha256', password).update(this.salt).digest('hex');
            return authenticationRepository.getByUsernameAndPassword(username, hash).then((value) => {
                if (value) {
                    return {id: value.id};
                }
                return {error: 'Invalid username or password'};
            });
        } else {
            return authenticationRepository.getByApiLogin(username, authType, authId).then((value) => {
                if (value) {
                    return {id: value.id};
                }
                return {error: 'Account is not registered.'};
            });
        }
    }

    public async register(username: string, password: string, authType: number, authId: string): Promise<Object> {
        const authenticationRepository = this.connection.getCustomRepository(AuthenticationRepository);
        if (password != "") {
            const hash = createHmac('sha256', password).update(this.salt).digest('hex');
            return authenticationRepository.getByUsernameAndPassword(username, hash).then((value) => {
                if (value) {
                    return {error: 'Account already exists !'};
                }
                return authenticationRepository.insertUsernamePassword(username, hash).then((value2) => {
                    return {id: value2.id};
                });
            });
        } else {
            return authenticationRepository.getByApiLogin(username, authType, authId).then((value) => {
                if (value) {
                    return {error: 'Account already exists !'};
                }
                return authenticationRepository.insertApi(username, authType, authId).then((value2) => {
                    return {id: value2.id};
                });
            });
        }
    }

}