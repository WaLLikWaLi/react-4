import css from "./ImageGallery.module.css";
export default function ImageGallery({
  onHandleImageClick,
  images,
  getingimages,
}) {
  const combinedImages = [...getingimages, ...images];
  return (
    <ul>
      {combinedImages.map((image) => (
        <li key={image.id}>
          <div>
            <img
              className={css.picture}
              src={image.urls.small}
              alt={image.alt_description}
              onClick={() => onHandleImageClick(image.urls.full)}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
