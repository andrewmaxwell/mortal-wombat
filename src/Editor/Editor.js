import {useEffect, useState} from 'react';

export const Editor = () => {
  const [level, setLevel] = useState(
    `g
   g       X
  gggg
 ggggggggggggggg  ggggggg
gggggggggggggggggggggggggggg
gg ggg gggg ggggg ggg ggg










                       bbbbbbbbb
                    bbbbb
























              mmmmmmmm
                mmmm

  `.trim()
  );

  useEffect(() => {
    location.hash = encodeURIComponent(JSON.stringify({level}));
  }, [level]);

  return (
    <div style={{padding: 5}}>
      <h3 style={{margin: 0}}>World Editor</h3>
      <textarea
        spellCheck="false"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{width: '100%', height: 300}}
      />
    </div>
  );
};
