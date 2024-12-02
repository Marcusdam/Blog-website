import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost, fetchPost, updatePost } from "../redux/postSlice";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.post);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPost(postId));
  }, [dispatch, postId]);

  const post = posts.find((p) => p.id === Number(postId));

  const handleDelete = () => {
    dispatch(deletePost(postId));
    navigate("/");
  };

  const handleUpdate = () => {
    navigate(`/edit/${postId}`);
  };

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error loading post: {error}</p>;

  return (
    <div className="container max-w-[1240px]  mx-auto px-4 sm:px-8 text-balance mt-28">
      {post ? (
        <div>
          {post.image && (
            <img src={post.image} alt="postImg" className="w-full" />
          )}
          {post.author && (
            <div className="p-2 flex items-center ">
              {post.author.image && (
                <img
                  src={post.author.image}
                  alt="Author"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <div className="text-gray-500 pl-2">
                <p>
                  {" "}
                  <b>Author:</b> {post.author.username}
                </p>
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          )}
          <div>
            {isAuthenticated &&
            user &&
            post.author &&
            user.id === post.author.id ? (
              <div className="p-2">
                <button
                  onClick={handleUpdate}
                  className="py-1  text-blue-600 rounded"
                >
                  <FiEdit size={30} />
                </button>
                <button
                  onClick={handleDelete}
                  className="py-1 px-4 text-red-600 rounded"
                >
                  <RiDeleteBin6Line size={30} />
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
          <h1 className="font-bold text-xl">{post.title}</h1>
          <p className="text-justify pt-4">{post.content}</p>
        </div>
      ) : (
        "No Post Found"
      )}
    </div>
  );
};

export default SinglePost;
