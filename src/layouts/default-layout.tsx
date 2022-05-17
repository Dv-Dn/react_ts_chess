import { RNotification } from '@/components/base';
import { cssVariables } from '@/styles/rootVariables';

type Props = {
  children: JSX.Element | JSX.Element[];
};
export const DefaultLayout = ({ children }: Props) => {
  return (
    <div className="layout_container" style={cssVariables}>
      <div className="layout_content">{children}</div>
      <RNotification />
    </div>
  );
};
