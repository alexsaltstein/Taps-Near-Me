import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { dateOfBirthState } from '../../atoms';

export default useDateOfBirth = () => {
 
  const [dateOfBirth, setDateOfBirth] = useRecoilState(dateOfBirthState);

  useEffect(() => {
    const asyncSetter = async () => {
     const persistDateOfBirth = await AsyncStorage.getItem('dateOfBirth');
      if(persistDateOfBirth){
        setDateOfBirth(persistDateOfBirth);
      }
    }
    asyncSetter();
  }, [AsyncStorage, setDateOfBirth])

  const persistSetDateOfBirth = (newDateOfBirth) => {
    AsyncStorage.setItem('dateOfBirth', newDateOfBirth);
    setDateOfBirth(newDateOfBirth);
  }

  return [dateOfBirth, persistSetDateOfBirth];
}