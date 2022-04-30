import {useEffect, useRef} from 'react';

export const AutoHeightText = (props) => {
  const ref = useRef();

  useEffect(() => {
    const s = ref.current.style;
    s.transition = 'all 0s';
    s.height = '1px';
    s.height = ref.current.scrollHeight + 'px';
  });

  return <textarea {...props} ref={ref} />;
};
