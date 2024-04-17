import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import TypeWriter from "./../components/TypeWriter";
import Loader from "./../components/Loader";
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const userData = useSelector((state) => state.auth.userData);
    const userName = userData ? userData.name : null;

    const firstName = userName ? userName.split(" ")[0] : null;

    useEffect(() => {
        appwriteService.getPosts()
            .then(posts => {
                if (posts) {
                    setPosts(posts.documents);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    // Case: Loading state
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <Loader />
                </Container>
            </div>
        );
    }

    // Case: No posts and user is logged in
    if (posts.length === 0 && firstName) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap h-64">
                        <div className="p-2 w-full my-auto">
                            <h1 className="text-2xl font-bold text-[#fff] hover:text-gray-500">
                                <TypeWriter data={["Welcome  " + firstName, "Currently No active posts..."]} />
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Case: No posts and user is not logged in
    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div class="flex flex-wrap h-64">
                        <div className="p-2 w-full my-auto">
                            <h1 className="text-2xl font-bold text-[#fff] hover:text-gray-500">
                                <TypeWriter data={["Welcome", "Login to read posts..."]} />
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Case: There are posts
    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 w-full gap-20">
                    {posts.map(post => (
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
