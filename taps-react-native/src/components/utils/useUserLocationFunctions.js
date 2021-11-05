import { useRecoilState } from 'recoil';
import { userLocation } from '../../atoms';

export default useUserLocation = () => {
  const [location, setLocation] = useRecoilState(userLocation);

  const setUserLocation = (lat, lng) => {
    setLocation({
      lat,
      lng
    })
  }

  return [location, setUserLocation];
}