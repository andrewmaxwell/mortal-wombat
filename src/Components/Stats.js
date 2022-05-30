import {memo} from 'react';
import {indexBy, objToArr} from '../utils';
import {timeAgo} from '../utils/timeAgo';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

const countBy = (arr, func) =>
  arr.reduce((res, el) => {
    const key = func(el);
    res[key] = (res[key] || 0) + 1;
    return res;
  }, {});

const SubTable = ({heading, data, getLabel}) => (
  <>
    <tr>
      <td>
        <br />
      </td>
    </tr>
    <tr>
      <th>{heading}</th>
    </tr>
    {Object.entries(data)
      .sort((a, b) => b[1] - a[1])
      .map(([key, count]) => (
        <tr key={key}>
          <td>{getLabel ? getLabel(key) : key}</td>
          <td>{count}</td>
        </tr>
      ))}
  </>
);

const stats = ({world, tileTypes, userIndex}) => {
  const tileTypeIndex = indexBy((t) => t.id, objToArr(tileTypes));
  const tiles = Object.values(world);
  return (
    <table>
      <tbody>
        <tr>
          <th>Total Tiles</th>
          <td>{tiles.length}</td>
        </tr>

        <SubTable
          heading="By Person"
          data={countBy(tiles, (t) => t.user)}
          getLabel={(key) => capitalize(userIndex[key]?.name || '???')}
        />

        <SubTable
          heading="By Tile Type"
          data={countBy(tiles, (t) => t.tileType)}
          getLabel={(key) => capitalize(tileTypeIndex[key]?.label || '???')}
        />

        <SubTable
          heading="By Date"
          data={countBy(tiles, (t) =>
            t.tstamp ? timeAgo(Date.now() - t.tstamp) : '???'
          )}
        />
      </tbody>
    </table>
  );
};

export const Stats = memo(stats);
