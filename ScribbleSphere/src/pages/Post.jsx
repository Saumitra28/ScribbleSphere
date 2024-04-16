import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userid === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 text-[#fff]">
            <Container>
                <div className="w-full flex flex-col lg:flex-row gap-4 mb-4 relative border rounded-xl p-4 bg-gray-800">
                    <div className="flex-shrink-0 lg:w-1/2 ">
                      <div className="max-w-96 max-h-96 rounded-lg mx-auto">
                      <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full max-h-[28rem] object-full"
                        />
                      </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col justify-evenly">
                        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

                        <div
                            className="browser-css max-h-96 overflow-y-auto mt-2"
                        >
                            {parse(post.content)}
                        </div>

                        {isAuthor && (
                            <div className="mt-2 flex justify-center space-x-0">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgcolor="bg-green-500" className="ml-36 -mr-20">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgcolor="bg-red-500" className="mr-20 -ml-12" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
