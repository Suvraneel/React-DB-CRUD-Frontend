import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Paper,
  Card,
  CardContent,
  Button,
  ThemeProvider,
} from "@mui/material";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import { createTheme } from "@mui/material/styles";

const initialFieldValues = {
  title: "",
  artist: "",
  metadata: "",
};

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fdd835",
      contrastText: "#ffcc00",
    },
    // secondary: {
    //     main: '#f50057',
    //     contrastText: '#ffcc00',
    // },
    background: {
      default: "#060314",
      paper: "#060314",
      contrastText: "#fdd835",
    },
  },
  typography: {
    fontFamily: [
      "Raleway",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

const PostMessageForm = ({ classes, ...props }) => {
  useEffect(() => {
    if (props.currentId != 0) {
      setValues({
        ...props.postMessageList.find((x) => x._id == props.currentId),
      });
      setErrors({});
    }
  }, [props.currentId]);

  const validate = () => {
    let temp = { ...errors };
    temp.title = values.title ? "" : "* Required field";
    temp.artist = values.artist ? "" : "* Required field";
    temp.metadata = values.metadata ? "" : "* Required field";
    setErrors({
      ...temp,
    });
    return Object.values(temp).every((x) => x == "");
  };

  var { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      resetForm();
    };
    if (validate()) {
      if (props.currentId == 0) props.createPostMessage(values, onSuccess);
      else props.updatePostMessage(props.currentId, values, onSuccess);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ minWidth: 275 }} className="fontImp">
        <CardContent>
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <TextField
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={values.title}
              margin="normal"
              onChange={handleInputChange}
              {...(errors.title && { error: true, helperText: errors.title })}
            />
            <TextField
              name="artist"
              variant="outlined"
              label="Artist"
              fullWidth
              value={values.artist}
              margin="normal"
              onChange={handleInputChange}
              {...(errors.artist && { error: true, helperText: errors.artist })}
            />
            <TextField
              name="metadata"
              variant="outlined"
              label="Metadata"
              fullWidth
              multiline
              rows={3}
              value={values.metadata}
              margin="normal"
              onChange={handleInputChange}
              {...(errors.metadata && {
                error: true,
                helperText: errors.metadata,
              })}
            />
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  createPostMessage: actions.create,
  updatePostMessage: actions.update,
};

export default connect(mapStateToProps, mapActionToProps)(PostMessageForm);
