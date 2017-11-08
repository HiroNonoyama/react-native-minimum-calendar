import React, { PureComponent } from "react";
import { View, StyleSheet } from "react-native";
import Week from "./week";

const styles = StyleSheet.create({
  week: {
    flex: 1,
    flexDirection: "row"
  }
});

const border = index => {
  return {
    borderColor: "gainsboro",
    borderBottomWidth: 1,
    borderTopWidth: index === 0 ? 1 : 0
  };
};

export default class CalendarBody extends PureComponent {
  constructor(props) {
    super(props);
    const firstDate = new Date(`${this.props.year}/${this.props.month}/1`);
    const lastDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      0
    );
    this.state = {
      firstDay: firstDate.getDay(),
      lastDate: lastDate.getDate()
    };
    this.generateDaysData = this.generateDaysData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const firstDate = new Date(`${nextProps.year}/${nextProps.month}/1`);
    const lastDate = new Date(
      firstDate.getFullYear(),
      firstDate.getMonth() + 1,
      0
    );
    this.setState({
      firstDay: firstDate.getDay(),
      lastDate: lastDate.getDate()
    });
    this.generateDaysData = this.generateDaysData.bind(this);
  }

  generateDaysData() {
    let daysData = [];
    let week = [];
    let day = 1;
    for (let i = 0; i < this.state.firstDay; i++) {
      week.push(0);
    }
    while (day <= this.state.lastDate) {
      while (week.length <= 6) {
        if (day <= this.state.lastDate) {
          week.push(day);
          day++;
        } else {
          week.push(0);
        }
      }
      daysData.push(week);
      week = [];
    }
    if (daysData.length === 5) {
      daysData.push([0, 0, 0, 0, 0, 0, 0]);
    }
    return daysData;
  }

  render() {
    const weeks = this.generateDaysData();
    return weeks.map((week, index) => (
      <View key={index} style={[styles.week, border(index)]}>
        <Week days={week} {...this.props} />
      </View>
    ));
  }
}
