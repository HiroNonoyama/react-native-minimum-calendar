import { View, StyleSheet, Modal } from "react-native";
import React, { PureComponent } from "react";
import CalendarBody from "./component/calendarBody";
import CalendarHeader from "./component/calendarHeader";
import { API_KEY } from "./env";

const holidayCountryCode = {
  jp: "japanese",
  us: "usa",
  spain: "spain",
  china: "china",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

export default class Calendar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      month: this.props.date.getMonth() + 1,
      year: this.props.date.getFullYear(),
      holidays: [],
      doublePressModal: false,
      singlePressModal: false,
      pressedDay: null,
      pressedDayPlans: {},
    };
    this.changeMonth = this.changeMonth.bind(this);
    this.goToToday = this.goToToday.bind(this);
    this.doublePressModalVisible = this.doublePressModalVisible.bind(this);
    this.singlePressModalVisible = this.singlePressModalVisible.bind(this);
  }

  componentWillMount() {
    if (this.props.holiday) {
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${
          holidayCountryCode[this.props.holiday]
        }@holiday.calendar.google.com/events?key=${API_KEY}`
      )
        .then(res => {
          const holidays = JSON.parse(res._bodyText).items;
          const holidaysArr = holidays.map(holiday => holiday.start.date);
          this.setState({ holidays: holidaysArr });
        })
        .catch(err => {
          console.warn(err);
        });
    }
  }

  goToToday() {
    const today = new Date();
    this.setState({
      month: today.getMonth() + 1,
      year: today.getFullYear(),
    });
  }

  changeMonth(newMonth) {
    if (newMonth === 13) {
      this.setState({ year: this.state.year + 1, month: 1 });
    } else if (newMonth === 0) {
      this.setState({ year: this.state.year - 1, month: 12 });
    } else {
      this.setState({ month: newMonth });
    }
  }

  doublePressModalVisible(obj) {
    this.setState({
      pressedDay: obj ? obj.day : null,
      pressedDayPlans: obj ? obj.plans : null,
      doublePressModal: !this.state.doublePressModal,
    });
  }

  singlePressModalVisible(obj) {
    this.setState({
      pressedDay: obj ? obj.day : null,
      pressedDayPlans: obj ? obj.plans : null,
      singlePressModal: !this.state.singlePressModal,
    });
  }

  render() {
    const SinglePressModal = this.props.singlePressModal;
    const DoublePressModal = this.props.doublePressModal;
    return (
      <View
        style={[
          styles.container,
          { width: this.props.width, height: this.props.height },
        ]}
      >
        <CalendarHeader
          month={this.state.month}
          changeMonth={this.changeMonth}
        />
        <CalendarBody
          {...this.state}
          plans={this.props.plans}
          today={this.props.date}
          doublePress={obj => this.doublePressModalVisible(obj)}
          singlePress={obj => this.singlePressModalVisible(obj)}
          dayCell={this.props.dayCell}
        />
        <Modal
          visible={this.state.doublePressModal}
          transparent={true}
          animationType="fade"
        >
          <DoublePressModal
            back={() => this.doublePressModalVisible()}
            day={this.state.pressedDay}
          />
        </Modal>
        <Modal
          visible={this.state.singlePressModal}
          transparent={true}
          animationType="fade"
        >
          <SinglePressModal
            back={() => this.singlePressModalVisible()}
            day={this.state.pressedDay}
            plans={this.state.pressedDayPlans}
          />
        </Modal>
      </View>
    );
  }
}
