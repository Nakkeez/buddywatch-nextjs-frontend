import { Icon } from '@iconify/react';
import Image from 'next/image';

interface VideoItemProps {
  video: Video;
  onDelete: (id: number) => Promise<void>;
  onDownload: (id: number) => Promise<void>;
}

export default function VideoItem({
  video,
  onDelete,
  onDownload,
}: VideoItemProps) {
  const formattedDate: string = new Date(video.created_at).toLocaleString(
    'fi-FI'
  );

  return (
    <li className="my-4 flex max-w-xl rounded-lg p-4 shadow shadow-slate-500 dark:bg-indigo-900">
      {video.thumbnail && (
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={128}
          height={128}
        />
      )}
      <div className="ml-4 space-y-1.5">
        <a
          href={video.file}
          className="text-lg font-extrabold text-blue-600 hover:text-blue-900 dark:text-white dark:hover:text-gray-400"
        >
          {video.title}
        </a>
        <p>Created: {formattedDate}</p>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded-full p-2 text-blue-800 hover:bg-gray-300 dark:bg-white dark:hover:bg-gray-400"
            onClick={() => onDownload(video.id)}
          >
            <Icon icon="ic:round-download" width="32" height="32" />
          </button>
          <button
            className="rounded-full p-2 text-red-600 hover:bg-gray-300 dark:bg-white dark:hover:bg-gray-400"
            onClick={() => onDelete(video.id)}
          >
            <Icon
              icon="material-symbols:delete-outline"
              width="32"
              height="32"
            />
          </button>
        </div>
      </div>
    </li>
  );
}
