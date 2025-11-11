import {Repository} from "typeorm";
import {User} from "../models/user";
import {CreateUserDto} from "../dtos/create-user.dto";
import {TokenService} from "../../token/services/token.service";
import bcrypt from "bcrypt"

export class UsersService {
    constructor(private readonly userRepository: Repository<User>,
                private readonly tokenService: TokenService) {
    }

    async registerUser(createUserDto: CreateUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.save(createUserDto);
        return this.tokenService.createToken({
            id: user.id,
            email: user.email
        });
    }
}