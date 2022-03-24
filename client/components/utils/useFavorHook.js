import { useSelector } from "react-redux";

const useFavor = () => {
  const favor =
    useSelector((state) => {
      return state.favor;
    }) || [];
  return favor;
};

export default useFavor;
