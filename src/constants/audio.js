import { getCurrentOnAirShow } from '../utils/scheduleHelper';

export const LIVE_STREAM_URL = 'https://city1051-atunwadigital.streamguys1.com/city1051';

const initialActiveShow = getCurrentOnAirShow();

export const DEFAULT_LIVE_TRACK = {
  id: 'area_fm_live',
  title: '93.5 Area FM Live',
  artist: 'One Voice, Every Area',
  showName: initialActiveShow.name || initialActiveShow.title || 'Midday Vibes',
  presenterName: initialActiveShow.dj || 'Simi Ogunleye',
  image: initialActiveShow.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  audioUrl: LIVE_STREAM_URL,
  isLive: true
};
