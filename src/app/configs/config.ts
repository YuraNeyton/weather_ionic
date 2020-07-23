import {environment} from '../../environments/environment.prod';

export const config = {
    API_KEY: environment.API_KEY || '5bfb42d0a7316f19aeb18c3fffca9430',
    API_URL: environment.API_URL || 'https://api.openweathermap.org/data/2.5',
    LANGUAGE_CODE: environment.LANGUAGE_CODE || 'ua'
}