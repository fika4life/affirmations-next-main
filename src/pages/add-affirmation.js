import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { toast } from "react-toastify";

// import { useNavigate } from 'react-router-dom';

export default function AddAffirmation() {
  // let navigate = useNavigate();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //handle submit
    if (text.length == 0) {
      notifyError("Please type in an affirmation");
    } else {
      createAffirmation();
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const notifySuccess = () =>
    toast("Affirmation added", {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 3000,
      type: "success",
    });

  const notifyError = (error) =>
    toast(error, {
      position: "top-center",
      hideProgressBar: true,
      autoClose: 3000,
      type: "error",
    });

  async function createAffirmation() {
    try {
      const { data, error, status } = await supabase
        .from("affirmations")
        .insert({ text: text })
        .select();

      if (error) {
        console.log(status);
        throw error;
      }

      if (data) {
        setText("");
        notifySuccess();
      }
    } catch (error) {
      console.log(error.message);
      notifyError(error.message);
    }
  }
  return (
    <div className="max-w-lg mx-auto mt-24">
      <h2 className="text-3xl font-bold mb-24 text-center">
        Add new affirmation
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="form-control w-full max-w-lg">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Affirmation</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24 max-w-lg mb-16"
              placeholder="An inspiring affirmation..."
              required
              onChange={handleInputChange}
              value={text}
              name="text"
              id="text"
            ></textarea>
          </div>
        </div>

        <button type="submit" className="btn  w-full max-w-xs">
          Submit
        </button>
      </form>
    </div>
  );
}
