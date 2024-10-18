import React from 'react';
import Tooltip from '@mui/material/Tooltip';

interface TooltipComponentProps {
  text: string;
  maxCharacters: number;
}

const TooltipComponent: React.FC<TooltipComponentProps> = ({ text, maxCharacters }) => {
  return (
    <Tooltip title={text.length > maxCharacters ? text : ''}>
      <span>
        {text.length > maxCharacters ? `${text.substring(0, maxCharacters)}...` : text}
      </span>
    </Tooltip>
  );
};

export default TooltipComponent;
