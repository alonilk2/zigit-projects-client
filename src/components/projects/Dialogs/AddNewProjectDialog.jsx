/* eslint-disable react-hooks/exhaustive-deps */
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import Spinner from "../../../assets/spinner.svg";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ProjectStatus } from "../ProjectStatus";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { _addProject } from "../ProjectsSlice";
import moment from "moment";

export default function AddNewProjectDialog(props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState(0);
  const [duedate, setDuedate] = useState(moment().format("YYYY-MM-DD"));
  const [file, setFile] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleClose = () => {
    toggleDialog();
  };

  const toggleDialog = () => {
    props.toggle(!props.open);
  };

  useEffect(() => {}, []);

  const handleAdd = async () => {
    if (name.length === 0 || url.length === 0 || file.length === 0) {
      return setError(true);
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("status", status);
    formData.append("duedate", duedate);
    formData.append("url", url);
    formData.append("file", file[0]);
    try {
      setLoading(true);
      let response = await dispatch(_addProject(formData));
      if (response.type.endsWith("fulfilled")) {
        toggleDialog();
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  const Dropzone = (
    <div
      className="dropzone-container"
      {...getRootProps()}
      style={
        error && file?.length === 0
          ? { borderColor: "red", borderWidth: "3px", color: "red" }
          : null
      }
    >
      <input {...getInputProps()} />
      <p>גרור ושחרר קובץ, או לחץ לבחירה</p>
      <CloudUploadIcon sx={styles.CloudUploadIcon} />
    </div>
  );

  const DetailsForm = (
    <>
      {/* <DialogContentText sx={{ direction: "ltr" }}>
        יש למלא את כל הפרטים לפי הסדר.
        <br />
        לנותן השירות יפתח חשבון במערכת באופן אוטומטי בלחיצה על "הוספה", כאשר
        פרטי ההתחברות יהיו הדוא"ל והסיסמה הזמנית שתוצג בהמשך הטופס.
        <br />
        בסעיף יצירת סיסמה יש ללחוץ על הכפתור להצגת הסיסמה הזמנית.
      </DialogContentText> */}
      <br />
      <TextField
        required
        error={error && name?.length === 0}
        id="outlined-required"
        variant="outlined"
        label="Project Name"
        value={name}
        sx={styles.textField}
        onChange={(e) => setName(e.target.value)}
        fullWidth
      />
      <TextField
        required
        error={error && url?.length === 0}
        id="outlined-required"
        variant="outlined"
        value={url}
        label="Website URL"
        sx={styles.textField}
        onChange={(e) => setUrl(e.target.value)}
        fullWidth
      />

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={status}
        label="Status"
        fullWidth
        onChange={(e) => setStatus(e.target.value)}
      >
        {Object.values(ProjectStatus).map((status, idx) => {
          return <MenuItem value={idx}>{status}</MenuItem>;
        })}
      </Select>
      <div style={{ margin: "10px" }} />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DatePicker
          label="Due date"
          value={duedate}
          onChange={(newValue) => {
            setDuedate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <div style={{ margin: "10px" }} />
    </>
  );

  return (
    <Dialog open={props.open} sx={styles.dialogContainer}>
      <DialogTitle>Create New Project</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">All fields are required.</Alert>}
        {DetailsForm}
        {Dropzone}
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
