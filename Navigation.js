import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Home from './screens/Home';


const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator  initialRouteName="Welcome" >
      <Stack.Screen options={{headerShown:false}}  name="Welcome"  component={Welcome} />
      <Stack.Screen options={{headerShown:false}}  name="Home"  component={Home} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;