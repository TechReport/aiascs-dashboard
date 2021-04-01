
import { apiProvider } from './Provider';

export class ApiCore {
    constructor(options) {

        if (options.getAll) {
            this.getAll = (resource, selector) => {
                return apiProvider.getAll(resource, selector);
            };
        }

        if (options.getSingle) {
            this.getSingle = (resource, id) => {
                return apiProvider.getSingle(resource, id);
            };
        }

        if (options.post) {
            this.post = (resource, model) => {
                return apiProvider.post(resource, model);
            };
        }

        // if (options.put) {
        //     this.put = (model) => {
        //         return apiProvider.put(options.url, model);
        //     };
        // }

        // if (options.patch) {
        //     this.patch = (model) => {
        //         return apiProvider.patch(options.url, model);
        //     };
        // }

        // if (options.remove) {
        //     this.remove = (id) => {
        //         return apiProvider.remove(options.url, id);
        //     };
        // }
    }
}