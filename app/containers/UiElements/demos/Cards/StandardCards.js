import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import dummy from "dan-api/dummy/dummyContents";
import imgApi from "dan-api/images/photos";
import Webcam from "react-webcam";
import Button from "@material-ui/core/Button";
// import Amplify, { API, Storage, graphqlOperation } from "aws-amplify";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Axios from "axios";
import { CrudTable, Notification, PapperBlock } from "dan-components";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// import FileAPI from "file-api";
// import { createTodo } from "../../../../../src/graphql/mutations";
// import { listTodos } from "../../../../../src/graphql/queries";
// import * as mutations from "../../../../../src/graphql/mutations";
import {
  GeneralCard,
  NewsCard,
  Quote,
  IdentityCard,
} from "../../../../components";
// import { img } from "./base64";
const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};
const instance = Axios.create({
  baseURL: "http://localhost:3005/",
});
const styles = (theme) => ({
  divider: {
    margin: `${theme.spacing.unit * 3}px 0`,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  cardMedia: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    // paddingTop: "56.25%", // 16:9
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
});
const initialState = { name: "", description: "" };
const todoDetails = {
  name: "Ambition Team",
  description: "This is the face of the student",
};
class StandardCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCaptureEnable: false,
      url: "",
      selectedFile: null,
      todos: "",
      formState: initialState,
      similarity: false,
      seconds: 3,
      show: false,
      flag: true,
      count: 0,
    };
  }
  checkTimeOut = () => {
    setTimeout(() => this.setState({ show: true }), 3000);
  };
  componentDidMount() {
    this.fetchTodos();
    // this.checkTimeOut();
  }
  setTodos = (value) => {
    this.setState({
      todos: value,
    });
  };
  setFormState = (value) => {
    this.setState({
      formState: value,
    });
  };
  setInput = (key, value) => {
    setFormState({ ...this.state.formState, [key]: value });
  };
  async fetchTodos() {
    // try {
    //   const todoData = await API.graphql(graphqlOperation(listTodos));
    //   if (todoData) {
    //     const todos = todoData.data.listTodos.items;
    //     this.setTodos(todos);
    //   }
    //   //
    // } catch (err) {
    //   console.log("error fetching todos");
    // }
  }
  async createTodooo(value) {
    const todoDetails = {
      name: "Ambition Team",
      description: value.data.records[0].source,
    };
    if (todoDetails.description > 60) {
      this.setState({
        similarity: true,
      });
    }
    // try {
    //   await API.graphql({
    //     query: mutations.createTodo,
    //     variables: { input: todoDetails },
    //   });
    // } catch (err) {
    //   console.log("error creating todo:", err);
    // }
    this.setState({
      show: false,
      flag: true,
    });
    this.checkTimeOut();
  }
  async addTodo() {
    // try {
    //   if (!this.state.formState.name || !this.state.formState.description)
    //     return;
    //   const todo = { ...this.state.formState };
    //   setTodos([...todos, todo]);
    //   setFormState(initialState);
    //   await API.graphql(graphqlOperation(createTodo, { input: todo }));
    // } catch (err) {
    //   console.log("error creating todo:", err);
    // }
  }
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();
    // Update the formData object
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );
    // Details of the uploaded file
    this.UploadFile(this.state.selectedFile);
    // Request made to the backend api
    // Send formData object
    // axios.post("api/uploadfile", formData);
  };
  async UploadFile(file) {
    Storage.configure({
      customPrefix: {
        protected: "protected/predictions/index-faces/",
      },
      // ...
    });
    try {
      await Storage.put(file.name, file, {
        level: "protected",
        contentType: "image/jpeg", // contentType is optional
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || "";
    sliceSize = sliceSize || 512;
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  async convert(imageSrc) {
    // const imageSrc = webcamRef.current.getScreenshot();
    // const base64result = imageSrc.split(',')[1];
    // const blob = this.b64toBlob(base64result);
    // const file = new File([blob], 'minh_nguyen.jpg', {
    //   type: 'image/png',
    // });
    // console.log('file', file);
    // this.UploadFile(file);
  }
  setRef = (webcam) => {
    this.webcam = webcam;
  };
  setUrl = (value) => {
    this.setState({
      url: value,
    });
  };
  capture = () => {
    // const imageSrc = this.webcam.getScreenshot();
    // if (imageSrc) {
    //   this.convert(imageSrc);
    // } else {
    //   this.convert(urlImage1);
    // }
  };
  setCaptureEnable = (value) => {
    this.setState({
      isCaptureEnable: value,
    });
  };
  sendResult = () => {
    this.setState({
      flag: false,
    });
    try {
      instance.get("api/compare").then((result) => this.createTodooo(result));
    } catch (er) {
      console.log("error", er);
    }
  };
  render() {
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;
    const { show, flag, isCaptureEnable } = this.state;
    console.log("show", show);
    if (isCaptureEnable) {
      console.log("comehere");
      // this.capture();
      // this.sendResult();
      this.checkTimeOut();
    }
    const timerProps = {
      isPlaying: true,
    };
    return (
      <Grid
        container
        alignItems="flex-start"
        justify="flex-start"
        direction="row"
        spacing={24}
      >
        <Grid item md={24}>
          {this.state.isCaptureEnable || (
            <NewsCard image={imgApi[8]} title="Contemplative Reptile">
              <Button
                onClick={() => this.setCaptureEnable(true)}
                variant="outlined"
                color="secondary"
              >
                Turn on
              </Button>
              <Typography component="p">
                Aliquam venenatis magna et odio lobortis maximus. Nullam in
                tortor ligula. Proin maximus risus nunc lorem xin chao dhe dhe
                qeqwewqewq
              </Typography>
            </NewsCard>
          )}
          <CardContent>
            {this.state.isCaptureEnable && (
              <>
                <Webcam
                  audio={false}
                  width={1050}
                  height={480}
                  // ref={webcamRef}
                  ref={this.setRef}
                  screenshotFormat="image/jpeg"
                  videoConstraints={videoConstraints}
                />
                {/* <Button
                  onClick={this.capture}
                  variant="outlined"
                  color="secondary"
                >
                  Capture photo
                </Button> */}
                {this.state.show ? (
                  <div className={classes.title} align="center">
                    <Typography color="primary" variant="subtitle2">
                      The system identified your face
                    </Typography>
                  </div>
                ) : (
                  // <Typography component="p" className={classes.text}>
                  //   The system identified your face
                  // </Typography>
                  <div className={classes.title} align="center">
                    <Typography color="error" variant="subtitle2">
                      The system cannot identify your face
                    </Typography>
                  </div>
                  // <CrudTable title="The system cannot identify your face" />
                  // <Typography component="p" className={classes.text}>
                  //   The system cannot identify your face
                  // </Typography>
                )}
                <div>
                  <Button
                    onClick={() => this.setCaptureEnable(false)}
                    variant="outlined"
                    color="secondary"
                  >
                    Turn off
                  </Button>
                </div>
                {/* <div>
                  <input type="file" onChange={this.onFileChange} />
                  <button onClick={this.onFileUpload}>Upload!</button>
                </div> */}
              </>
            )}
            {this.state.url && (
              <>
                <div>
                  <img src={this.state.url} alt="Screenshot" />
                </div>
              </>
            )}
          </CardContent>
        </Grid>
        {/* <Grid item md={6}>
          <Typography variant="button" className={classes.divider}>
            Quoted Card
          </Typography>
          <div>
            <GeneralCard liked={1} shared={20} commented={15}>
              <Quote
                align="left"
                content="Imagine all the people living life in peace. You may say I'm a dreamer, but I'm not the only one. I hope someday you'll join us, and the world will be as one."
                footnote="John Lennon"
              />
            </GeneralCard>
          </div>
          <div>
            <Typography variant="button" className={classes.divider}>
              Identity Card
            </Typography>
            <IdentityCard
              title="Contact and Address Card"
              name={dummy.user.name}
              avatar={dummy.user.avatar}
              phone="(+8543201213)"
              address="Town Hall Building no.45 Block C - ABC Street"
            />
          </div>
        </Grid> */}
      </Grid>
    );
  }
}
StandardCard.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(StandardCard);
