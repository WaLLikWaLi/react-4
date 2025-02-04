import { Formik, Form, Field } from "formik";
import { toast } from "react-hot-toast";
import css from "./SearchBar.module.css";
export default function SearchBar({ setParam }) {
  return (
    <header>
      {" "}
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, actions) => {
          if (!values.query) {
            return toast.error("Wrong params!");
          }
          setParam(values.query);
          actions.resetForm();
        }}>
        <Form>
          <Field
            name="query"
            type="text"
            placeholder="Search images and photos"
          />
          <button type="submit" name="query" className={css.searchbtn}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
