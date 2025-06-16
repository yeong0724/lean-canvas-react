import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCanvases, createCanvas, deleteCanvas } from '@api/canvas';
import CanvasList from '@components/CanvasList';
import SearchBar from '@components/SearchBar';
import CategoryFilter from '@components/CategoryFilter';
import ViewToggle from '@components/ViewToggle';
import Loading from '@components/Loading';
import Error from '@components/Error';
import Button from '@components/Button';

function Home() {
  const queryClient = useQueryClient();

  const [isGridView, setIsGridView] = useState(true);
  const [filter, setFilter] = useState({
    searchText: undefined,
    category: undefined,
  });

  // 데이터 조회
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['canvases', filter.searchText, filter.category],
    queryFn: () => {
      return getCanvases({
        title_like: filter.searchText,
        category: filter.category,
      });
    },
    staleTime: 1000 * 60, // 1분 동안 데이터가 신선함(fresh) 상태로 유지 -> 새로고침을 해도 서버에 요청하지 않음
    refetchOnWindowFocus: false, // 창이 포커스될 때마다 데이터를 새로 가져오지 않음 (ex. 탭이동)
  });

  // 등록
  const { mutate: createNewCanvas, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  // 삭제
  const { mutate: deleteCanvasMutation } = useMutation({
    mutationFn: deleteCanvas,
    onSuccess: () => queryClient.invalidateQueries(['canvases']),
    onError: err => alert(err.message),
  });

  const handleDeleteItem = async id => {
    deleteCanvasMutation(id);
  };

  const handleCreateCanvas = async () => {
    createNewCanvas();
  };

  const handleFilter = (key, value) => {
    setFilter({
      ...filter,
      [key]: value,
    });
  };

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex gap-2 flex-col w-full sm:flex-row mb-4 sm:mb-0">
          <SearchBar
            searchText={filter.searchText}
            onSearch={val => handleFilter('searchText', val)}
          />
          <CategoryFilter
            category={filter.category}
            onChange={val => handleFilter('category', val)}
          />
        </div>
        <ViewToggle isGridView={isGridView} setIsGridView={setIsGridView} />
      </div>
      <div className="border-t-2 border-gray-200 mb-5" />
      <div className="flex justify-end mb-6">
        <Button onClick={handleCreateCanvas} loading={isLoadingCreate}>
          등록하기
        </Button>
      </div>
      {isLoading && <Loading />}
      {error && <Error message={error.message} onRetry={refetch} />}
      {!isLoading && !error && (
        <CanvasList
          filteredData={data}
          isGridView={isGridView}
          searchText={filter.searchText}
          onDeleteItem={handleDeleteItem}
        />
      )}
    </div>
  );
}

export default Home;
