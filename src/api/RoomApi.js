import CreateApi from '../config/Api';

const RoomApi = () => {
  const api = CreateApi({
      resource: 'room',
      requireAuth: true
    }
  );

  const Api = {
    createRoom: async(obj) => {
      try {
        const res = await api.post('', obj);
        return res;
      } catch (err) {
        return err;
      }
    },
    getRoom: async(obj) => {
      try {
        const res = await api.get('', {params: obj});
        return res;
      } catch (err) {
        return err;
      }
    },
    getMyRooms: async() => {
      try {
        const res = await api.get('/my');
        return res;
      } catch (err) {
        return err;
      }
    },
    deleteRoom: async(obj) => {
      try {
        const res = await api.delete('', { params: obj });
        return res;
      } catch (err) {
        return err;
      }
    }
  };

  return Api;
}


export default RoomApi;