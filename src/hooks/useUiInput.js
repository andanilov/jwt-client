import { useRef, useState } from 'react';

export function useUiInput({ stopContent }) {
  const [value, setValue] = useState();

  const checkedContent = (content) => stopContent
    ? content.replace(stopContent, '')
    : content;  

  const onChange = (event) => setValue(checkedContent(event.target.value));

  return { value, onChange, setValue };
}
