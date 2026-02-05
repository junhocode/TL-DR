export interface Track {
  id: string;
  title: string;
  src: string;
}

export interface TrackMenuProps {
  tracks: Track[];
  onTrackClick: (id: string, src: string) => void;
}