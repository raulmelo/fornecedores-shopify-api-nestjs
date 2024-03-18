import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    async validate(userToken: { email: string, role: string}) {
        const user = await this.prismaService.user.findUnique({
          where: { email: userToken.email },
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        if(user.role !== userToken.role) {
            throw new UnauthorizedException('Dados manipulados, acesso negado.');
        }
        
        return user;
    }

}