/* eslint-disable react-hooks/exhaustive-deps */
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Spinner from "../../../assets/spinner.svg";
import { _addComment } from "../ProjectsSlice";

export default function AddNewCommentDialog(props) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  let parentProject = props.parent;
  let refreshProjects = props.refres;

  const handleClose = () => {
    toggleDialog();
  };

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  const handleAdd = async () => {
    if(comment.length === 0) return setError(true)
    try {
      setLoading(true);
      console.log(parentProject)
      let response = await dispatch(_addComment({ comment: comment, parent: parentProject }));
      if (response.type.endsWith("fulfilled")) {
        refreshProjects && refreshProjects();
        toggleDialog();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e);
      console.log(e);
    }
  };

  const DetailsForm = (
    <>
      <br />
      <TextField
        required
        error={error && comment?.length === 0}
        id="outlined-required"
        variant="outlined"
        label="Comment"
        value={comment}
        multiline
        sx={styles.textField}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />
    </>
  );

  return (
    <Dialog open={props.open} sx={styles.dialogContainer}>
      <DialogTitle>Add New Comment</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">All fields are required.</Alert>}
        {DetailsForm}
      </DialogContent>
      <DialogActions>
        {loading && <img src={Spinner} width={50} alt=""></img>}
        <Button variant="text" onClick={handleClose}>
          Cancel
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button variant="contained" onClick={handleAdd}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const styles = {
  dialogContainer: {
    direction: "ltr",
    minWidth: "500px",
  },
  alert: { margin: "2%", direction: "ltr" },
  textField: {
    margin: "2% 0",
    border: "0px",
    overflow: "hidden",
  },
  CloudUploadIcon: {
    margin: "0 2% ",
  },
  addWorkdays: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    padding: "2% 0",
    color: "rgba(0, 0, 0, 0.6)",
  },
  addButton: {
    bgcolor: "success",
  },
};
