import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import "./CardMenu.css";

import CreateReview from "./CreateReview.jsx";
import {
  cleanBookDetail,
  addFavorite,
  addReaded,
  addReading,
  deleteFavorite,
  deleteReading,
  deleteReaded,
  getCurrentUser,
} from "../redux/actions";

import {
  CardImgDetail,
  ImgContainerDetail,
  SingleCardContainerDetail,
  DescriptionCardConteinerDetail,
  H1Detail,
  H2Detail,
  ColumnConteinerDetail,
  DescriptionPDetail,
  SubtitleAndYear,
  TitleAndRating,
  OverLay,
  ButtonCloseDetail,
  H5Detail,
  ReviewConteiner,
  H4Detail,
  ButtonDetail,
  ImgAndInfo,
  ButtonOptionsDetail,
  ButtonSelectDetail,
  UserAndStars,
  ButtonsConteiner,
  StarDetail,
} from "../styles/Detail";

import {
  UlCard,
  MenuConteiner,
  MenuTrigger,
  DropDownMenu,
} from "../styles/Card";

import caretIcon from "../icons/caretIcon.svg";
import favoriteIcon from "../icons/favoriteIcon.svg";
import favoriteFillIcon from "../icons/favoriteFillIcon.svg";
import readedIcon from "../icons/readedIcon.svg";
import reviewIcon from "../icons/reviewIcon.svg";
import readedIconFill from "../icons/readedIconFill.svg";
import starFill from "../icons/starFill.svg";
import starHalf from "../icons/starHalf.svg";
import closeIcon from "../icons/closeIcon.svg";
import bookIcon from "../icons/bookIcon.svg";
import bookHalfIcon from "../icons/bookHalfIcon.svg";
import { StarsContainer } from "../styles/CardRecomended";
import BookReviews from "../components/BookReviews.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DropdownItem(props) {
  return (
    <li>
      <img
        src={props.icon}
        alt="n"
        role="button"
        onClick={props.handle}
        value={props.id}
      />
    </li>
  );
}

