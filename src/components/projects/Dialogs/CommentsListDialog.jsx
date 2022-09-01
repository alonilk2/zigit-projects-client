/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import useComments from "../../../hooks/useComments";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "text", headerName: "Comment", width: 600 },
  { field: "createdAt", headerName: "Created At", width: 250 },
];

export default function CommentsList(props) {
  const comments = useComments();

  const handleClose = () => {
    props.toggle(false);
  };

  useEffect(() => {
    if (props.parent?.id) comments.getComments(props.parent?.id);
  }, [props.parent?.id]);

  const rows = useMemo(
    () =>
      comments.comments?.map((com) => {
        return com;
      }),
    [comments.comments]
  );

  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>Comments List</DialogTitle>
      <DialogContent>
        {rows && (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
