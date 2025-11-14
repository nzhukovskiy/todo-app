import {Repository} from "typeorm";
import {User} from "../models/user";
import {CreateUserDto} from "../dtos/create-user.dto";
import {TokenService} from "../../token/services/token.service";
import bcrypt from "bcrypt"
import {ConflictError} from "../../../core/errors/app-errors";

export class UsersService {
    constructor(private readonly userRepository: Repository<User>,
                private readonly tokenService: TokenService) {
    }

    async registerUser(createUserDto: CreateUserDto) {
        const existingUser = await this.userRepository.findOneBy({email: createUserDto.email});

        if (existingUser) {
            throw new ConflictError("User with provided email already exists");
        }
        createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
        const user = await this.userRepository.save(createUserDto);
        return this.tokenService.createToken({
            id: user.id,
            email: user.email
        });
    }
}