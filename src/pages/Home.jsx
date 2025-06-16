import { useEffect, useState } from 'react';
import CanvasList from '../components/CanvasList';
import SearchBar from '../components/SearchBar';
import ViewToggle from '../components/ViewToggle';
import { getCanvases, createCanvas, deleteCanvas } from '../api/canvas';
import Loading from '../components/Loading';
import Error from '../components/Error';
import Button from '../components/Button';
import useApiRequest from '../hooks/useApiRequest';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [data, setData] = useState([]);

  // API call
  const { isLoading, error, execute: fetchData } = useApiRequest(getCanvases);
  const { isLoading: isLoadingCreate, execute: createNewCanvas } =
    useApiRequest(createCanvas);

  const handleDeleteItem = async id => {
    if (!confirm('삭제 하시겠습니까?')) return;

    try {
      await deleteCanvas(id);
      fetchData({ title_like: searchText });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData(
      { title_like: searchText },
      {
        onSuccess: response => setData(response.data),
      },
    );
  }, [searchText, fetchData]);

  const handleCreateCanvas = async () => {
    createNewCanvas(null, {
      onSuccess: () => {
        fetchData(
          { title_like: searchText },
          {
            onSuccess: response => setData(response.data),
          },
        );
      },
      onError: err => alert(err.message),
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="border-t-2 border-gray-200 mb-5" />
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && (
        <Error
          message={error.message}
          onRetry={() => fetchData({ title_like: searchText })}
        />
      )}

      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </div>
  );
}

export default Home;
