import { IconBaseProps } from 'react-icons';

declare module 'react-icons' {
  interface IconBaseProps {
    className?: string;
    style?: React.CSSProperties;
  }
}
