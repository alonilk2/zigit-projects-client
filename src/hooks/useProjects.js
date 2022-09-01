import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { _getProjects } from "../components/projects/ProjectsSlice";

export default function useProjects() {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const projects = useSelector((state) => state.projects.list);
  const filter = useSelector((state) => state.projects.search);

  const refresh = async () => {
    let response = await dispatch(_getProjects());
    if (response.type.endsWith("rejected")) setError(true);
  };

  useEffect(() => {
    refresh();
  }, []);

  return {
    list: filter
      ? projects.filter((proj) =>
          proj?.name?.toLowerCase().includes(filter.toLowerCase())
        )
      : projects,
    refresh: refresh,
  };
}
