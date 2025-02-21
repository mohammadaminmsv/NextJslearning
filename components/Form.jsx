

import React from "react";
import Link from 'next/link'

const Form = ({ type, post, setPost, submiting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left blue_gradient">{type} Post</h1>

      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="text-base text-gray-700 font-satoshi font-semibold">
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="write your prompt here"
            required
            className="form_textarea"
          ></textarea>
        </label>

        <label>
          <span className="text-base text-gray-700 font-satoshi font-semibold">
            Tag
            <span className="font-normal">(#product ,#idea)</span>
          </span>

          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" classNametext-gray-500 text-sm>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submiting}
            className="bg-primary-orange px-5 py-1.5 text-sm rounded-full"
          >
            {submiting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
