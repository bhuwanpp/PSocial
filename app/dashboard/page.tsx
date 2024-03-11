"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocalStore } from "../store/hookStore";

export default function Page() {
  const [posts, setPosts] = useState<any>("");
  const { localStorePost, setLocalStorePost } = useLocalStore();
  const [like, setLikes] = useState<any>({});
  const [user, showUser] = useState(false);

  const [file, setFile] = useState<any>();
  const [fileLocal, setFileLocal] = useState<any>([]);
  const [imageShow, setImageShow] = useState<any>(true);
  const handleFile = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(file);
      setImageShow(true);
    }
  };
  const handleUser = () => {
    showUser((prevShow) => !prevShow);
  };
  const handlePost = () => {
    const newPosts = [...localStorePost, posts];
    const newImages = [...fileLocal, file];
    localStorage.setItem("posts", JSON.stringify(newPosts));
    localStorage.setItem("files", JSON.stringify(newImages));
    setLocalStorePost(newPosts);
    setFileLocal(newImages);
    setImageShow(false);
    setPosts("");
  };
  const handleLike = (postId: any) => {
    let tempLikes = { ...like };
    tempLikes[postId] = (tempLikes[postId] || 0) + 1;
    setLikes(tempLikes);
    localStorage.setItem("likes", JSON.stringify(tempLikes));
  };

  const handleEnter = (e: any) => {
    if (e.key === "Enter") {
      handlePost();
    }
  };

  useEffect(() => {
    const storePosts = localStorage.getItem("posts");
    const storeLikes = localStorage.getItem("likes");
    const storeFile = localStorage.getItem("files");
    if (storePosts && storeLikes && storeFile) {
      setLocalStorePost(JSON.parse(storePosts));
      setLikes(JSON.parse(storeLikes));
      setFileLocal(JSON.parse(storeFile));
    }
  }, []);
  // function clearLocalStorage() {
  //   localStorage.clear();
  // }
  // if (typeof window !== "undefined") {
  //   window.addEventListener("beforeunload", clearLocalStorage);
  // }

  return (
    <div>
      <div className="nav flex justify-between px-10 py-5">
        <div className="left">
          <Link href="/dashboard">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-20 rounded-full"
            />
          </Link>
        </div>
        <div className="right relative">
          <button className="user" onClick={handleUser}>
            <img
              src="/images/user.png"
              alt="user"
              className="rounded-full w-12"
            />
          </button>
          {user && (
            <div className="absolute right-2 bg-blue-200 w-32 rounded-md h-20 px-2 py-2">
              <Link
                href="/dashboard/yourPosts "
                className=" hover:bg-blue-200 px-2 py-1 rounded-md"
              >
                Your Posts
              </Link>
              <br />
              <Link href="/">
                <button className="hover:bg-blue-200 px-2 py-1 rounded-md">
                  Log out{" "}
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* postInput */}
      <div className="postInput text-center">
        <input
          type="text"
          onKeyDown={handleEnter}
          value={posts}
          onChange={(e) => setPosts(e.target.value)}
          className="border p-1 border-black w-96 h-10  outline-none rounded-sm"
        />
        <button className="">
          <input
            type="file"
            onChange={handleFile}
            name="upload"
            multiple
            accept="image/*,.pdf"
          />
          <i className="fa-solid fa-plus px-4 cursor-pointer "></i>
        </button>
        <button
          onClick={handlePost}
          className="ml-2 px-2 py-2 bg-blue-200 rounded-md "
        >
          Post
        </button>
        {imageShow && (
          <img
            src={file}
            alt=""
            className=" w-[800px] text-center pl-52 pt-10"
          />
        )}
      </div>
      {/* your posts  */}
      <div className="posts px-20 py-20">
        <p className="pb-2">Posts all </p>

        <h5 className=" w-auto px-2 py-2">
          {/* post  */}
          {localStorePost &&
            localStorePost.map((post: string, index: any) => (
              <h4
                key={index}
                className="mb-5  bg-blue-200 px-2 h-auto pb-5 hover:bg-blue-200"
              >
                {post}

                {fileLocal[index] && (
                  <img
                    src={fileLocal[index]}
                    alt="Post"
                    className="max-w-full"
                  />
                )}
                {/* like */}
                <p
                  className="mt-5 w-full cursor-pointer"
                  onClick={() => handleLike(post)}
                >
                  Likes: {like[post] || 0}
                </p>

                {/* image */}
              </h4>
            ))}
        </h5>
      </div>
    </div>
  );
}
