import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

export function loadEnv(envName: string) {
    const candidate = [path.resolve(process.cwd(), 'env', `.env.${envName}`),
        path.resolve(process.cwd(), `.env.${envName}`),
    ]

    const found = candidate.find(fs.existsSync);

    if (!found) {
        throw new Error(`No .env file found for environment: ${envName}`);
    }else{
        dotenv.config({ path: found });
        console.log(`Loaded environment [env] variables from: ${found}`);
    }
}