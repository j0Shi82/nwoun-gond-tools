// guards
import setIsLoadingTrue from "@/router/guards/setIsLoadingTrue";
import setLocale from "@/router/guards/setLocale";
import setTitle from "@/router/guards/setTitle";
import whoami from "@/router/guards/whoami";

const guardConfig = [
    { test: () => true, guards: [setLocale, setIsLoadingTrue, setTitle] },
    { test: ({ routeName }) => routeName === "infohub", guards: [whoami] },
];

export default ({ routeName }) => {
    const guards = [];
    guardConfig.forEach((config) => {
        if (config.test({ routeName })) guards.push(...config.guards);
    });
    return guards;
};
