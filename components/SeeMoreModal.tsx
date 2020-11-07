import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { COLORS } from "../assets/COLORS";
import MoodSlider from "../components/MoodSlider";
import { Log } from "../types";
import moment from "moment";

import firebase, { firestore } from "firebase";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import EStyleSheet from "react-native-extended-stylesheet";

var arrayToBubbles = require("../assets/ArrayToBubbles");

export default class SeeMoreModal extends Component<
  Log,
  {
    modalVisible: boolean;
    moodPercentile: number;
    text: string;
    timestamp: string;
    moodWords: string[];
    editable: boolean;
  }
> {
  constructor(props: Log) {
    super(props);
    this.state = {
      modalVisible: false,
      moodPercentile: this.props.moodPercentile,
      text: this.props.text,
      timestamp: this.props.timestamp,
      moodWords: this.props.moodWords,
      editable: false,
    };
  }

  sliderHandler = (sliderValue: number) => {
    this.setState({ moodPercentile: sliderValue });
  };

  // TODO: delete log from firebase, make sure homescreen refreshes (goes back to having createLog instead of TodayEntry)
  onDelete() {
    Alert.alert("Delete button pressed");
    this.closeModal();
  }

  openModal() {
    this.setState({ modalVisible: true });
    this.setState({ text: this.props.text });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }

  async saveLog() {
    const user = firebase.auth().currentUser;
    const date = moment(this.state.timestamp).format("MM-DD-YYYY");
    const log: Log = {
      moodPercentile: this.state.moodPercentile,
      text: this.state.text,
      timestamp: this.state.timestamp,
      moodWords: this.state.moodWords,
    };
    if (user) {
      firestore()
        .collection("users")
        .doc(user.uid)
        .collection("userLogs")
        .doc(date)
        .set(log);
    }
  }

  renderDate() {
    let date = moment(this.props.timestamp);
    let day = date.format("dddd, ").toUpperCase();
    let month = date.format("MMMM ").toUpperCase();
    let dayAndYear = date.format("D YYYY");
    let time = date.format("LT");

    return (
      <View>
        <Text style={styles.dateStyle}>
          {day}
          {month}
          {dayAndYear}
        </Text>
        <Text style={styles.timeStyle}>{time}</Text>
      </View>
    );
  }

  onChangeText = (text: string) => {
    this.setState({ text: text });
  };

  toggleEdit() {
    if (this.state.editable) {
      this.saveLog();
      this.setState({ editable: false });
    } else {
      this.setState({ editable: true });
    }
  }

  renderEditSaveButton() {
    if (this.state.editable) {
      return <MaterialIcons name="save" size={36} color={COLORS.lightBlue} />;
    } else {
      return <AntDesign name="edit" size={36} color={COLORS.lightBlue} />;
    }
  }

  renderStreak() {
    //TODO: Retrieve streak count
    let count = 23;
    return (
      <View style={styles.streakBox}>
        <Text style={styles.countText}>{count}</Text>
        <Image
          source={require("../assets/images/streak.png")}
          style={styles.badge}
        />
      </View>
    );
  }

  sliderContainer() {
    if (this.state.editable) {
      return styles.editableSliderContainer;
    } else {
      return styles.sliderContainer;
    }
  }

  noteContainer() {
    if (this.state.editable) {
      return styles.editableNoteContainer;
    } else {
      return styles.noteContainer;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          hasBackdrop={true}
          isVisible={this.state.modalVisible}
          backdropColor={COLORS.darkBlue}
          backdropOpacity={0.5}
          animationIn="zoomInDown"
          animationOut="zoomOutDown"
          animationInTiming={300}
          animationOutTiming={300}
          backdropTransitionInTiming={300}
          backdropTransitionOutTiming={300}
        >
          <View style={styles.modalContainer}>
            <ScrollView style={styles.innerContainer}>
              {this.renderStreak()}
              {this.renderDate()}
              <Text style={styles.questionStyle}>On this day you felt:</Text>
              <View style={this.sliderContainer()}>
                <MoodSlider
                  sliderValue={this.props.moodPercentile}
                  parentSync={this.sliderHandler}
                  disabled={!this.state.editable}
                />
              </View>

              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Journal Entry:</Text>
              <View style={this.noteContainer()}>
                <TextInput
                  style={styles.note}
                  value={this.state.text}
                  onChangeText={(text) => this.onChangeText(text)}
                  multiline={true}
                  editable={this.state.editable}
                ></TextInput>
              </View>
              <View style={styles.spacer} />
              <Text style={styles.questionStyle}>Mood Descriptions:</Text>
              <View style={styles.moodContainer}>
                {arrayToBubbles(
                  this.props.moodWords,
                  this.props.moodPercentile
                )}
              </View>
            </ScrollView>
            <View style={styles.buttons}>
              <TouchableHighlight
                onPress={() => this.closeModal()}
                underlayColor="none"
              >
                <AntDesign name="back" size={36} color={COLORS.lightBlue} />
              </TouchableHighlight>
              <View style={styles.bottomRight}>
                <TouchableHighlight
                  onPress={() => this.toggleEdit()}
                  underlayColor="none"
                >
                  {this.renderEditSaveButton()}
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => this.onDelete()}
                  underlayColor="none"
                >
                  <MaterialIcons
                    name="delete"
                    size={36}
                    color={COLORS.lightBlue}
                  />
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={() => this.openModal()}
          >
            <AntDesign name="ellipsis1" size={16} color={COLORS.beige} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  modalContainer: {
    margin: -10,
    marginTop: 50,
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    borderRadius: 20,
    padding: 10,
    shadowColor: COLORS.darkBlue,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 7,
    elevation: 5,
  },
  innerContainer: {
    marginTop: 10,
  },
  sliderContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: "10rem",
  },
  editableSliderContainer: {
    backgroundColor: COLORS.lightBlue,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: "10rem",
  },
  noteContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: "5rem",
    paddingBottom: "10rem",
    paddingHorizontal: "10rem",
  },
  editableNoteContainer: {
    backgroundColor: COLORS.lightBlue,
    width: "100%",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    paddingTop: "5rem",
    paddingBottom: "10rem",
    paddingHorizontal: "10rem",
  },
  note: {
    color: COLORS.beige,
    fontSize: "14rem",
  },
  questionStyle: {
    color: COLORS.beige,
    fontSize: "20rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  dateStyle: {
    color: COLORS.beige,
    fontSize: "18rem",
    fontFamily: "HindSiliguri_400Regular",
  },
  timeStyle: {
    color: COLORS.beige,
    fontSize: "14rem",
    fontFamily: "HindSiliguri_400Regular",
  },
  buttonText: {
    color: COLORS.beige,
    fontSize: "15rem",
    textAlign: "center",
    fontFamily: "HindSiliguri_600SemiBold",
  },
  moodContainer: {
    backgroundColor: COLORS.darkBlueAccent,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    borderRadius: 10,
    padding: "5rem",
  },
  saveButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10rem",
  },
  spacer: {
    width: "100%",
    padding: "10rem",
  },
  buttonStyle: {
    backgroundColor: COLORS.darkBlueAccent,
    width: "15%",
    aspectRatio: 3 / 1.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  buttons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.darkBlue,
  },
  bottomRight: {
    flexDirection: "row",
  },
  streakBox: {
    position: "absolute",
    right: 0,
    top: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  badge: {
    width: "40rem",
    height: "40rem",
  },
  countText: {
    color: COLORS.beige,
    fontFamily: "HindSiliguri_600SemiBold",
    fontSize: "20rem",
  },
});
