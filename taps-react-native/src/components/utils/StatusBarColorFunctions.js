import { useRecoilState } from 'recoil';
import { statusBarColor, bottomBarColor } from '../../atoms';

const setStatusBarColor = () => {
  const [statusColor, setStatusColor] = useRecoilState(statusBarColor);
  const [bottomColor, setBottomColor] = useRecoilState(bottomBarColor);

  const setColor = (top, bottom) => {
    if (top && bottom) {
      setStatusColor(top);
      setBottomColor(bottom);
    } else {
      setStatusColor(top);
      setBottomColor(top);
    }
  }
  return [setColor];
}

export default setStatusBarColor;