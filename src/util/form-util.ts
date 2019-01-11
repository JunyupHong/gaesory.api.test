import firebase from 'firebase';
import { ObtainBoardData } from '@/class/Board';

// ??? FormUtil 문제가 많댜ㅣㅣㅣㅣㅣㅣ

// data와 obtainBoardData를 비교해서 data에 없는 key를 찾아서 default값으로 초기화해서 리턴해주어야한다!
const FormUtil = {
  makeDocToObtainBoardData(
    data: firebase.firestore.DocumentData | undefined,
  ): ObtainBoardData {
    // type obtainBoardkeys = keyof ObtainBoardData;
    // let obtainBoardData: obtainBoardkeys;
    // return Object.assign(obtainBoardData, data);
    const obtainBoardData = {} as ObtainBoardData;
    return Object.assign(obtainBoardData, data);
  },
};
export default FormUtil;
