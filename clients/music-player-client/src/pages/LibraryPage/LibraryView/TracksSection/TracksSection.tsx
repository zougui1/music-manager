import { TrackList } from '../../../../components/TrackList';
import { ConsumeQuery } from '../../../../components/ConsumeQuery';
import { useQuery } from '../../../../hooks';

export const TracksSection = () => {
  const query = useQuery('musics', '/musics');

  return (
    <ConsumeQuery query={query}>
      <TrackList tracks={query.data as any} />
    </ConsumeQuery>
  );
}
