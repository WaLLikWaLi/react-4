export default function LoadMoreButton({
  setLoading,
  setGetingimages,
  setPages,
  pages,
  getingimages,
  images,
}) {
  function loadingMore() {
    setGetingimages([...getingimages, ...images]);
    setPages(pages + 1);

    setLoading(true);
  }

  return <button onClick={loadingMore}>More</button>;
}
