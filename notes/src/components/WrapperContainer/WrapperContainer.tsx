import React, {ReactNode, ReactElement, CSSProperties} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Platform,
} from 'react-native';

interface WrapperContainerProps {
  children: ReactNode;
  style?: CSSProperties;
}

function WrapperContainer({
  children,
  style = {},
}: WrapperContainerProps): ReactElement {
  // Set a custom status bar background color
  StatusBar.setBarStyle('dark-content');

  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: StatusBar.currentHeight || 0,
  },
  view: {
    flex: 1,
  },
});

export default WrapperContainer;
