import React from "react";
import { View, StyleSheet } from "react-native";
import Day from "./day";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const isToday = (today, year, month, date) => {
  const today_year = today.getFullYear();
  const today_month = today.getMonth() + 1;
  const today_date = today.getDate();
  if (year === today_year && month === today_month && date === today_date) {
    return true;
  }
  return false;
};

export default function Week(props) {
  return props.days.map((day, index) => {
    const plans =
      props.plans[`${props.year}-${props.month}-${day > 9 ? "" : 0}${day}`];
    return (
      <View key={index} style={styles.container}>
        <Day
          dayCell={props.dayCell}
          doublePress={obj => props.doublePress(obj)}
          singlePress={obj => props.singlePress(obj)}
          isToday={isToday(props.today, props.year, props.month, day)}
          day={day}
          month={props.month}
          year={props.year}
          plans={plans ? plans : null}
          isHoliday={props.holidays.indexOf(
            `${props.year}-${props.month > 9
              ? props.month
              : "0" + String(props.month)}-${day > 9 ? day : "0" + String(day)}`
          )}
        />
      </View>
    );
  });
}
