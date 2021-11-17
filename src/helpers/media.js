import { Configs } from 'app-configs';

export function getImageWithId(id) {
    return Configs.BASE_API + '/media/' + String(id);
}
