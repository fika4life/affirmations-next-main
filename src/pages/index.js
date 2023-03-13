import { supabase } from "../../lib/supabaseClient";

import { useState, useEffect, use } from "react";

export default function Home({ data }) {
  const [affirmation, setAffirmation] = useState("");
  const [affirmations, setAffirmations] = useState(data);

  useEffect(() => {
    getNewAffirmation();
  });

  const getNewAffirmation = () => {
    const nrAffirmations = affirmations.length;
    const randomNumber = Math.floor(Math.random() * nrAffirmations);
    setAffirmation(affirmations[randomNumber]);
  };
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-xl font-bold mb-24">{affirmation.text}</h1>

            <button className="btn btn-primary" onClick={getNewAffirmation}>
              Get new affirmation
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data } = await supabase.from("affirmations").select();

  return {
    props: { data }, // will be passed to the page component as props
  };
}
