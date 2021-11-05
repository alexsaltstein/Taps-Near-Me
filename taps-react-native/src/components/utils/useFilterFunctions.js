import { useRecoilState } from 'recoil';
import { filterData } from '../../atoms';

export default useFilter = () => {
  const [filter, setLocalFilter] = useRecoilState(filterData);

  const setFilter = (filter) => {
    setLocalFilter(filter)
  }

  return [filter, setFilter];
}