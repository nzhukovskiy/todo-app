import {LoginUserDto} from "../dtos/login-user.dto";
import {Repository} from "typeorm";
import {User} from "../../users/models/user";
import bcrypt from "bcrypt";
import {TokenService} from "../../token/services/token.service";

export class AuthService {
    
    constructor(private readonly userRepository: Repository<User>,
                private readonly tokenService: TokenService) {
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOneBy({email: loginUserDto.email});
        if (!user) {
            throw new Error("Invalid credentials");
        }
        if (!(await bcrypt.compare(loginUserDto.password, user.password))) {
            throw new Error("Invalid credentials");
        }
        return this.tokenService.createToken({
            id: user.id,
            email: user.email
        })
    }
}