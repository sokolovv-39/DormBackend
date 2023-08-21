import { ConfigService } from "@nestjs/config"
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt"

const JwtConfig = async (
    configService: ConfigService
) : Promise<JwtModuleOptions> =>({
    global: true,
    secret: configService.get('jwt'),
    signOptions: { expiresIn: '1h'}
})

export const getJwtConfig = (): JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => JwtConfig(config)
})