export default function CardDetail({ book, modal, setModal }) {
  const dispatch = useDispatch();
  const [arrayFavorite, setArrayFavorite] = useState([]);
  const [arrayReaded, setArrayReaded] = useState([]);
  const [arrayReading, setArrayReading] = useState([]);
  const currentUser = useSelector((state) => state.currentUser);

  const [open, setOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [readed, setReaded] = useState(false);
  const [reading, setReading] = useState(false);
  const [newReview, setNewReview] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const { isAuthenticated, user, isLoading } = useAuth0();

  const userId = { userId: currentUser && currentUser.id };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  function handleCloseClick(e) {
    e.preventDefault(e);
    setModal(false);
    setNewReview(false);
    console.log("MODAL", modal);
    console.log("e.target.value", e.target.value);
    dispatch(cleanBookDetail(e.target.value));
  }
  function handleReviewClick(e) {
    e.preventDefault(e);
    setNewReview(true);
    console.log("newReview", newReview);
    console.log("e.target.value", e.target.value);
  }

  function handleFavorite(id, userId) {
    // e.preventDefault();
    // console.log("e.target.value",e.target.value)

    if (!favorite) {
      console.log("Entré a add favorite, bookId:", id);
      setFavorite(true);
      console.log("FAV+", favorite);
      dispatch(addFavorite(id, userId));
      toast.success("Book added to your favorites");
    }

    if (favorite) {
      console.log("Entré a delete favorite, bookId:", id);
      setFavorite(false);
      console.log("FAV-", favorite);

      dispatch(deleteFavorite(id, userId));

      toast.warning("Book removed from your favorites");
    }
  }

  function handleReaded(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!readed) {
      console.log("Entré a add readed :", id);
      setReaded(true);
      console.log("READ+", readed);

      dispatch(addReaded(id, userId));
      toast.success("Book mark as readed");
    }

    if (readed) {
      console.log("Entré a delete readed :", id);
      setReaded(false);
      console.log("READ-", readed);

      dispatch(deleteReaded(id, userId));
      toast.warning("Book mark as unread");
    }
  }

  function handleReading(id, userId) {
    // console.log("e.target.value",e.target.value)

    if (!reading) {
      console.log("Entré a add reading :", id);
      setReading(true);
      console.log("READ+", reading);

      dispatch(addReading(id, userId));

      toast.success("Book mark as reading");
    }

    if (reading) {
      console.log("Entré a delete reading :", id);
      setReading(false);
      console.log("READ-", reading);

      dispatch(deleteReading(id, userId));
      toast.warning("Book mark as unreading");
    }
  }

  function starRating(rating) {
    let ratingFloor = Math.floor(rating);

    let stars = [];
    for (let i = 0; i < ratingFloor; i++) {
      stars.push("star");
    }
    let mod = rating % ratingFloor;

    if (mod > 0) {
      stars.push("half");
    }
    return stars;
  }

  var starAverage =
    book && book.averageRating && starRating(book.averageRating);

  var review1Star =
    book &&
    book.reviews &&
    book.reviews[0] &&
    starRating(book.reviews[0].score);

  var review2Star =
    book &&
    book.reviews &&
    book.reviews[1] &&
    starRating(book.reviews[1].score);

  // carga los favs
  useEffect(() => {
    if (currentUser && modal) {
      const userFavorites = currentUser.Favorites;

      // console.log("USER FAVORITES",userFavorites)

      let allFavorites = [];

      for (let i = 0; i < currentUser.Favorites.length; i++) {
        let fav = currentUser.Favorites[i].id;

        allFavorites.push(fav);
      }
      setArrayFavorite(allFavorites);
    }
  }, [dispatch, currentUser, book]);
  //  console.log("Array FAVORITE",arrayFavorite)

  // carga los readed
  useEffect(() => {
    if (currentUser && modal) {
      const userReaded = currentUser.Read;

      let allReaded = [];

      for (let i = 0; i < currentUser.Read.length; i++) {
        let read = currentUser.Read[i].id;
        allReaded.push(read);
      }
      setArrayReaded(allReaded);
    }
  }, [dispatch, currentUser, book]);
  //  console.log("Array READED",arrayReaded)

  // carga los reading
  useEffect(() => {
    if (currentUser && modal) {
      const userReading = currentUser.Reading;
      let allReading = [];

      for (let i = 0; i < currentUser.Reading.length; i++) {
        let reading = currentUser.Reading[i].id;
        allReading.push(reading);
      }
      setArrayReading(allReading);
    }
  }, [dispatch, currentUser, book]);

  useEffect(() => {
    if (arrayFavorite.includes(book.id)) {
      setFavorite(true);
      // console.log("SETIE EL FAV", true)
    } else if (!arrayFavorite.includes(book.id)) {
      // console.log("FAV-", false)
      setFavorite(false);
      // console.log("SETIE EL FAV",false)
    }
  }, [dispatch, arrayFavorite, book.id]);

  useEffect(() => {
    if (arrayReaded.includes(book.id)) {
      setReaded(true);
      // console.log("SETIE EL Readed", true)
    } else if (!arrayReaded.includes(book.id)) {
      // console.log("Readed-", false)
      setReaded(false);
      // console.log("SETIE EL READED",false)
    }
  }, [dispatch, arrayReaded, book.id]);

  useEffect(() => {
    if (arrayReading.includes(book.id)) {
      setReading(true);
      // console.log("SETIE EL Reading", true)
    } else if (!arrayReading.includes(book.id)) {
      // console.log("Reading-", false)
      setReading(false);
      // console.log("SETIE EL READING",false)
    }
  }, [dispatch, arrayReading, book.id]);

  return (
    <>
      {modal && (
        <OverLay>
          <SingleCardContainerDetail>
            <ImgAndInfo>
              <ImgContainerDetail>
                <CardImgDetail src={book.cover} alt="img not found" />
              </ImgContainerDetail>

              <ColumnConteinerDetail>
                <ButtonCloseDetail
                  onClick={(e) => {
                    handleCloseClick(e);
                  }}
                >
                  <img src={closeIcon} alt="n" />
                </ButtonCloseDetail>
                <MenuConteiner
                  right={"310px"}
                  top={"120px"}
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <MenuTrigger onMouseOver={handleMouseOver}>
                    <img src={caretIcon} />
                  </MenuTrigger>
                  <DropDownMenu
                    className={`dropdown-menu ${
                      isHovering ? "active" : "inactive"
                    }`}
                    onMouseOver={handleMouseOver}
                  >
                    <UlCard>
                      <DropdownItem
                        key={book.id + "1"}
                        icon={!reading ? bookIcon : bookHalfIcon}
                        value={book.id}
                        handle={(e) => {
                          handleReading(book.id, userId);
                        }}
                        role="button"
                      />
                      <DropdownItem
                        key={book.id + "2"}
                        icon={!readed ? readedIcon : readedIconFill}
                        value={book.id}
                        handle={(e) => {
                          handleReaded(book.id, userId);
                        }}
                        role="button"
                      />
                      <DropdownItem
                        key={book.id + "3"}
                        icon={!favorite ? favoriteIcon : favoriteFillIcon}
                        value={book.id}
                        name={book.title}
                        handle={(e) => {
                          handleFavorite(book.id, userId);
                        }}
                        role="button"
                      />
                    </UlCard>
                  </DropDownMenu>
                </MenuConteiner>

                <TitleAndRating>
                  <H1Detail>{book.title}</H1Detail>

                  <StarsContainer>
                    {starAverage &&
                      starAverage.map((s, i) =>
                        s === "star" ? (
                          <StarDetail key={i} src={starFill} alt="n" />
                        ) : (
                          <StarDetail key={i} src={starHalf} alt="n" />
                        )
                      )}
                  </StarsContainer>
                </TitleAndRating>
                <SubtitleAndYear>
                  <H2Detail>
                    {book.subtitle
                      ? book.subtitle
                      : `Author: ${book && book.author && book.author.name}`}
                  </H2Detail>
                  <H2Detail>Year: {book.publishedDate}</H2Detail>
                </SubtitleAndYear>
                {book.subtitle && (
                  <H2Detail>Author: {book.author.name}</H2Detail>
                )}
                {book && book.genre && (
                  <H2Detail>Genre:{book.genre.name}</H2Detail>
                )}
                <DescriptionCardConteinerDetail>
                  <DescriptionPDetail>{book.description}</DescriptionPDetail>
                </DescriptionCardConteinerDetail>
              </ColumnConteinerDetail>
            </ImgAndInfo>
            <ReviewConteiner>
              {book && book.reviews && <BookReviews />}
            </ReviewConteiner>

            {currentUser && currentUser.subscription ? (
              !newReview ? (
                <ButtonsConteiner>
                  {/* <ButtonDetail>Show More Reviews</ButtonDetail> */}
                  <ButtonDetail
                    onClick={(e) => {
                      handleReviewClick(e);
                    }}
                  >
                    Leave a Review
                  </ButtonDetail>
                </ButtonsConteiner>
              ) : (
                <ReviewConteiner>
                  <CreateReview
                    currentUser={currentUser}
                    book={book}
                    setNewReview={setNewReview}
                    newReview={newReview}
                    modal={modal}
                    setModal={setModal}
                  />
                </ReviewConteiner>
              )
            ) : (
              <div>Subscribe to review</div>
            )}
          </SingleCardContainerDetail>
        </OverLay>
      )}
    </>
  );
}
