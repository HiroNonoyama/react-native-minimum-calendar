## React Native Minimum Calendar
This package provides a simple calendar component which you can extend.

usage example
```jsx
import React from 'react';
import { View, Dimension } from 'react-native';
import Calendar from 'react-native-minimum-calendar';
import DayCell from '<path to component you define>';
import AddPlanModal from '<path to comopent you define>';
import CheckPlanModal from '<path to comopent you define>';


export default App extends React.PureComponent {
  render() {
      const today = new Date();
      return (
        <View style={styles.container}>
          <Calendar
            date={this.state.date} // first show up day
            dayCell={DayCell} // custome day cell
            doublePressModal={AddPlanModal} // modal content when user tap the day cell
            height={515} // whole calendar component height
            holiday={"jp"} // if you wanna get holiday, put contry code here
            plans={this.state.plandata} // formatted plan data
            ref="Calendar" // you can make a button to jump to today
            singlePressModal={CheckPlanModal} // modal content when user double tap the day cell
            width={Dimension.get('window').width} // whole calendar component width
          />
          <View>
            <TouchableOpacity
              onPress={() => this.refs.Calendar.goToToday()} // you can make jump button like this
            >
              <Text>Today</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
```

I will add usage of this later more

