import style from './index.module.css';

type DreamOutputProps = {
  imageUrl?: string,
  imageDesc?: string
}

export default function DreamOutput({ imageUrl, imageDesc }: DreamOutputProps) {
  return (
    <div className={`${style['output-box']} surface2`}>
      {
        imageUrl
          ? <img src={imageUrl} alt={imageDesc ?? 'My dream image'} />
          : <div>My Dream image</div>
      }
    </div>
  );
}