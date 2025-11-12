import {axiosApi} from "../../../core/api/axios.api.ts";
import type {LoginUserDto} from "../dtos/login-user.dto.ts";

export async function loginUser(loginUserDto: LoginUserDto) {
    const token = await axiosApi.post<string>('auth/login', loginUserDto);
    return token.data;
}