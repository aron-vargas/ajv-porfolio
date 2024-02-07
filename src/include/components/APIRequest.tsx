import axios from 'axios';
import Config from "../config.json";
import { useAuth } from 'include/components/useAuth';

/**
 * Create an Axios Client
 * Set the baseURL from the Config
 */
const BaseUrl = Config.api_base_url;
const APIOptions =
{
    baseURL: BaseUrl,
    timeout: 30000,
    headers:
    {
        "Content-Type": "application/json",
    }
}
const client = axios.create(APIOptions);

const IncludeJWT = (config) =>
{
    const user_str = localStorage.getItem('user');
    const user = user_str && JSON.parse(user_str);
    const authToken = user?.user_token?.token

    if (authToken)
    {
        // Make sure the config is "sound"
        if (config == undefined) config = {}
        if (config.headers === undefined) config.headers = {}

        if (authToken)
            config.headers.Authorization = `Bearer ${authToken}`;
    }

    return config;
}

/**
 * Add JWT Token
 */
client.interceptors.request.use(config =>
{
    return IncludeJWT(config)
},
(error) =>
{
    return Promise.reject(error)
});

/**
 * This would get the actual error structure sent from the api
 *
client.interceptors.response.use(
    response => response,
    error =>
    {
        //return Promise.reject(error);

        //if (error.response.data.errors)
       //     error.message = error.response.data.errors

        return Promise.reject(error)
    },
)
*/

/**
 * Log the response and return it
 * @param response
 * @returns
 */
const onSuccess = (response: any) =>
{
    // log each request response
    console.log("apiRequest[onSuccess]: ", response);
    return response;
}

/**
 * Log the error and return it
 * @param error
 * @returns
 */
const onError = (error: any) =>
{
    console.error('apiRequest[onError]: ', error.toJSON());
    return error;
}

// Alter defaults after instance has been created
//client.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//const requestInterceptor = axios.interceptors.request.use(function () {/*...*/});
//const responseInterceptor = axios.interceptors.response.use(function () {/*...*/});
// TODO: create request interceptor to add jwt Authorization Bear header

const apiRequest = (options: any | null) =>
{
    // User client to make the api call
    return client(options)
        .then(onSuccess)
        .catch(onError);
};
export default apiRequest;

export const APIGet = (route: string, config?: any | null) =>
{
    return client.get(route, IncludeJWT(config)).then(onSuccess).catch(onError);
};

export const APIPost = (route: string, data: any, config?: any | null) =>
{
    // User client to make the api call
    return client.post(route, data, IncludeJWT(config)).then(onSuccess).catch(onError);
};

export const APIPut = (route: string, data: any) =>
{
    return apiRequest({
        url:    route,
        method: 'PUT',
        data: data
    });
};

export const APIDelete = (route: string) =>
{
    return apiRequest({
        url:    route,
        method: 'DELETE'
    });
};
