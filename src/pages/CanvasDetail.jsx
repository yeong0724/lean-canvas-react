import { useLocation, useParams, useSearchParams } from 'react-router-dom';

function CanvasDetail() {
  // URL 파라미터를 가져오는 방법
  const { id } = useParams();

  // query string을 가져오는 방법
  const [searchParams] = useSearchParams();

  // hash를 가져오는 방법
  const location = useLocation();

  return (
    <div>
      CanvasDetail
      <p>id: {id}</p>
      <p>keyword: {searchParams.get('keyword')}</p>
      <p>hash: {location.hash}</p>
    </div>
  );
}

export default CanvasDetail;
