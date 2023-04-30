import useFetch from "../hooks/useFetch"

export default function TagPage() {
  const { data, loading, error } = useFetch(`/api/books/${tag}`)


  return (
    <div></div>
  )
}