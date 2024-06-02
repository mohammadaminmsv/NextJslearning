import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="max_md:hidden" />
        <span className="orange_gradient text-center">AI-Powerd Prompts</span>
      </h1>
      <p className="desc text-center">
        promptopia is an open-source AI Prompting toll for modern world to
        discover , create and share creative Prompts
      </p>

      {/* feed */}
      <Feed/>
    </section>
  );
};

export default Home;
