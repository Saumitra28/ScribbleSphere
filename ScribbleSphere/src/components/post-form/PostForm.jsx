import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("Ye Hai user Data create honey se pehle ka: ", userData);
  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      console.log("UserData just above the createPost: ", userData);
      console.log("UserId just above wali: ", userData.$id);
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log("UserId inside if block: ", userData.$id);

        const { title, slug, content, featuredImage, status } = data;

        // Get user ID from userData
        const userid = userData.$id;

        // Create an object with individual properties
        const postData = {
          title,
          slug,
          content,
          featuredImage,
          status,
          userid, // Ensure the property name matches the function parameter in config.js
        };
        console.log("Post DATA: ", postData);

        // Call createPost with the individual properties
        const dbPost = await appwriteService.createPost(postData);

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap text-[#fff]"
    >
      <div className="w-2/3 px-4">
        <div className="mb-16">
          <Input
            label="Title :"
            className="mb-4"
            style={{ padding: '30px' }}
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-16">
          <Input
            label="Slug :"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
            style={{ padding: '30px' }}
          />
        </div>
        <div className="mt-8">
          <RTE
            label="Content :"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
      </div>
      <div className="w-1/3 px-4">
        <div className="mb-4">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif image/PNG"
            style={{ padding: '16px' }}
            {...register("image", { required: !post })}
          />
        </div>
        <div className="">
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        </div>
       <div className="mt-8">
       <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
       </div>
      <div className="mt-4">
      <Button
          type="submit"
          className="w-full mb-11"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
      </div>
    </form>
  );
}
