import { instance } from './http';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

export async function getCanvases(params) {
  const payload = Object.assign(
    {
      _sort: 'lastModified',
      _order: 'desc',
    },
    params,
  );
  const { data } = await instance.get('/canvases', { params: payload });

  return data;
}

export function createCanvas() {
  const newCanvas = {
    title: uuidv4().substring(0, 4) + '_새로운 린 캔버스',
    lastModified: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    category: '신규',
  };

  return instance.post('/canvases', newCanvas);
}

export async function deleteCanvas(id) {
  await instance.delete(`/canvases/${id}`);
}

export async function getCanvasById(id) {
  const { data } = await instance.get(`/canvases/${id}`);
  return data;
}

export async function updateTitle(id, title) {
  /**
   * post - 새로운 자원 생성
   * put - 기존 자원 전체 업데이트 또는 새 자원 생성
   * patch - 일부 수정
   */
  await instance.patch(`/canvases/${id}`, { title });
}

export async function updateCanvas(id, canvas) {
  await instance.put(`/canvases/${id}`, canvas);
}
