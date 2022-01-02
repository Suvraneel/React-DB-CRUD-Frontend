import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/postMessage";
import {
  Fab,
  Paper,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
  Grid,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostMessageForm from "./formCRUD";
import AppBar from "./appBar";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fdd835",
      contrastText: "#ffcc00",
    },
    secondary: {
      main: "#000",
      contrastText: "#ffcc00",
    },
    background: {
      default: "rgba(33,29,59,0.46)",
      paper: "rgba(33,29,59,0.46)",
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

const PostMessages = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllPostMessages();
  }, [props]);

  const onDelete = (id) => {
    if (window.confirm("Confirm Parmanent Deletion..."))
      props.deletePostMessage(id);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container direction="row" justifyContent="space-around">
        <Grid item xs={4}>
          <Grid container direction="column" justifyContent="flex-start">
            <AppBar />
            <br />
            <Paper>
              <PostMessageForm {...{ currentId, setCurrentId }} />
            </Paper>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Paper>
            {props.postMessageList[0] == null ? 
            <>
            <br />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="circular" width={60} height={60} />
            <br />
            <Skeleton animation="wave" variant="rectangular" height={80} />
            <br />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="circular" width={60} height={60} />
            <br />
            <Skeleton animation="wave" variant="rectangular" height={80} />
            <br />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="circular" width={60} height={60} />
            <br />
            <Skeleton animation="wave" variant="rectangular" height={80} />
            <br />
            <Skeleton animation="wave" variant="text" />
            <Skeleton animation="wave" variant="circular" width={60} height={60} />
            <br />
            <Skeleton animation="wave" variant="rectangular" height={80} />
            </> : 
            <List>
              {props.postMessageList.map((record, index) => {
                return (
                  <Fragment key={index}>
                    <ListItem>
                      <ListItemText>
                        <Grid
                          container
                          direction="row"
                          justifyContent="space-between"
                        >
                          <Box sx={{ "& > :not(style)": { m: 1 } }}>
                            <Typography variant="h5">{record.title}</Typography>
                            <Typography>{record.artist}</Typography>
                            <Typography>{record.metadata}</Typography>
                          </Box>
                          <Box sx={{ "& > :not(style)": { m: 1 } }}>
                            <Fab
                              color="secondary"
                              aria-label="edit"
                              onClick={() => setCurrentId(record._id)}
                            >
                              <EditIcon />
                            </Fab>
                            <Fab
                              color="common.red"
                              aria-label="delete"
                              onClick={() => onDelete(record._id)}
                              variant="circular"
                            >
                              <DeleteIcon />
                            </Fab>
                          </Box>
                        </Grid>
                      </ListItemText>
                    </ListItem>
                    <Divider component="li" />
                  </Fragment>
                );
              })}
            </List>}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  postMessageList: state.postMessage.list,
});

const mapActionToProps = {
  fetchAllPostMessages: actions.fetchAll,
  deletePostMessage: actions.Delete,
};

export default connect(mapStateToProps, mapActionToProps)(PostMessages);
