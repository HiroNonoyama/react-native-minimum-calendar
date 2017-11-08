import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const window = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: window.width,
    height: 50,
    marginBottom: 10
  },
  firstHeader: {
    height: 40,
    flexDirection: "row",
    width: window.width,
    alignItems: "center",
    justifyContent: "center"
  },
  secondHeader: {
    height: 10,
    flexDirection: "row"
  },
  month: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center"
  },
  changeMonth: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  monthText: {
    fontSize: 20
  },
  weekOfTheDay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  weekOfTheDayText: {
    fontSize: 12
  }
});

const textColor = color => ({
  color
});

export default function CalendarHeader(props) {
  return (
    <View style={styles.container}>
      <View style={styles.firstHeader}>
        <TouchableOpacity
          style={styles.changeMonth}
          onPress={() => props.changeMonth(props.month - 1)}
        >
          <Text>{"<"}</Text>
        </TouchableOpacity>
        <View style={styles.month}>
          <Text style={styles.monthText}>{props.month}</Text>
        </View>
        <TouchableOpacity
          style={styles.changeMonth}
          onPress={() => props.changeMonth(props.month + 1)}
        >
          <Text>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.secondHeader}>
        {[
          { Sun: "crimson" },
          { Mon: "black" },
          { Tue: "black" },
          { Wed: "black" },
          { Thu: "black" },
          { Fri: "black" },
          { Sat: "dodgerblue" } // TODO 拡張可能
        ].map(val => {
          return (
            <View style={styles.weekOfTheDay} key={Object.keys(val)[0]}>
              <Text
                style={[
                  styles.weekOfTheDayText,
                  textColor(val[Object.keys(val)[0]])
                ]}
              >
                {Object.keys(val)[0]}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
