import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import TypeWriter from "./../components/TypeWriter";
import Loader from "./../components/Loader";
import Banner from "../components/Banner";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const typeWriter = ["Welcome", "Login to read posts..."];

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <Loader />
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap h-64">
            <div className="p-2 w-full my-auto">
              <h1 className="text-2xl font-bold text-[#fff] hover:text-gray-500">
                <TypeWriter data={typeWriter} />
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Prepare the images array for the Banner component
  const images = posts.map((post) => ({
    id: post.$id,
    image: appwriteService.getFilePreview(post.featuredImage), // Use getFilePreview for the image
    ...post, // Spread the rest of the post data if needed
  }));

  return (
    <div className="w-full py-8">
      <Container>
        {/* Integrate the Banner component */}
        {/* <Banner images={images} speed={3000} /> */}

        {/* Display the posts in a grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full gap-20">
          {posts.map((post) => (
            <div key={post.$id} className="w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
