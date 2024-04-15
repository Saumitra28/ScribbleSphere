import React from 'react';
import appwriteService from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
  return (
    <div className="group relative w-64 h-72 flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden bg-[#191C27]">
      {/* Background and hover effect */}
      <div
  className="before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-bl from-[#242d39] via-[#10253c] to-[#000000] before:rounded-2xl before:transition-all before:duration-500 group-hover:before:scale-95 group-hover:before:rounded-b-2xl group-hover:before:transition-all group-hover:before:duration-500 before:content-['']"
>
</div>


      {/* Image with hover effects */}
      <div className="w-28 h-28 mt-8 rounded-full  z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-full rounded-full"
        />
      </div>

      {/* Title */}
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <span className="text-2xl font-semibold text-white">{title}</span>
      </div>

      {/* Link button */}
      <Link
        to={`/post/${$id}`}
        className="bg-[#354B59] px-4 py-1 text-slate-50 rounded-md z-10 hover:scale-125 transition-all duration-500 hover:bg-blue-500"
      >
        EXPLORE
      </Link>
    </div>
  );
}

export default PostCard;
