import { RDList } from '../types';
import { DTOGetList, Item } from './types';

export default {
    getList: (dto: DTOGetList) => {
        return http.post<RDList<Item>>('/list', { ...dto });
    },
};
