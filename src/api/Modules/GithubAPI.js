import {useAxios} from "../_unsplash";

export const useGithubAPI = _ => {
    const {request} = useAxios();

    // Fork repo
    const forkRepo = async (access_token, repository_name) => {
        return await request().post(
            `/fork`,
            {
                access_token: access_token,
                repository_name: repository_name
            }
        );
    };

    // Get Repo list
    const getRepoList = async () => {
        return await request().get(`/list`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return {
        getRepoList,
        forkRepo
    };
};
