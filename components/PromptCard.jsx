"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000); // Reset copied state after 3 seconds
  };

  // Check if post.creator and post.creator.image exist before rendering
  if (!post.creator || !post.creator.image) {
    return null; // or render a placeholder
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy_icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="mt-3 my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 pt-3 flex justify-end gap-4">
          <button
            onClick={() => handleEdit && handleEdit(post)}
            className="font-inter text-sm green_gradient cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete && handleDelete(post)}
            className="font-inter text-sm text-red-300 cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
