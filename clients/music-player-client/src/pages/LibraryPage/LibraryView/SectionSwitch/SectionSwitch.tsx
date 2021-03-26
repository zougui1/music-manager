import { AlbumsSection } from '../AlbumsSection';
import { ArtistsSection } from '../ArtistsSection';
import { PlaylistsSection } from '../PlaylistsSection';
import { TracksSection } from '../TracksSection';
import { Tabs } from '../../libraryPageData';

export const SectionSwitch: React.FC<SectionSwitchProps> = ({ tab }) => {
  switch (tab) {
    case Tabs.albums: return <AlbumsSection />;
    case Tabs.artists: return <ArtistsSection />;
    case Tabs.tracks: return <TracksSection />;
    default: return <PlaylistsSection />;
  }
}

export interface SectionSwitchProps {
  tab: Tabs;
}
