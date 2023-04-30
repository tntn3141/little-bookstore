import axios from "axios";
import { useEffect, useState, Suspense, lazy, useContext } from "react";
import { useParams } from "react-router-dom";
import { Interweave } from "interweave";

import useFetch from "../hooks/useFetch";
import Rating from "../components/Rating";
import LoadingIcon from "../components/LoadingIcon";
import BookList from "../components/BookList";
import { Typography } from "../components/Typography";
import { UserContext } from "../UserContext";

import {
  BookSVG,
  PageSVG,
  CalendarSVG,
  TagSVG,
  BuildingSVG,
  LanguageSVG,
  ShoppingBagSVG,
} from "../assets/svg";

function getVNDPrice(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export default function ProductPage() {
  const { user } = useContext(UserContext);
  let { itemId } = useParams();

  const [itemData, setItemData] = useState(null);
  const [recommendationData, setRecommendationData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios
          .all([
            axios.get(`/api/books/${itemId}`),
            axios.get("/api/books/", { params: { recommendation: itemId } }),
          ])
          .then(
            axios.spread((itemData, recommendationData) => {
              console.log("recommendationData", recommendationData.data);
              setItemData(itemData.data);
              setRecommendationData(recommendationData.data);
            })
          );
      } catch (error) {
        alert(error);
      }
    }
    fetchData();
  }, []);

  return (!itemData || !recommendationData) ? (
    <div className="flex items-center justify-center h-full">
    <LoadingIcon />
  </div>
  ) : (
    <div>Hello</div>
  )
}