import {getAuth} from 'firebase/auth';
import {serverTimestamp} from 'firebase/database';
import {loadData, update} from '../firebase';
import {guid} from '../utils';

const createNewWorld = async () => {
  const worldGuid = guid();

  const {gameConfig, tileTypes} = await loadData(['gameConfig', 'tileTypes']);

  console.log(
    await update({
      [`worlds/${worldGuid}`]: {
        lastEdited: serverTimestamp(),
        owners: [getAuth().currentUser.email],
        world: {},
        cursors: {},
        gameConfig,
        tileTypes,
      },
    })
  );
};

export const MyWorlds = () => {
  let a;
  return (
    <>
      <button onClick={createNewWorld}>Create a New World</button>
    </>
  );
};
