import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createBook, getGenres } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import { ButtonCatalogue } from "../styles/Catalogue";
import {
  ErrorsForm,
  FormContainer,
  FormInput,
  GenresContainer,
  H1Form,
} from "../styles/CreateBook";
// const imgVal = /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;

function validate(input) {
  const imgVal =
    /(https?:\/\/)?([\w])+\.{1}([a-zA-Z]{2,63})([\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/;
  const regName = new RegExp("[a-zA-Z][a-zA-Z ]+[a-zA-Z]$");
  const regNum = new RegExp("^[0-9]+$");
  let errors = {};

  if (!input.cover || !imgVal.test(input.cover)) {
    errors.cover = "Insert a valid link";
  }
  if (!input.title) errors.title = "Title is required";
  else if (!regName.test(input.title)) errors.title = "Enter a valid title";
  if (!input.authorName) errors.authorName = "Author is required";
  else if (!regName.test(input.authorName))
    errors.authorName = "Enter a valid author";
  if (!input.pages) errors.pages = "The number of pages is required";
  else if (input.pages > 20000 || input.pages < 1 || !regNum.test(input.pages))
    errors.pages = "Pages must be a number betwen 1 and 20000";
  if (input.publishedDate < 0 || input.publishedDate > 2023)
    errors.publishedDate = "Published Date must be a number between 0 and 2030";
  if (input.averageRating < 1 || input.averageRating > 5)
    errors.averageRating = "Average Rating must be a number between 1 and 5";
  return errors;
}
const CreateBook = () => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    // id,title,publishedDate,publisher,description,pages,averageRating,usersRating, cover, identifier,genres,author
    title: "",
    publishedDate: "",
    publisher: "",
    description: "",
    pages: "",
    averageRating: "",
    usersRating: "",
    cover: "",
    identifier: "",
    genreId: "",
    authorName: "",
  });

  useEffect(() => {
    setErrors(validate(input));
    if (!genres.length) {
      dispatch(getGenres());
    }
  }, [input]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log("ERRORS", errors);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log("input", input);
  }

  function handleauthor(e) {
    setInput({
      ...input,
      authorName: e.target.value,
    });
    console.log("ERRORS", errors);
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log("input", input);
  }

  function handleSelect(e) {
    e.preventDefault();
    console.log("Entré a select:", e.target.value);
    setInput({
      ...input,
      genreId: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        genreId: e.target.value,
      })
    );
  }

  /*   function handleCheck(e) {
    if (e.target.checked) {
      setInput({
        ...input,
        genres: [...input.genres, e.target.value],
      });

      console.log("INPUTCHECK", input);
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
      console.log(errors);
    } else if (!e.target.checked) {
      setInput({
        ...input,
        genres: input.genres.filter((t) => t !== e.target.value),
      });

      console.log("INPUTCHECK", input);
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  } */

  function handleSubmit(e) {
    e.preventDefault();
    setErrors(
      validate({
        ...input,
      })
    );
    let errorsLength = Object.keys(errors).length;
    console.log("errorsLength", errorsLength);
    if (errorsLength > 0) {
      console.log("ErrorsSubmit", errors);
      alert("One or more fields have errors, please check them");
    } else {
      console.log("ErrorsSubmit", errors);
      dispatch(createBook(input));
      alert("The Book has been created");
      setInput({
        title: "",
        publishedDate: "",
        publisher: "",
        description: "",
        pages: "",
        averageRating: "",
        usersRating: "",
        cover: "",
        identifier: "",
        genreId: "",
        authorName: "",
      });
      history.push("/home");
    }
  }

  return (
    <div>
      <NavBar />

      <H1Form>Add a new Book</H1Form>

      <FormContainer>
        <div>
          <div>
            <div>
              <div>
                <FormInput
                  type="text"
                  value={input.title}
                  name="title"
                  placeholder="Insert Title"
                  onChange={(e) => handleChange(e)}
                />
                {errors.title && <ErrorsForm>{errors.title}</ErrorsForm>}
              </div>
              <div>
                <FormInput
                  type="text"
                  value={input.authorName}
                  placeholder="Insert Author"
                  name="authorName"
                  onChange={(e) => handleChange(e)}
                />

                {errors.authorName && (
                  <ErrorsForm>{errors.authorName}</ErrorsForm>
                )}
              </div>
              <div>
                <FormInput
                  type="text"
                  value={input.description}
                  name="description"
                  placeholder="Insert Description"
                  onChange={(e) => handleChange(e)}
                />
                {errors.Description && (
                  <ErrorsForm>{errors.description}</ErrorsForm>
                )}
              </div>
              <div>
                <FormInput
                  type="number"
                  value={input.publishedDate}
                  name="publishedDate"
                  min={0}
                  max={2023}
                  placeholder="Insert publishedDate"
                  onChange={handleChange}
                />
                {errors.publishedDate && (
                  <ErrorsForm>{errors.publishedDate}</ErrorsForm>
                )}
              </div>
              <div>
                <FormInput
                  type="text"
                  value={input.publisher}
                  name="publisher"
                  placeholder="Insert Publisher"
                  onChange={(e) => handleChange(e)}
                />
                {errors.publisher && (
                  <ErrorsForm>{errors.publisher}</ErrorsForm>
                )}
              </div>
              <div>
                <FormInput
                  type="number"
                  max={20000}
                  min={1}
                  value={input.pages}
                  name="pages"
                  placeholder="Insert Pages"
                  onChange={(e) => handleChange(e)}
                />
                {errors.pages && <ErrorsForm>{errors.pages}</ErrorsForm>}
              </div>
              <div>
                <FormInput
                  type="number"
                  placeholder="Insert averageRating"
                  value={input.averageRating}
                  min={1}
                  max={5}
                  name="averageRating"
                  onChange={(e) => handleChange(e)}
                />
                {errors.averageRating && (
                  <ErrorsForm>{errors.averageRating}</ErrorsForm>
                )}
              </div>
              <div>
                <FormInput
                  type="text"
                  placeholder="Insert a link to a Cover image"
                  value={input.cover}
                  name="cover"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              {errors.cover ? (
                <div>
                  <ErrorsForm>{errors.cover}</ErrorsForm>
                  <img
                    src="https://www.comunidadbaratz.com/wp-content/uploads/Instrucciones-a-tener-en-cuenta-sobre-como-se-abre-un-libro-nuevo.jpg"
                    width={"100px"}
                    height={"100px"}
                    alt="BookCover"
                  />
                </div>
              ) : (
                <div>
                  <br />
                  <br />
                  <ul>
                    The chosen image is:
                    <li>
                      <img
                        src={input.cover}
                        alt="img not found"
                        width={"100px"}
                        height={"100px"}
                      />
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <label>Select Genre:</label>
          {errors.genreId && <ErrorsForm>{errors.genreId}</ErrorsForm>}
          <br />
          <GenresContainer>
            <select onChange={(e) => handleSelect(e)}>
              {genres.map((el) => {
                return (
                  <option name="genreId" value={el.id} key={el.id}>
                    {el.name}
                  </option>
                );
              })}
            </select>
          </GenresContainer>
        </div>
        <div>
          <ButtonCatalogue type="submit" onClick={(e) => handleSubmit(e)}>
            Add New Book
          </ButtonCatalogue>
        </div>
      </FormContainer>
    </div>
  );
};

export default CreateBook;
