import store from 'redux/index';

export function getRoutesFromContainer(context) {
    let routes = [];
    context.keys().forEach((path) => {
        routes.push(context(`${path}`).default);
        if (context(`${path}`).childRoutes) {
            context(`${path}`).childRoutes.forEach((childRoute) => {
                routes.push(childRoute);
            });
        }
    });
    return routes;
}

const appContext = require.context('containers/app', true, /route.js$/);
const authenticationContext = require.context('containers/authentication', true, /route.js$/);

export const appRoutes = getRoutesFromContainer(appContext);
export const authenticationRoutes = getRoutesFromContainer(authenticationContext);

export const listAppRoutes = appRoutes.map((item) => {
    return {
        path: item.path,
        exactContainer: item?.exactContainer ?? true,
    };
});

export const listAuthenticationRoutes = authenticationRoutes.map((item) => {
    return {
        path: item.path,
        exactContainer: item?.exactContainer ?? true,
    };
});

export const initModules = async (modules = [], container = 'app') => {
    await Promise.all([
        modules.map(async (item) => {
            console.log('item: ', item);
            const [reducer, saga] = await Promise.all([
                import(`containers/${container}/screens/${item.path}/reducer`),
                import(`containers/${container}/screens/${item.path}/saga`),
            ]);
            store.injectReducer(item.key, reducer.default);
            store.injectSaga(item.key, saga.default);
        }),
    ]);
    return true;
};
