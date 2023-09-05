import CreateApi from '../config/Api';

const MsgApi = () => {
  const api = CreateApi({
    resource: 'msg',
    requireAuth: true
  });

  const msgApi = {
    getMsgs: async(dto) => {
      try {
        const res = await api.get('', { params: dto });
        return res;
      } catch (err) {
        return err;
      }
    },
    sendMessage: (dto) => {
      return api.post(`/send`, dto);
    },
  };

  return msgApi;
}

export default MsgApi;