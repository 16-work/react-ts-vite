import { NavigateFunction, Location, Params } from 'react-router-dom';

export const router = {
    location: {} as Location,
    navigate: {} as NavigateFunction,
    query: {} as {
        get: (key: string) => string | null;
        set: (key: string, value: string) => void;
    },
    params: {} as Readonly<Params<string>>,
};

export const useInitRouterFun = () => {
    router.navigate = useNavigate();
    router.location = useLocation();
    router.params = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    router.query = {
        get: (key: string) => {
            return searchParams.get(key);
        },
        set: (key: string, value: string) => {
            searchParams.set(key, value);
            setSearchParams(searchParams);
        },
    };
};
