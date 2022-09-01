import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _getComments } from "../components/projects/ProjectsSlice";

export default function useComments() {
    const dispatch = useDispatch()
    const comments = useSelector(state => state.projects.commentslist)

    const getComments = async (project) => {
        dispatch(_getComments(project))    
    }

    return {
        comments,
        getComments
    }
}