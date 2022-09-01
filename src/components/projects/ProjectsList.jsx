import AddIcon from "@mui/icons-material/Add";
import AddCommentIcon from "@mui/icons-material/AddComment";
import FlagIcon from "@mui/icons-material/Flag";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Avatar, Box, Button, Divider } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { API_UPLOADS_URL } from "../../constants";
import useProjects from "../../hooks/useProjects";
import AddNewCommentDialog from "./Dialogs/AddCommentDialog";
import AddNewProjectDialog from "./Dialogs/AddNewProjectDialog";
import CommentsList from "./Dialogs/CommentsListDialog";
import { ProjectStatus } from "./ProjectStatus";

export default function ProjectsList() {
  const [toggleProjectDialog, setToggleProjectDialog] = useState(false);
  const [toggleCommentDialog, setToggleCommentDialog] = useState(false);
  const [toggleComments, setToggleComments] = useState(false);
  const [parentProject, setParentProject] = useState();
  const projects = useProjects();

  const ProjectNameCell = (params) => {
    let filename = params?.value.image;
    return (
      <Box sx={styles.ProjectNameCell}>
        <Avatar alt="Project" src={API_UPLOADS_URL + filename} />
        {params?.value?.name}
      </Box>
    );
  };

  const handleAddComment = (params) => {
    return () => {
      setParentProject(params.value);
      setToggleCommentDialog(!toggleCommentDialog);
    };
  };

  const handleShowList = (params) => {
    return () => {
      setParentProject(params.value);
      setToggleComments(!toggleComments);
    };
  };

  const ActionsCell = (params) => {
    return (
      <Stack direction="row" spacing={1}>
        <IconButton
          aria-label="add"
          color="success"
          onClick={handleAddComment(params)}
        >
          <AddCommentIcon />
        </IconButton>
        <IconButton
          aria-label="list"
          color="primary"
          onClick={handleShowList(params)}
        >
          <ListAltIcon />
        </IconButton>
      </Stack>
    );
  };

  const DueCell = (params) => {
    let date = params.value.duedate;
    let status = params.value.status;
    if (
      moment(date).isSameOrBefore(moment()) &&
      ProjectStatus[status] === "Active"
    ) {
      return (
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="add" color="error">
            <FlagIcon />
          </IconButton>
          <p style={{ margin: "auto 0" }}>{date}</p>
        </Stack>
      );
    }
    return (
      <Stack direction="row" spacing={1}>
        <p style={{ margin: "auto 0" }}>{date}</p>
      </Stack>
    );
  };

  const handleAddProject = () => {
    setToggleProjectDialog(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "name",
      headerName: "Name",
      width: 180,
      renderCell: ProjectNameCell,
    },
    { field: "url", headerName: "Website URL", width: 350 },
    { field: "status", headerName: "Status", width: 200 },
    {
      field: "duedate",
      headerName: `Due date`,
      width: 280,
      renderCell: DueCell,
    },
    {
      field: "actions",
      headerName: "Add Comment",
      width: 280,
      renderCell: ActionsCell,
    },
  ];

  const rows =
    projects.list?.length > 0 &&
    projects.list.map((project) => {
      return {
        id: project.id,
        name: {
          name: project.name,
          image: project.image,
        },
        url: project.url,
        status: ProjectStatus[project.status],
        duedate: project,
        actions: project,
      };
    });

  return (
    <Box sx={styles.Box}>
      <AddNewProjectDialog
        open={toggleProjectDialog}
        toggle={setToggleProjectDialog}
      />
      <AddNewCommentDialog
        open={toggleCommentDialog}
        toggle={setToggleCommentDialog}
        parent={parentProject}
        refresh={projects.refresh}
      />
      {toggleComments && (
        <CommentsList
          open={toggleComments}
          toggle={setToggleComments}
          parent={parentProject}
        />
      )}
      <CardHeader
        title="Projects Management"
        sx={styles.CardHeader}
        action={
          <Button
            variant="contained"
            endIcon={<AddIcon />}
            sx={styles.AddButton}
            onClick={handleAddProject}
          >
            Create New Project
          </Button>
        }
      />
      <Divider />
      {rows && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      )}
    </Box>
  );
}

const styles = {
  AddButton: { direction: "ltr", backgroundColor: "#0369ff" },
  DeleteIcon: { marginLeft: "20%", color: "red" },
  EditIcon: { marginRight: "20%" },
  Box: {
    height: "100%",
    width: "100%",
    marginLeft: "2%",
    backgroundColor: "white",
  },
  CardHeader: { textAlign: "left" },
  ProjectNameCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
};
