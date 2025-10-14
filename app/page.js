import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero>
        <section className="h-[300vh]">
          <div className="container mx-auto p-8">
            <h2 className="text-4xl font-bold mb-8">Your Content Here</h2>
            <p>This section is now outside the SplitHeader component but still benefits from the smooth scrolling effect.</p>
          </div>
        </section>
      </Hero>

    </>
  );
}
