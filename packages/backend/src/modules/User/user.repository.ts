import { Repository } from "typeorm";
import { User } from "./user.entity";
import { dataSource } from '../../common/db/connection'
import {UserDTO} from "./user.dto";

export class UserRepository {
    private userTypeORMRepo: Repository<User>;
    constructor() {
        this.userTypeORMRepo = dataSource.getRepository<User>(User)
    }

    async create(userData: UserDTO): Promise<void> {
        const userE = this.toUserEntity(userData)
        await this.userTypeORMRepo.insert(userE);
    }

    private toUserEntity(user: UserDTO): User {
        const userEntity = new User();
        if (user.id) userEntity.id = user.id;
        if (user.firstName) userEntity.firstName = user.firstName;
        if (user.lastName) userEntity.lastName = user.lastName;
        return userEntity;
    }

}