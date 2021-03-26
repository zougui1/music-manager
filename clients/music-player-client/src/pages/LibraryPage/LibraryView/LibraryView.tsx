import { SectionSwitch } from './SectionSwitch';
import { Tabs } from '../libraryPageData';

export const LibraryView: React.FC<LibraryViewProps> = ({ tab }) => {
  return (
    <div className="view">
      <SectionSwitch tab={tab} />
    </div>
  );
};

export interface LibraryViewProps {
  tab: Tabs;
}
