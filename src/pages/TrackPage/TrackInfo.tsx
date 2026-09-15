import { Link } from 'react-router-dom';

interface TrackInfoProps {
  title: string;
  artwork: string;
  user: {
    id: string;
    handle: string;
  };
}
export const TrackInfo = (props: TrackInfoProps) => {
  const { title, artwork, user } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <img src={artwork} alt={title} className="w-72 h-72 rounded-lg object-cover" />

      <h1 className="mt-8 text-3xl font-bold">{title}</h1>

      <Link to={`/artist/${user.id}`} className="cursor-pointer mt-2 text-lg">
        {user.handle}
      </Link>
    </div>
  );
};
