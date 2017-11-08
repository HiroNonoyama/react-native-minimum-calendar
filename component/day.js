import React, { PureComponent } from "react";

export default class Day extends PureComponent {
  constructor(props) {
    super(props);
    this.tapCount = 0;
    this.handleOnPress = this.handleOnPress.bind(this);
  }

  handleOnPress() {
    if (!this.tapCount) {
      ++this.tapCount;
      setTimeout(() => {
        this.props.singlePress({
          day: `${this.props.year}/${this.props.month}/${this.props.day}`,
          plans: this.props.plans
        });
        this.tapCount = 0;
      }, 300);
    } else {
      this.props.doublePress({
        day: `${this.props.year}/${this.props.month}/${this.props.day}`,
        plans: this.props.plans
      });
      this.props.singlePress();
      return;
    }
  }

  render() {
    const DayCell = this.props.dayCell;
    return (
      <DayCell
        day={this.props.day}
        isToday={this.props.isToday}
        handleOnPress={this.handleOnPress}
        isHoliday={this.props.isHoliday}
        plans={this.props.plans}
      />
    );
  }
}
