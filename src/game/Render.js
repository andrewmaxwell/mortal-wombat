import {getBackground} from '../utils/getBackground';

const scale = 48;

const Viewport = ({you, children}) => {
  const cx = innerWidth / 2 - you.x * scale;
  const cy = innerHeight / 2 - you.y * scale;
  return (
    <div style={{transform: `translate(${cx}px,${cy}px)`}}>{children}</div>
  );
};

const Blocks = ({world}) =>
  Object.entries(world).map(([key, {x, y, type}]) => (
    <div
      key={key}
      className="tile"
      style={{
        transform: `translate(${x * scale}px, ${y * scale}px)`,
        background: getBackground(type),
      }}
    />
  ));

const You = ({you, typeIndex}) => {
  const wombatAngle = Math.atan2(you.dirY, you.dirX) + Math.PI;
  const wombatFlip =
    wombatAngle >= 0.5 * Math.PI && wombatAngle <= 1.5 * Math.PI;
  return (
    <div
      className="tile"
      style={{
        transform: `
      translate(${you.x * scale}px,${you.y * scale}px)
      rotate(${wombatAngle}rad)
      ${wombatFlip ? 'scaleY(-1)' : ''}`,
        background: getBackground(typeIndex.w),
      }}
    />
  );
};

const Bar = ({value, maxValue, color}) => (
  <div className="bar">
    <div style={{background: color, width: (100 * value) / maxValue + '%'}}>
      {Math.floor(value)}
    </div>
  </div>
);

const Hud = ({health, maxHealth, poop, maxPoop, jewels, typeIndex}) =>
  health > 0 ? (
    <div className="hud">
      <Bar
        value={health}
        maxValue={maxHealth}
        color={health > 30 ? 'green' : 'red'}
      />
      <Bar value={poop} maxValue={maxPoop} color="saddleBrown" />
      <div className="jewelCounter">
        {jewels} <img src={typeIndex.j.image} />
      </div>
    </div>
  ) : (
    <div className="youDead">
      <h1>you dead</h1>
      <h2>press R to try again</h2>
    </div>
  );

export const Render = ({
  you,
  world,
  health,
  maxHealth,
  poop,
  maxPoop,
  jewels,
  typeIndex,
}) => (
  <>
    <Viewport you={you}>
      <Blocks world={world} />
      <You you={you} typeIndex={typeIndex} />
    </Viewport>

    <Hud {...{health, maxHealth, poop, maxPoop, jewels, typeIndex}} />
  </>
);
