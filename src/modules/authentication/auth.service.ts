import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from "./dto/register-user.dto";
import { Users } from "../users/users.model";


@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jtwService: JwtService,
        private readonly usersService: UsersService
    ) {}

    async login(loginDto: LoginDto): Promise<any> {
        const { email, password } = loginDto;
        const user = await this.prismaService.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                password: true,
                businesses: {
                    select: {
                        idShopify: true,
                        id: true,
                        disabled: true,
                    }
                }
            }
        });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const validatePassword = await bcrypt.compare(password, user.password);

        if(!validatePassword) {
            throw new NotFoundException('invalid password');
        }

        const token = this.jtwService.sign({ 
            email: user.email,
            id: user.id,
            role: user.role,
            businesses: user.businesses
        })

        this.prismaService.token.createMany({
            data: {
                token,
                userId: user.id
            }
        });

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }
    }

    async register(createDto: RegisterUserDto): Promise<any> {
        const createUser = new Users();
        createUser.email = createDto.email;
        createUser.password = await bcrypt.hash(createDto.password, 10);
        createUser.name = createDto.name;
        createUser.role = createDto.role
        createUser.cpf = createDto.cpf;

        const user = await this.usersService.createUser(createUser);

        return {
            token: this.jtwService.sign({ email: user.email, id: user.id })
        }
    }
}