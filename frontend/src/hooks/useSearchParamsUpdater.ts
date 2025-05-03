import {useLocation , useNavigate} from "react-router-dom";

export const useSearchParamUpdater = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const updateSearchParam = (pathname: string = "/", key: string, value: string | null | undefined) => {
        const queryParams = new URLSearchParams(location.search);

        if (!value) {
            queryParams.delete(key);
        } else {
            queryParams.set(key, value);
        }

        navigate({ pathname, search: queryParams.toString() }, { replace: true });
    };

    return { updateSearchParam }
};
