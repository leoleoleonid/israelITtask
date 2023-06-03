import {UserRepository} from "./user.repository";
import {UserDTO} from "./user.dto";

export default class UserController {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    static createInstance(): UserController {
        const userRepository = new UserRepository();
        return new UserController(userRepository)
    }

    async create(u: UserDTO): Promise<string> {
        await this.userRepository.create(u);
        return 'success'
    }
}