import useSWR from "swr";
import INote from "../model/INote";

type NoteResponse = {
    data: INote[],
    isLoading: boolean,
    isError: boolean
}

export default function useNotes():NoteResponse {
    const fetcher = (url:string) => fetch(url).then(res => res.json())
    const { data, error } = useSWR("http://localhost:3000/api/notes", fetcher);

    return {
        data: data && data.DATA || [],
        isLoading: !error && !data,
        isError: error
    };
};