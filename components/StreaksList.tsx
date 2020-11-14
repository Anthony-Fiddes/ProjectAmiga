import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { COLORS } from "../assets/COLORS";
import StreakItem from "./StreakItem";

export default class StreaksList extends Component {
  render() {
    return (
      //TODO make this retrieve the info from firestore to make streakItems
      <ScrollView style={styles.innerContainer}>
        <StreakItem />
      </ScrollView>
    );
  }
}

const styles = EStyleSheet.create({
  badge: {
    backgroundColor: "transparent",
    width: "50rem",
    height: "50rem",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  profilePic: {
    width: "100%",
    height: "100%",
  },
  statusBar: {
    backgroundColor: COLORS.pink,
    width: "100%",
    aspectRatio: 40 / 1,
    position: "absolute",
    top: "100rem",
  },
  achievementTitleContainer: {
    width: "63%",
    backgroundColor: "transparent",
    aspectRatio: 1.5 / 1,
  },
  achievemetTitle: {
    color: COLORS.darkBlue,
    fontSize: "27rem",
    fontFamily: "HindSiliguri_500Medium",
    textAlign: "center",
  },
  achievementDescription: {
    color: COLORS.darkBlue,
    fontSize: "25rem",
    fontFamily: "HindSiliguri_500Medium",
    textAlign: "center",
  },
  circle: {
    position: "absolute",
    top: "6rem",
    height: "125rem",
    width: "125rem",
    borderRadius: "63rem",
    backgroundColor: COLORS.pink,
    borderColor: COLORS.pink,
    borderWidth: "14rem",
    alignSelf: "flex-end",
  },
  circle2: {
    position: "absolute",
    top: "16rem",
    height: "115rem",
    width: "115rem",
    borderRadius: "57.5rem",
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderWidth: "14rem",
    alignSelf: "flex-end",
    right: "4rem",
  },
  achievement: {
    width: "100%",
    aspectRatio: 5 / 2,
    backgroundColor: "#FCDDB9",
    borderRadius: 10,
    flexDirection: "column",
    padding: "5rem",
    justifyContent: "space-around",
  },
  spacing: {
    padding: "8rem",
    backgroundColor: "transparent",
  },
});
