import configDefault   from './default';
import configProd      from './prod';
import type { Config } from './Config';

export enum Environment {
    LOCAL,
    PROD
}

export class ConfigFactory {
    static create(env: Environment = Environment.PROD): Config {
        // TODO create local env
        return Object.assign(configDefault, env === Environment.LOCAL ? configProd : configProd);
    }
}
